const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onConnectionInfo: (callback) => ipcRenderer.on('connection-info', (_event, value) => callback(value)),
    // 変更点: main.jsに準備完了を通知する関数を追加
    rendererReady: () => ipcRenderer.send('renderer-ready')
});