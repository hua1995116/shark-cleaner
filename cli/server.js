const Koa = require('koa');
const Socket = require('socket.io');
const http = require('http');
const serve = require('koa-static');
const child = require('child_process');
const path = require('path');

class ClearNode {
  constructor(options) {
    this.server = null;
    this.options = options;
    // this.run();
  }
  run(cb) {
    const app = new Koa();
    app.use(serve('client-dist'));
    this.server = app.listen(this.options.port, cb);
    const io = Socket(this.server, { origins: '*:*' });
    let self = this;
    // // 启动一个 websocket服务器，然后等待连接来到，连接到来之后socket
    let sockets = [];
    const system = child.fork(path.join(__dirname, 'run.js'), [JSON.stringify(this.options)]);

    system.on('exit', () => {
      console.log('exit argument==', arguments);
    })
    system.on('error', () => {
      console.log('error argument==', arguments);
    })
    system.on('message', (m) => {
      console.log('PARENT got message:', m);
      switch (m.type) {
        case 'file': {
          const setList = m.data;
          sockets.forEach(item => {
            item.emit('file', setList);
          });
          break;
        }
        case 'computed': {
          const project = m.data;
          sockets.forEach(item => {
            item.emit('computed', project);
          });
          break;
        }
        case 'scannerDone': {
          sockets.forEach(item => {
            item.emit('scannerDone');
          });
          break;
        }
        case 'done': {
          const fileList = m.data;
          sockets.forEach(item => {
            item.emit('done', fileList);
          });
          break;
        }
        case 'delete-start': {
          sockets.forEach(item => {
            item.emit('delete-start');
          });
          break;
        }
        case 'delete-file': {
          const file = m.data;
          sockets.forEach(item => {
            item.emit('delete-file', file);
          });
          break;
        }
        case 'delete-done': {
          const fileList = m.data;
          sockets.forEach(item => {
            item.emit('delete-done');
          });
          break;
        }
        case 'file-error': {
          sockets.forEach(item => {
            item.emit('file-error');
          });
          break;
        }
      }
    });
    io.on("connection", socket => {
      socket.emit("hash");
      // 再向客户端发送一个ok
      socket.emit("ok");

      sockets.push(socket);

      socket.on('scanner', () => {
        console.log('recived scanner');
        system.send({ type: 'start' });
      })
      socket.on('setPath', (path) => {
        system.send({ type: 'setPath', data: path });
      })
      socket.on('delete', (path) => {
        system.send({ type: 'delete', data: path });
      })
    });

  }
}

module.exports = ClearNode;