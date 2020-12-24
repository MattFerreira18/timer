const { app, BrowserWindow } = require('electron');

// window
function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 920,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('../../index.html');
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


app.whenReady()
    .then(createWindow);
