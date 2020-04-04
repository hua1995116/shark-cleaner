import electron from 'electron';
import io from "socket.io-client";

function setup(uri, options) {
  let ipcRenderer;
  if (process.env.RUN_TYPE !== 'electron') {
    return io(uri, options);
  } else {
    ipcRenderer = electron.ipcRenderer || {};
  }
  return {
    connect: () => {

    },
    disconnect: () => {

    },
    on: (event, cb) => {
      ipcRenderer.on(event, (e, data) => {
        cb(data);
      });
    },
    off: (event, cb) => {
      ipcRenderer.removeListener(event, cb)
    },
    emit: (event, data) => {
      ipcRenderer.send(event, data);
    }
  }
}

export default setup;