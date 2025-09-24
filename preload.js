const { contextBridge, ipcRenderer } = require('electron');

// main.jsからの'connection-info'というメッセージを受け取るための橋渡しを設定
contextBridge.exposeInMainWorld('electronAPI', {
    onConnectionInfo: (callback) => ipcRenderer.on('connection-info', (_event, value) => callback(value))
});