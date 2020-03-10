import events from './events';
import fsSystem from './fsSystem';

class ClearNode {
  constructor() {
    let server;
    events.on('file', (filename) => {
      console.log(filename);
    });
    this.run();
  }
  run() {
    const systemIntance = new fsSystem('/Users/huayifeng/work');
    console.log(systemIntance.projectTree);
  }
}

new ClearNode();