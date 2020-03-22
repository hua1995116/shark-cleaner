import * as fsUtils from 'nodejs-fs-utils';
import * as fs from 'fs';
import * as path from 'path';
import * as loadPkg from 'load-json-file';
import { PKG_NAME, NODE_MODULES, IGNORE_FILES } from './constant';
import { byteConvert } from './shared';
import * as rimraf from 'rimraf';
import * as events from 'events';
import rules, { Parser, StaticRule } from './rules';
import * as home from 'home';

interface ProjectInfo {
  path: string;
  formatSize: string;
  size: number;
  info?: Object;
  computed: string;
  type: string;
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
      item.size = fsUtils.fsizeSync(path.join(itemPath, item.computed));
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
    this.loopStatic(rules.static);
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
    rules.recursive.map(item => {
      if (this.judgeInclude(strDir, item.has)) {
        const projectInfo: ProjectInfo = {
          path: parPath,
          computed: item.computed,
          size: 0,
          formatSize: '',
          type: item.type
        }
        if (item.info) {
          projectInfo.info = this.parseInfo(item.info, parPath);
        }
        this.projectTree.push(projectInfo);
      }
    })
    dirs.forEach(item => {
      const curPath = path.join(parPath, item.name);
      if (item.isSymbolicLink()) {
        return;
      }
      if (item.isDirectory() && !rules.ignore.includes(item.name) && !this.ignoreList.includes(item.name)) {
        this.loopReadFile2(curPath);
      }
    })
  }
  loopStatic(staticList: StaticRule[]) {
    for (let i = 0; i < staticList.length; i++) {
      const staticFile = staticList[i];
      if (staticFile.computed === './') {
        const projectInfo: ProjectInfo = {
          path: home.resolve(staticFile.path),
          computed: staticFile.computed,
          size: 0,
          formatSize: '',
          type: staticFile.type
        }
        this.projectTree.push(projectInfo);
      } else if (staticFile.computed === './**') {
        const listPath = home.resolve(staticFile.path);
        let dirs = [];
        try {
          dirs = fs.readdirSync(listPath, {
            withFileTypes: true
          });
        } catch (e) {
          console.error(e);
        }
        dirs.forEach(item => {
          const curPath = path.join(listPath, item.name);
          const projectInfo: ProjectInfo = {
            path: curPath,
            computed: './',
            size: 0,
            formatSize: '',
            type: staticFile.type
          }
          this.projectTree.push(projectInfo);
        })
      }
    }
  }
  parseInfo(info: Parser, parPath) {
    let parseObj;
    try {
      parseObj = info.parse(path.join(parPath, info.file));
    } catch {
      parseObj = {};
    }
    return info.values.reduce((infos, item) => {
      infos[item] = parseObj[item];
      return infos;
    }, {});
  }
  judgeInclude(dirs, has) {
    let start = 0;
    for (let i = 0; i < has.length; i++) {
      if (dirs.includes(has[i])) start++;
    }
    if (start === has.length) return true;
    return false;
  }
}

export default FsSystem;