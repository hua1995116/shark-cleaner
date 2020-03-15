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

interface Options {
  path: string,
  ignore: string[]
}

class FsSystem extends events.EventEmitter {
  public workPath: string;
  public projectTree: ProjectInfo[];
  public ignoreList: string[];
  constructor(options?: Options) {
    super();
    this.workPath = options.path;
    this.ignoreList = options.ignore.concat(IGNORE_FILES);
    this.projectTree = [];
  }
  abort() {

  }
  setWorkPath(path) {
    this.workPath = path;
  }
  emitError() {

  }
  emitFile(filename) {
    console.log('filename==', filename);
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
    this.emitScanner();
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
    // this.loopReadFile(this.workPath, this.scannerCallback.bind(this));
    this.loopReadFile2(this.workPath);
    this.scannerCallback();
  }
  loopReadFile(parPath: string, callback: Function) {
    const self = this;
    self.emitFile(parPath);
    fs.readdir(parPath, { withFileTypes: true }, function (err, dirs) {
      if (err) {
        console.log(err);
        callback();
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
        if (item.isDirectory() && !item.name.includes(NODE_MODULES) && !self.ignoreList.includes(item.name)) {
          return self.loopReadFile(curPath, checkEnd);
        }
        checkEnd()
      })

      //为空时直接回调
      dirs.length === 0 && callback()
    })
  }
  delete(pathList) {
    for (let i = 0; i < pathList.length; i++) {
      this.deleteFile(pathList[i]);
    }
  }
  deleteFile(path) {
    if (fs.existsSync(path)) {
      const files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteFile(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
  loopReadFile2(parPath: string) {
    this.emitFile(parPath);
    const dirs = fs.readdirSync(parPath, {
      withFileTypes: true
    });
    const strDir = dirs.map(item => item.name);
    if (this.isNodeProject(strDir, parPath)) {
      const pkgJSON = this.getPkgObj(path.join(parPath, PKG_NAME));
      const projectInfo: ProjectInfo = {
        path: parPath,
        desc: pkgJSON.description || '',
        author: JSON.stringify(pkgJSON.author || ''),
        size: 0,
        formatSize: ''
      }
      this.projectTree.push(projectInfo);
    }
    dirs.forEach(item => {
      const curPath = path.join(parPath, item.name);
      if (item.isSymbolicLink()) {
        return;
      }
      if (item.isDirectory() && !item.name.includes(NODE_MODULES) && !this.ignoreList.includes(item.name)) {
        this.loopReadFile2(curPath);
      }
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