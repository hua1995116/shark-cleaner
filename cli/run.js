const fsSystem = require('../dist/fsSystem').default;

const options = JSON.parse(process.argv[2]) || {};

console.log('info', options);

const systemIntance = new fsSystem(options);
let setList = new Set();
// 启动一个 websocket服务器，然后等待连接来到，连接到来之后socket
systemIntance.on('file', (filename) => {
  if (setList.size === 20) {
    process.send({type: 'file', data: [...setList]})
    setList.clear();
  }
  setList.add(filename);
});
systemIntance.on('computed', (project) => {
  process.send({type: 'computed', data: project})
});
systemIntance.on('done', (fileList) => {
  process.send({type: 'done', data: fileList})
});
systemIntance.on('scannerDone', () => {
  process.send({type: 'scannerDone'})
})
systemIntance.on('delete-start', () => {
  process.send({type: 'delete-start'})
})
systemIntance.on('delete-file-start', (path) => {
  process.send({type: 'delete-file-start', data: path})
})
systemIntance.on('delete-file-error', (path) => {
  process.send({type: 'delete-file-error', data: path})
})
systemIntance.on('delete-file-done', (path) => {
  process.send({type: 'delete-file-done', data: path})
})
systemIntance.on('delete-done', () => {
  process.send({type: 'delete-done'})
})
systemIntance.on('file-error', () => {
  process.send({type: 'file-error'})
})

process.on('message', (m) => {
  if (m.type === 'start') {
    systemIntance.run();
  }
  if (m.type === 'setPath') {
    systemIntance.setWorkPath(m.data);
  }
  if (m.type === 'delete') {
    systemIntance.delete(m.data);
  }
})