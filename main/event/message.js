const { ipcMain, BrowserWindow } = require('electron');
const os = require('os');
const path = require('path');
const child = require('child_process');

const info = {
  path: os.homedir(),
  ignore: [],
  static: false,
};

const system = child.fork(path.join(__dirname, "../../cli/run.js"), [
  JSON.stringify(info),
]);

system.on("exit", () => {
  console.log("exit argument==", arguments);
});
system.on("error", () => {
  console.log("error argument==", arguments);
});
system.on("message", (m) => {
  console.log("PARENT got message:", m);
  switch (m.type) {
    case "file": {
      const setList = m.data;
      // sockets.forEach((item) => {
        // item.emit("file", setList);
      // });
      getMain().webContents.send('file', setList);
      break;
    }
    case "computed": {
      const project = m.data;
      // sockets.forEach((item) => {
      //   item.emit("computed", project);
      // });
      getMain().webContents.send('file', project);
      break;
    }
    case "scannerDone": {
      // sockets.forEach((item) => {
      //   item.emit("scannerDone");
      // });
      getMain().webContents.send('scannerDone');
      break;
    }
    case "done": {
      const fileList = m.data;
      // sockets.forEach((item) => {
      //   item.emit("done", fileList);
      // });
      getMain().webContents.send('done', fileList);
      break;
    }
    case "delete-start": {
      // sockets.forEach((item) => {
      //   item.emit("delete-start");
      // });
      getMain().webContents.send('delete-start');
      break;
    }
    case "delete-file-start": {
      const file = m.data;
      console.log(file, "is starting delete");
      break;
    }
    case "delete-file-error": {
      const file = m.data;
      console.log(file, "delete error");
      break;
    }
    case "delete-file-done": {
      const file = m.data;
      getMain().webContents.send('delete-file-done', file);
      // sockets.forEach((item) => {
      //   item.emit("delete-file-done", file);
      // });
      break;
    }
    case "delete-done": {
      const fileList = m.data;
      // sockets.forEach((item) => {
      //   item.emit("delete-done");
      // });
      getMain().webContents.send('delete-done', fileList);
      break;
    }
    case "file-error": {
      // sockets.forEach((item) => {
      //   item.emit("file-error");
      // });
      getMain().webContents.send('file-error');
      break;
    }
  }
});

function getMain() {
  return BrowserWindow.fromId(global.mainId);
}

function handleConnect() {
  ipcMain.on('connect', (event, data) => {
    console.log(1111);
  });
}

function handlePath() {
  ipcMain.on('setPath', (event, data) => {
    console.log(data, '=====');
    // console.log(JSON.stringify({ type: 'setPath', data: data }));

    system.send({ type: 'setPath', data: data });
  });
}

function handleStart() {
  ipcMain.on('scanner', (event, data) => {
    console.log('开始', '====')
    system.send({ type: 'start' });
  });
}


function handleDelete() {
  ipcMain.on('delete', (event, data) => {
    system.send({ type: 'delete', data: data });
  });
}

module.exports = () => {
  handleConnect();
  handleStart();
  handlePath();
  handleDelete();
}