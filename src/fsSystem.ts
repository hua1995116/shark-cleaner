import * as fsUtils from 'nodejs-fs-utils';
import * as fs from 'fs';
import * as path from 'path';
import * as loadPkg from 'load-json-file';
import { PKG_NAME, NODE_MODULES, IGNORE_FILES } from './constant';
import { byteConvert } from './shared';
import * as events from 'events';

interface ProjectInfo {
  path: string;
  desc: string;
  author: string;
  formatSize: string;
  size: number;
}

class FsSystem extends events.EventEmitter {
  public workPath: string;
  public projectTree: ProjectInfo[];
  constructor(workPath: string) {
    super();
    this.workPath = workPath;
    this.projectTree = [];
  }
  emitFile(filename) {
    this.emit('file', filename);
  }
  emitScanner() {
    this.emit('scannerDone');
  }
  emitdDone() {
    this.emit('done', this.projectTree);
  }
  emitComputed(project) {
    this.emit('computed', project);
  }
  scannerCallback() {
    const total = this.projectTree.length;
    for (let i = 0; i < total; i++) {
      const item = this.projectTree[i];
      const itemPath = item.path;
      item.size = fsUtils.fsizeSync(path.join(itemPath, NODE_MODULES));
      item.formatSize = byteConvert(item.size);
      this.emitComputed({
        current: i,
        path: itemPath,
        total
      });
    }
    this.emitdDone();
    this.projectTree = [];
  }
  run() {
    this.loopReadFile(this.workPath, this.scannerCallback.bind(this));
  }
  loopReadFile(parPath: string, callback: Function) {
    const self = this;
    self.emitFile(parPath);
    fs.readdir(parPath, { withFileTypes: true }, function (err, dirs) {
      if (err) {
        return;
      }
      let count = 0
      const checkEnd = function () {
        ++count == dirs.length && callback()
      }

      const strDir = dirs.map(item => item.name);
      if (self.isNodeProject(strDir, parPath)) {
        const pkgJSON = self.getPkgObj(path.join(parPath, PKG_NAME));
        const projectInfo: ProjectInfo = {
          path: parPath,
          desc: pkgJSON.description || '',
          author: JSON.stringify(pkgJSON.author || ''),
          size: 0,
          formatSize: ''
        }
        self.projectTree.push(projectInfo);
      }

      dirs.forEach(function (item) {
        const curPath = path.join(parPath, item.name);
        if (item.isSymbolicLink()) {
          return;
        }
        if (item.isDirectory() && !item.name.includes(NODE_MODULES) && !IGNORE_FILES.includes(item.name)) {
          return self.loopReadFile(curPath, checkEnd);
        }
        checkEnd()
      })

      //为空时直接回调
      dirs.length === 0 && callback()
    })
  }
  isNodeProject(list: string[], pkgDir: string): Boolean {
    // has package.json && is not npm pkg && include node_modules
    return this.isIncludePkg(list) && this.isNpmPkg(pkgDir) && this.isIncludeNodeModules(list);
  }
  isIncludePkg(list) {
    return list.includes(PKG_NAME);
  }
  isIncludeNodeModules(list) {
    return list.includes(NODE_MODULES);
  }
  getPkgObj(pkgPath): any {
    try {
      return loadPkg.sync(pkgPath);
    } catch (e) {
      return {}
    }
  }
  isNpmPkg(pkgDir) {
    const pkgJSON = this.getPkgObj(path.join(pkgDir, PKG_NAME));
    return !pkgJSON._resolved;
  }
}

export default FsSystem;