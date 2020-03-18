import * as fsUtils from 'nodejs-fs-utils';
import * as fs from 'fs';
import * as path from 'path';
import * as loadPkg from 'load-json-file';
import { PKG_NAME, NODE_MODULES, IGNORE_FILES } from './constant';
import { byteConvert } from './shared';
import * as rimraf from 'rimraf';
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
  private isRemove: boolean;
  constructor(options?: Options) {
    super();
    this.workPath = options.path;
    this.ignoreList = options.ignore.concat(IGNORE_FILES);
    this.projectTree = [];
    this.isRemove = false;
  }
  abort() {

  }
  setWorkPath(path) {
    this.workPath = path;
  }
  emitError() {

  }
  emitFile(filename) {
    console.log('filename', filename);
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
  emitDeleteStart() {
    this.emit('delete-start');
  }
  emitDeleteFile(path) {
    this.emit('delete-file', path);
  }
  emitDeleteDone() {
    this.emit('delete-done');
  }
  emitErrorFile() {
    this.emit('file-error');
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
    if (!fs.existsSync(this.workPath)) {
      // judge file is exist
      this.emitErrorFile();
      return;
    }
    this.loopReadFile2(this.workPath);
    this.scannerCallback();
  }
  async delete(pathList) {
    if (this.isRemove) {
      return;
    }
    this.isRemove = true;
    this.emitDeleteStart();
    for (let i = 0; i < pathList.length; i++) {
      try {
        rimraf.sync(pathList[i]);
        this.emitDeleteFile(pathList[i]);
      } catch (e) {

      }
    }
    this.isRemove = false;
    this.emitDeleteDone();
  }
  loopReadFile2(parPath: string) {
    this.emitFile(parPath);
    let dirs = [];
    try {
      dirs = fs.readdirSync(parPath, {
        withFileTypes: true
      });
    } catch (e) {
      console.error(e);
    }
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