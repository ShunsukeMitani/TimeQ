const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    onConnectionInfo: (callback) => ipcRenderer.on('connection-info', (_event, value) => callback(value)),
    rendererReady: () => ipcRenderer.send('renderer-ready'),
    startServer: () => ipcRenderer.invoke('start-server'),
    openDirectorWindow: () => ipcRenderer.send('open-director-window'),
    openPersonalityWindow: () => ipcRenderer.send('open-personality-window') // この行を追加
});