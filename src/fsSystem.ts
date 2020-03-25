import * as fsUtils from 'nodejs-fs-utils';
import * as fs from 'fs';
import * as path from 'path';
import * as loadPkg from 'load-json-file';
import { PKG_NAME, NODE_MODULES, IGNORE_FILES } from './constant';
import { byteConvert } from './shared';
import * as rimraf from 'rimraf';
import * as events from 'events';
import * as multimatch from 'multimatch';
import rules, { Parser, StaticRule } from './rules';
import { lastAccess } from './analysis';

interface ProjectInfo {
  path: string;
  formatSize: string;
  size: number;
  info?: Object;
  computed: string;
  type: string;
  lastATime?: number;
  lastFile?: string;
}

interface Options {
  path: string;
  ignore?: string[];
  static?: boolean;
}

class FsSystem extends events.EventEmitter {
  public workPath: string;
  public projectTree: ProjectInfo[];
  public ignoreList: string[];
  private isRemove: boolean;
  private isStatic: boolean;
  constructor(options?: Options) {
    super();
    this.workPath = options.path;
    this.ignoreList = (typeof options.ignore) === 'undefined' ? IGNORE_FILES : options.ignore.concat(IGNORE_FILES);
    this.isStatic = (typeof options.static) === 'undefined' ? true : options.static;
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
  emitDeleteFile(type, path) {
    this.emit(`delete-file-${type}`, path);
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
      item.size = this.computedSize(path.join(itemPath, item.computed));
      item.formatSize = byteConvert(item.size);
      const [lastAtime, lastFile] = lastAccess(itemPath, {
        ignore: [...(rules.ignore), ...(this.ignoreList)]
      });
      item.lastATime = lastAtime;
      item.lastFile = lastFile;
      this.emitComputed({
        current: i,
        path: itemPath,
        total
      });
    }
    this.emitdDone();
    this.projectTree = [];
  }
  computedSize(curPath) {
    return fsUtils.fsizeSync(curPath);
  }
  run() {
    if (!fs.existsSync(this.workPath)) {
      // judge file is exist
      this.emitErrorFile();
      return;
    }
    this.loopReadFile2(this.workPath);
    if (this.isStatic) {
      this.loopStatic(rules.static);
    }
    this.scannerCallback();
  }
  delete(pathList) {
    if (this.isRemove) {
      return;
    }
    this.isRemove = true;
    this.emitDeleteStart();
    for (let i = 0; i < pathList.length; i++) {
      try {
        this.emitDeleteFile('start', pathList[i]);
        rimraf.sync(pathList[i]);
        this.emitDeleteFile('done', pathList[i]);
      } catch (e) {
        this.emitDeleteFile('error', pathList[i]);
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
      if (item.isDirectory() && !rules.ignore.includes(item.name) && multimatch([item.name], this.ignoreList).length === 0) {
        this.loopReadFile2(curPath);
      }
    })
  }
  loopStatic(staticList: StaticRule[]) {
    for (let i = 0; i < staticList.length; i++) {
      const staticFile = staticList[i];
      if (!fs.existsSync(staticFile.path)) {
        continue;
      }
      if (staticFile.computed === './') {
        const projectInfo: ProjectInfo = {
          path: staticFile.path,
          computed: staticFile.computed,
          size: 0,
          formatSize: '',
          type: staticFile.type
        }
        this.projectTree.push(projectInfo);
      } else if (staticFile.computed === './**') {
        const listPath = staticFile.path;
        let dirs = [];
        try {
          dirs = fs.readdirSync(listPath, {
            withFileTypes: true
          });
        } catch (e) {
          console.error(e);
        }
        dirs.forEach(item => {
          // 只有是目录才添加
          if (item.isDirectory()) {
            const curPath = path.join(listPath, item.name);
            const projectInfo: ProjectInfo = {
              path: curPath,
              computed: './',
              size: 0,
              formatSize: '',
              type: staticFile.type
            }
            this.projectTree.push(projectInfo);
          }
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