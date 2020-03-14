import fsSystem from './fsSystem';
import * as Koa from 'koa';
import * as Socket from 'socket.io';
import * as http from 'http';
import * as serve from 'koa-static'
import * as os from 'os';

class ClearNode {
  public server: any;
  public path: string;
  public systemIntance: any;
  constructor(path?) {
    this.server = null;
    this.path = path || os.homedir();
    this.run();
  }
  run() {
    const app: any = new Koa();
    app.use(serve('client-dist'));
    this.server = app.listen(8082);
    const io = Socket(this.server, { origins: '*:*' });
    this.systemIntance = new fsSystem(this.path);
    let self = this;
    let setList = new Set();
    // 启动一个 websocket服务器，然后等待连接来到，连接到来之后socket
    let sockets = [];
    self.systemIntance.on('file', (filename) => {
      console.log(filename);
      if (setList.size === 20) {
        sockets.forEach(item => {
          item.emit('file', [...setList]);
        });
        setList.clear();
      }
      setList.add(filename);
    });
    self.systemIntance.on('done', (fileList) => {
      sockets.forEach(item => {
        item.emit('done', fileList);
      })
    });

    io.on("connection", socket => {
      // sockets.push(socket);
      socket.emit("hash");
      // 再向客户端发送一个ok
      socket.emit("ok");

      sockets.push(socket);

      socket.on('scanner', () => {
        console.log('recived scanner');
        // self.systemIntance.run();
        setInterval(() => {
          socket.emit('file', '/qwe/eqw');
        }, 50);
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

let server = new ClearNode('/Users/huayifeng/my/test');
// server.listen(8082);