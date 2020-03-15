const fsSystem = require('../dist/fsSystem').default;

const options = JSON.parse(process.argv[2]) || {};

console.log('options', options);

const systemIntance = new fsSystem(options);
let setList = new Set();
// 启动一个 websocket服务器，然后等待连接来到，连接到来之后socket
systemIntance.on('file', (filename) => {
  // console.log('filename==', filename);
  if (setList.size === 20) {
    process.send({type: 'file', data: [...setList]})
    setList.clear();
  }
  // process.send({type: 'file', data: filename})
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