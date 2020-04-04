const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const handleMessage = require('./event/message');
const getRenderUrl = require('./mainUrl');

// const getUrl = path.join(__dirname, 'client/dist/index.html');

// console.log(getUrl);

// const getUrl = url.format({
//   protocol: 'file:',
//   pathname: path.join(__dirname, 'render_process/index.html'),
//   slashes: true,
//   query: { debugger: false }
// });

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    // transparent: true,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(getRenderUrl());
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('connect', 'success');
  })
  if (process.platform === 'win32') {
    mainWindow.on('close', (event) => {
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
      event.preventDefault();
    });
  }
  global.mainId = mainWindow.id;
}
// event
app.whenReady().then(() => {
  handleMessage();
  createWindow();
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})