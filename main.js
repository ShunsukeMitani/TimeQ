// 変更点: ipcMain を追加
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const { WebSocketServer } = require('ws');
const express = require('express');
const qrcode = require('qrcode');

let programState = null;
let directorWs = null;

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

  // 変更点: 'did-finish-load'からQRコード生成処理を移動し、
  // 'renderer-ready'イベントを待つように変更
  ipcMain.on('renderer-ready', () => {
    const ip = getLocalIpAddress();
    const url = `http://${ip}:3000?directorIP=${ip}`;
    qrcode.toDataURL(url, (err, qrDataURL) => {
      if (err) return;
      win.webContents.send('connection-info', { ip: ip, qr: qrDataURL, url: url });
    });
  });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const wss = new WebSocketServer({ port: 8080 });

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

function recalculateTimeDifference() {
  if (!programState) return 0;
  let totalDifference = 0;
  for (let i = 0; i < programState.currentItemIndex; i++) {
    const item = programState.cueSheet[i];
    if (item.actualDuration !== null && typeof item.actualDuration !== 'undefined') {
      totalDifference += (item.actualDuration - item.duration);
    }
  }
  return totalDifference;
}


wss.on('connection', (ws) => {
  if (programState) {
    ws.send(JSON.stringify({ type: 'stateUpdate', payload: programState }));
  }

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    if (data.type === 'identify' && data.payload.role === 'director') {
      directorWs = ws;
    }
    if (!programState && data.type !== 'startProgram') return;

    switch (data.type) {
      case 'startProgram':
        const cueSheetWithState = data.payload.cueSheet.map(item => ({ ...item, actualDuration: null }));
        programState = { ...data.payload, cueSheet: cueSheetWithState, currentItemIndex: 0, programStatus: 'ready', totalElapsedTime: 0, lastStartTime: 0, currentItemStartTime: 0, lastPauseTime: 0, timeDifference: 0 };
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
            if (programState.currentItemStartTime > 0) {
              programState.currentItemStartTime += pauseDuration;
            }
          }
          programState.programStatus = 'running';
          programState.lastStartTime = now;
          if (programState.currentItemIndex === 0 && programState.currentItemStartTime === 0) {
            programState.currentItemStartTime = now;
          }
        }
        break;

      case 'nextItem':
        if (programState.currentItemIndex < programState.cueSheet.length - 1) {
          const finishedItem = programState.cueSheet[programState.currentItemIndex];
          if (programState.programStatus === 'running' && programState.currentItemStartTime > 0) {
            const actualDuration = (Date.now() - programState.currentItemStartTime) / 1000;
            finishedItem.actualDuration = actualDuration;
          }
          programState.currentItemIndex++;
          programState.currentItemStartTime = Date.now();
          programState.timeDifference = recalculateTimeDifference();
        }
        break;

      case 'prevItem':
        if (programState.currentItemIndex > 0) {
          const currentItem = programState.cueSheet[programState.currentItemIndex];
          currentItem.actualDuration = null;
          programState.currentItemIndex--;
          programState.currentItemStartTime = Date.now();
          programState.timeDifference = recalculateTimeDifference();
        }
        break;

      case 'handwritingUpdate':
        broadcastToOthers(ws, { type: 'handwritingUpdate', payload: data.payload });
        return;
      case 'presetMessage':
        broadcastToOthers(ws, { type: 'presetMessage', payload: data.payload });
        return;
      case 'acknowledgement':
        if (directorWs && directorWs.readyState === directorWs.OPEN) {
          directorWs.send(JSON.stringify({ type: 'acknowledged' }));
        }
        return;
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
    broadcastState();
  });
});

const httpApp = express();
const PORT = 3000;
httpApp.use(express.static(path.join(__dirname)));
httpApp.listen(PORT, () => {
  console.log(`Webサーバーが http://[あなたのIPアドレス]:${PORT} で起動しました。`);
});