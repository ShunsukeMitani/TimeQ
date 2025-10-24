const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const express = require('express');
const qrcode = require('qrcode');

let win;
let directorWin = null;
let personalityWin = null;

// ▼ 変更点①：サーバーのIPアドレスを保持する変数を追加
let serverIp = null;

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
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    // ▼ 変更点③：ハードコードされたIPの代わりに、保存したサーバーIPを使用
    directorWin.loadFile('index.html', {
      query: { role: 'director', ip: serverIp || '127.0.0.1' }
    });
    directorWin.removeMenu();
    directorWin.on('closed', () => {
      directorWin = null;
    });
  }

  function createPersonalityWindow() {
    if (personalityWin) {
      personalityWin.focus();
      return;
    }
    personalityWin = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });
    // ▼ 変更点③：ハードコードされたIPの代わりに、保存したサーバーIPを使用
    personalityWin.loadFile('index.html', {
      query: { role: 'personality', ip: serverIp || '127.0.0.1' }
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
  ipcMain.on('open-personality-window', createPersonalityWindow);

  ipcMain.handle('start-server', async () => {
    try {
      const ip = getLocalIpAddress();
      // ▼ 変更点②：取得したIPアドレスを変数に保存
      serverIp = ip;
      const httpPort = 3000;
      const wsPort = 8080;
      const url = `http://${ip}:${httpPort}`;

      const roomId = Math.floor(1000 + Math.random() * 9000).toString();

      const httpApp = express();

      httpApp.use(express.static(path.join(__dirname)));
      httpApp.use(express.json());

      httpApp.post('/validate-id', (req, res) => {
        if (req.body && req.body.id === roomId) {
          res.json({ success: true, ip: ip });
        } else {
          res.status(400).json({ success: false, message: 'Invalid Room ID' });
        }
      });

      await new Promise((resolve, reject) => {
        const server = httpApp.listen(httpPort, '0.0.0.0');
        server.on('listening', () => {
          console.log(`Webサーバーが ${url} で起動しました。`);
          console.log(`ルームID: ${roomId}`);
          resolve(server);
        });
        server.on('error', (err) => {
          console.error('HTTPサーバーの起動エラー:', err);
          reject(err);
        });
      });

      const wss = new WebSocketServer({ port: wsPort, host: '0.0.0.0' });
      let programState = null;

      wss.on('connection', (ws) => {
        ws.role = null;

        if (programState) { ws.send(JSON.stringify({ type: 'stateUpdate', payload: programState })); }

        ws.on('message', (message) => {
          const data = JSON.parse(message.toString());

          if (data.type === 'identify') {
            ws.role = data.payload.role;
            console.log(`[サーバー] クライアントを識別しました。役割: ${ws.role}`);
            return;
          }

          if (data.type === 'countdownTick') {
            wss.clients.forEach(client => {
              if (client !== ws && client.readyState === client.OPEN) {
                client.send(message.toString());
              }
            });
            return;
          }

          if (ws.role === 'director' && (data.type === 'handwritingUpdate' || data.type === 'presetMessage')) {
            wss.clients.forEach(client => {
              if (client.role === 'personality' && client.readyState === ws.OPEN) {
                client.send(message.toString());
              }
            });
            return;
          }

          if (ws.role === 'personality' && (data.type === 'acknowledgement' || data.type === 'personalityMessage')) {
            wss.clients.forEach(client => {
              if (client.role === 'director' && client.readyState === ws.OPEN) {
                if (data.type === 'acknowledgement') {
                  client.send(JSON.stringify({ type: 'acknowledged' }));
                } else {
                  client.send(message.toString());
                }
              }
            });
            return;
          }

          if (ws.role !== 'director') {
            return;
          }

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
              if (programState.currentItemIndex < programState.cueSheet.length - 1) {
                const finishedItem = programState.cueSheet[programState.currentItemIndex];
                if (programState.programStatus === 'running' && programState.currentItemStartTime > 0) finishedItem.actualDuration = (Date.now() - programState.currentItemStartTime) / 1000;
                programState.currentItemIndex++;
                programState.currentItemStartTime = Date.now();
                programState.timeDifference = recalculateTimeDifference();
              }
              break;
            case 'prevItem':
              if (programState.currentItemIndex > 0) {
                programState.cueSheet[programState.currentItemIndex - 1].actualDuration = null;
                programState.currentItemIndex--;
                programState.currentItemStartTime = Date.now();
                programState.timeDifference = recalculateTimeDifference();
              }
              break;
            case 'restartProgram':
              if (programState) {
                programState.programStatus = 'ready';
                programState.currentItemIndex = 0;
                programState.totalElapsedTime = 0;
                programState.lastStartTime = 0;
                programState.currentItemStartTime = 0;
                programState.lastPauseTime = 0;
                programState.timeDifference = 0;
                programState.cueSheet.forEach(item => item.actualDuration = null);
              }
              break;
            case 'endProgram':
              programState = null;
              wss.clients.forEach(client => { if (client.readyState === client.OPEN) client.send(JSON.stringify({ type: 'programEnded' })); });
              return;
          }
          broadcastState();
        });

        ws.on('close', () => {
          console.log(`[サーバー] クライアントが切断しました。役割: ${ws.role}`);
        });
      });

      function broadcastState() {
        if (programState) wss.clients.forEach(c => c.readyState === c.OPEN && c.send(JSON.stringify({ type: 'stateUpdate', payload: programState })));
      }

      function recalculateTimeDifference() {
        if (!programState) return 0;
        return programState.cueSheet.slice(0, programState.currentItemIndex).reduce((acc, item) => acc + (item.actualDuration !== null ? item.actualDuration - item.duration : 0), 0);
      }

      const qrDataURL = await qrcode.toDataURL(url);
      return { ip: ip, qr: qrDataURL, url: url, roomId: roomId };
    } catch (error) {
      console.error('サーバーの起動に失敗しました:', error);
      return { error: error.message };
    }
  });
}