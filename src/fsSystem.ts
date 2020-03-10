import * as fsUtils from 'nodejs-fs-utils';
import * as fs from 'fs';
import * as path from 'path';
import * as loadPkg from 'load-json-file';
import { ROOT_PATH, PKG_NAME, NODE_MODULES } from './constant';
import events from './events';
import { byteConvert } from './shared';

interface ProjectInfo {
  path: String;
  desc: String;
  author: String;
  size: string;
}

class FsSystem {
  public workPath: string;
  public projectTree: ProjectInfo[];
  constructor(workPath: string) {
    this.workPath = workPath;
    this.projectTree = [];
    this.init();
  }
  emitFile(filename) {
    events.emit('file', filename);
  }
  init() {
    this.loopReadFile(this.workPath || ROOT_PATH)
  }
  loopReadFile(parPath: string) {
    this.emitFile(parPath);
    const dirs = fs.readdirSync(parPath, {
      withFileTypes: true
    });
    const strDir = dirs.map(item => item.name);
    if (this.isNodeProject(strDir, parPath)) {
      const pkgJSON = this.getPkgObj(path.join(parPath, PKG_NAME));
      const projectInfo: ProjectInfo = {
        path: parPath,
        desc: pkgJSON.description,
        author: pkgJSON.author,
        size: byteConvert(fsUtils.fsizeSync(path.join(parPath, NODE_MODULES)))
      }
      this.projectTree.push(projectInfo);
    }
    dirs.forEach(item => {
      const curPath = path.join(parPath, item.name);
      if (item.isSymbolicLink()) {
        return;
      }
      if (item.isDirectory() && !item.name.includes(NODE_MODULES)) {
        this.loopReadFile(curPath);
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