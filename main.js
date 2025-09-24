const { app, BrowserWindow } = require('electron');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const express = require('express');
const qrcode = require('qrcode');

let programState = null;
let directorWs = null; // ディレクターの接続を保持する変数

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
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  win.removeMenu();

  // win.webContents.openDevTools();

  win.webContents.on('did-finish-load', () => {
    const ip = getLocalIpAddress();
    const url = `http://${ip}:3000?directorIP=${ip}`;
    console.log(`Webサーバーが http://${ip}:3000 で起動しました。`);

    qrcode.toDataURL(url, (err, qrDataURL) => {
      if (err) {
        console.error('QRコードの生成に失敗しました', err);
        return;
      }
      win.webContents.send('connection-info', { ip: ip, qr: qrDataURL, url: url });
    });
  });
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocketサーバーがポート8080で起動しました。');

function broadcastState() {
  if (!programState) return;
  const message = JSON.stringify({ type: 'stateUpdate', payload: programState });
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

function broadcastToOthers(senderWs, message) {
  const data = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client !== senderWs && client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('クライアントが接続しました。');
  if (programState) {
    ws.send(JSON.stringify({ type: 'stateUpdate', payload: programState }));
  }

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    // ディレクターの接続を特定して保存
    if (data.type === 'identify' && data.payload.role === 'director') {
      directorWs = ws;
    }

    if (!programState && data.type !== 'startProgram') return;

    switch (data.type) {
      case 'startProgram':
        programState = {
          ...data.payload,
          currentItemIndex: 0,
          programStatus: 'ready',
          totalElapsedTime: 0,
          lastStartTime: 0,
          currentItemStartTime: 0,
          lastPauseTime: 0,
          timeDifference: 0,
        };
        broadcastState();
        break;

      case 'togglePlayPause':
        if (programState.programStatus === 'running') {
          programState.programStatus = 'paused';
          programState.lastPauseTime = Date.now();
          programState.totalElapsedTime += programState.lastPauseTime - programState.lastStartTime;
        } else {
          programState.programStatus = 'running';
          programState.lastStartTime = Date.now();
          if (programState.currentItemStartTime === 0) {
            programState.currentItemStartTime = Date.now();
          }
        }
        broadcastState();
        break;

      case 'nextItem':
        if (programState.currentItemIndex < programState.cueSheet.length - 1) {
          const prevItem = programState.cueSheet[programState.currentItemIndex];
          if (programState.programStatus === 'running') {
            const actualDuration = (Date.now() - programState.currentItemStartTime) / 1000;
            const segmentDifference = actualDuration - prevItem.duration;
            programState.timeDifference += segmentDifference;
          }
          programState.currentItemIndex++;
          programState.currentItemStartTime = Date.now();
        }
        broadcastState();
        break;

      case 'prevItem':
        if (programState.currentItemIndex > 0) {
          programState.currentItemIndex--;
          programState.currentItemStartTime = Date.now();
        }
        broadcastState();
        break;

      case 'handwritingUpdate':
        broadcastToOthers(ws, { type: 'handwritingUpdate', payload: data.payload });
        return;

      case 'presetMessage':
        broadcastToOthers(ws, { type: 'presetMessage', payload: data.payload });
        return;

      // ⭐ ここから下をすべて追加
      case 'acknowledgement':
        if (directorWs && directorWs.readyState === directorWs.OPEN) {
          directorWs.send(JSON.stringify({ type: 'acknowledged' }));
        }
        return;
      // ⭐ ここまで追加

      case 'endProgram':
        programState = null;
        directorWs = null;
        wss.clients.forEach(client => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ type: 'programEnded' }));
          }
        });
        return;
    }
  });

  ws.on('close', () => console.log('クライアントとの接続が切れました。'));
  ws.on('error', (error) => console.error('エラー:', error));
});

const httpApp = express();
const PORT = 3000;

httpApp.use(express.static(path.join(__dirname)));

httpApp.listen(PORT, () => {
  console.log(`Webサーバーが http://[あなたのIPアドレス]:${PORT} で起動しました。`);
});