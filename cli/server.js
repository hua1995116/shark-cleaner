
const Koa = require('koa');
const Socket = require('socket.io');
const http = require('http');
const serve = require('koa-static');
const os = require('os');
const child = require('child_process');
const path = require('path');

class ClearNode {
  constructor(path) {
    this.server = null;
    this.path = path || os.homedir();
    this.run();
  }
  run() {
    const app = new Koa();
    app.use(serve('client-dist'));
    this.server = app.listen(8082);
    const io = Socket(this.server, { origins: '*:*' });
    let self = this;
    // // 启动一个 websocket服务器，然后等待连接来到，连接到来之后socket
    let sockets = [];
    const system = child.fork(path.join(__dirname, '../dist', 'run.js'));

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
      }
    });

    // Causes the child to print: CHILD got message: { hello: 'world' }
    // this.systemIntance = new fsSystem(this.path);
    // self.systemIntance.on('file', (filename) => {
    //   console.log(filename);
    //   if (setList.size === 20) {
    //     sockets.forEach(item => {
    //       item.emit('file', [...setList]);
    //     });
    //     setList.clear();
    //   }
    //   setList.add(filename);
    // });
    // self.systemIntance.on('done', (fileList) => {
    //   sockets.forEach(item => {
    //     item.emit('done', fileList);
    //   })
    // });

    io.on("connection", socket => {
      // sockets.push(socket);
      socket.emit("hash");
      // 再向客户端发送一个ok
      socket.emit("ok");

      sockets.push(socket);

      socket.on('scanner', () => {
        console.log('recived scanner');
        system.send({ type: 'start' });
        // setInterval(() => {
        //   socket.emit('file', '/qwe/eqw');
        // }, 50);
      })
    });

    // self.systemIntance.on('file', (filename) => {
    //   console.log('recived==', filename);
    // });
    // self.systemIntance.on('done', (fileList) => {
    //   console.log('recived==', fileList);
    // });
    // self.systemIntance.run();
    // console.log(systemIntance.projectTree);
  }
  // listen(port) {
  //   this.server.listen(port, () => {
  //     console.log(`服务器已经在${port}端口上启动了`);
  //   });
  // }
}

let server = new ClearNode('/Users/huayifeng/my/test/iframe');
// server.listen(8082);