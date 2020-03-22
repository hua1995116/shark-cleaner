const path = require('path');
const assert = require("assert");
const fs = require('fs');
const fsSystem = require('../dist/fsSystem').default;

describe('test scanner', () => {
  const systemIntance = new fsSystem({
    path: path.join(__dirname, 'test-pkg'),
    ignore: []
  });
  // 启动一个 websocket服务器，然后等待连接来到，连接到来之后socket

  it('test scanner', (done) => {
    systemIntance.on('done', (fileList) => {
      const list = [{ "path": "/Users/huayifeng/my/clean-node-pkg/test/test-pkg/a", "computed": "node_modules", "size": 111, "formatSize": "111 bytes", "type": "node_modules", "info": { "author": "hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)", "description": "hello" } }, { "path": "/Users/huayifeng/my/clean-node-pkg/test/test-pkg/b", "computed": "node_modules", "size": 111, "formatSize": "111 bytes", "type": "node_modules", "info": { "author": "hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)", "description": "hello" } }];
      assert.deepEqual(list, fileList);
      done();
    });
    systemIntance.run();
  });
  it('test delete file', () => {
    const deletePath = path.join(__dirname, 'test-pkg', 'a', 'node_modules');
    const copyPath = path.join(__dirname, 'test-pkg', 'b', 'node_modules', '1.js');
    systemIntance.delete([deletePath]);
    assert.equal(fs.existsSync(deletePath), false);
    fs.mkdirSync(deletePath);
    fs.copyFileSync(copyPath, path.join(deletePath, '1.js'));
  });
})