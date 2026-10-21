const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeMenu: () => ipcRenderer.send('close-menu'),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  sendAction: (action) => ipcRenderer.send('send-action', action),
});