/// <reference types="node" />
import * as events from 'events';
interface ProjectInfo {
    path: string;
    desc: string;
    author: string;
    formatSize: string;
    size: number;
}
interface Options {
    path: string;
    ignore: string[];
}
declare class FsSystem extends events.EventEmitter {
    workPath: string;
    projectTree: ProjectInfo[];
    ignoreList: string[];
    constructor(options: Options);
    abort(): void;
    setWorkPath(path: any): void;
    emitError(): void;
    emitFile(filename: any): void;
    emitScanner(): void;
    emitdDone(): void;
    emitComputed(project: any): void;
    scannerCallback(): void;
    run(): void;
    loopReadFile(parPath: string, callback: Function): void;
    delete(pathList: any): void;
    deleteFile(path: any): void;
    loopReadFile2(parPath: string): void;
    isNodeProject(list: string[], pkgDir: string): Boolean;
    isIncludePkg(list: any): any;
    isIncludeNodeModules(list: any): any;
    getPkgObj(pkgPath: any): any;
    isNpmPkg(pkgDir: any): boolean;
}
export default FsSystem;
