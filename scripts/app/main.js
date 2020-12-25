require('dotenv').config();
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 920,
        // frame: false,
        autoHideMenuBar: true,
        center: true,
        // icon: '../../icons/stopwatch.png',
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('../../views/index.html');

    const environmentState = process.env.ENVIRONMENT_STATE;
    console.log(environmentState)

    if (environmentState === "true" || environmentState === 'development') { win.webContents.openDevTools() };
}

app.whenReady().then(createWindow);

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
