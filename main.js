require('dotenv').config();
const { app, BrowserWindow, NativeImage } = require('electron');
const { resolve } = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 600,
    minHeight: 700,
    autoHideMenuBar: true,
    center: true,
    alwaysOnTop: true,
    titleBarStyle: 'hidden',
    icon: resolve(__dirname, 'assets/icons', 'icon@32x.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(resolve(__dirname, 'views/index.html'));

  const environmentState = process.env.ENVIRONMENT_STATE;
  console.log(environmentState)

  if (environmentState === "true" || environmentState === 'development') { win.webContents.openDevTools() };
}

app.whenReady()
  .then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});
