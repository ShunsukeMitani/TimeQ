const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const express = require('express');
const qrcode = require('qrcode');

let win;
let directorWin = null;
let personalityWin = null; // パーソナリティ用ウィンドウを保持する変数

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      if (!name.match(/([Ww][Ii]-?[Ff][Ii])|([Ee]thernet)/)) {
        continue;
      }
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return '127.0.0.1';
  }

  const createWindow = () => {
    win = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    win.loadFile('index.html');
    win.removeMenu();
  };

  function createDirectorWindow() {
    if (directorWin) {
      directorWin.focus();
      return;
    }
    directorWin = new BrowserWindow({
      width: 1280,
      height: 800,
      parent: win,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    directorWin.loadFile('index.html', {
      query: { role: 'director', ip: '127.0.0.1' }
    });
    directorWin.removeMenu();
    directorWin.on('closed', () => {
      directorWin = null;
    });
  }

  // ▼▼▼ パーソナリティ用ウィンドウを作成する関数を追加 ▼▼▼
  function createPersonalityWindow() {
    if (personalityWin) {
      personalityWin.focus();
      return;
    }
    personalityWin = new BrowserWindow({
      width: 1024,
      height: 768,
      parent: win,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    personalityWin.loadFile('index.html', {
      query: { role: 'personality', ip: '127.0.0.1' }
    });
    personalityWin.removeMenu();
    personalityWin.on('closed', () => {
      personalityWin = null;
    });
  }

  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  ipcMain.on('open-director-window', createDirectorWindow);
  ipcMain.on('open-personality-window', createPersonalityWindow); // この行を追加

  ipcMain.handle('start-server', async () => {
    try {
      const ip = getLocalIpAddress();
      const httpPort = 3000;
      const wsPort = 8080;
      const url = `http://${ip}:${httpPort}?directorIP=${ip}`;
      const httpApp = express();
      httpApp.use(express.static(path.join(__dirname)));

      // ネットワーク上のすべてのIPアドレスで待ち受ける設定
      httpApp.listen(httpPort, '0.0.0.0', () => {
        console.log(`Webサーバーが http://${ip}:${httpPort} で起動しました。`);
      });

      const wss = new WebSocketServer({ port: wsPort });
      let programState = null;
      let directorWs = null;

      wss.on('connection', (ws) => {
        if (programState) { ws.send(JSON.stringify({ type: 'stateUpdate', payload: programState })); }

        ws.on('message', (message) => {
          const data = JSON.parse(message.toString());
          if (data.type === 'identify' && data.payload.role === 'director') { directorWs = ws; }
          if (!programState && data.type !== 'startProgram') return;

          switch (data.type) {
            case 'startProgram':
              programState = { ...data.payload, cueSheet: data.payload.cueSheet.map(item => ({ ...item, actualDuration: null })), currentItemIndex: 0, programStatus: 'ready', totalElapsedTime: 0, lastStartTime: 0, currentItemStartTime: 0, lastPauseTime: 0, timeDifference: 0 };
              break;
            case 'togglePlayPause':
              if (programState.programStatus === 'running') {
                programState.programStatus = 'paused';
                programState.lastPauseTime = Date.now();
                programState.totalElapsedTime += programState.lastPauseTime - programState.lastStartTime;
              } else {
                const now = Date.now();
                if (programState.lastPauseTime > 0) {
                  const pauseDuration = now - programState.lastPauseTime;
                  if (programState.currentItemStartTime > 0) programState.currentItemStartTime += pauseDuration;
                }
                programState.programStatus = 'running';
                programState.lastStartTime = now;
                if (programState.currentItemIndex === 0 && programState.currentItemStartTime === 0) programState.currentItemStartTime = now;
              }
              break;
            case 'nextItem':
              // ▼▼▼ ログを追加 ▼▼▼
              console.log(`[サーバー] nextItem 受信。現在のインデックス: ${programState.currentItemIndex}`);
              if (programState.currentItemIndex < programState.cueSheet.length - 1) {
                const finishedItem = programState.cueSheet[programState.currentItemIndex];
                if (programState.programStatus === 'running' && programState.currentItemStartTime > 0) finishedItem.actualDuration = (Date.now() - programState.currentItemStartTime) / 1000;
                programState.currentItemIndex++;
                programState.currentItemStartTime = Date.now();
                programState.timeDifference = recalculateTimeDifference();
                // ▼▼▼ ログを追加 ▼▼▼
                console.log(`[サーバー] -> 更新後のインデックス: ${programState.currentItemIndex}`);
              }
              break;
            case 'prevItem':
              // ▼▼▼ ログを追加 ▼▼▼
              console.log(`[サーバー] prevItem 受信。現在のインデックス: ${programState.currentItemIndex}`);
              if (programState.currentItemIndex > 0) {
                programState.cueSheet[programState.currentItemIndex - 1].actualDuration = null;
                programState.currentItemIndex--;
                programState.currentItemStartTime = Date.now();
                programState.timeDifference = recalculateTimeDifference();
                // ▼▼▼ ログを追加 ▼▼▼
                console.log(`[サーバー] -> 更新後のインデックス: ${programState.currentItemIndex}`);
              }
              break;
            case 'handwritingUpdate':
              broadcastToOthers(ws, { type: 'handwritingUpdate', payload: data.payload });
              return;
            case 'presetMessage':
              // ▼▼▼ ログを追加 ▼▼▼
              console.log('[サーバー] presetMessage を受信。他のクライアントへ転送します。ペイロード:', data.payload);
              broadcastToOthers(ws, { type: 'presetMessage', payload: data.payload });
              break; // ★★★ 修正点: returnをbreakに変更し、後続のbroadcastStateが実行されるようにする
            case 'acknowledgement':
              if (directorWs && directorWs.readyState === directorWs.OPEN) {
                directorWs.send(JSON.stringify({ type: 'acknowledged' }));
              }
              return;
            case 'endProgram':
              programState = null;
              directorWs = null;
              wss.clients.forEach(client => { if (client.readyState === client.OPEN) client.send(JSON.stringify({ type: 'programEnded' })); });
              return;
          }
          broadcastState();
        });
      });

      function broadcastState() {
        if (programState) wss.clients.forEach(c => c.readyState === c.OPEN && c.send(JSON.stringify({ type: 'stateUpdate', payload: programState })));
      }
      function broadcastToOthers(sender, msg) {
        wss.clients.forEach(c => c !== sender && c.readyState === c.OPEN && c.send(JSON.stringify(msg)));
      }
      function recalculateTimeDifference() {
        if (!programState) return 0;
        return programState.cueSheet.slice(0, programState.currentItemIndex).reduce((acc, item) => acc + (item.actualDuration !== null ? item.actualDuration - item.duration : 0), 0);
      }

      const qrDataURL = await qrcode.toDataURL(url);
      return { ip: ip, qr: qrDataURL, url: url };
    } catch (error) {
      console.error('サーバーの起動に失敗しました:', error);
      return { error: error.message };
    }
  });
}