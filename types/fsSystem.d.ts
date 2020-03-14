/// <reference types="node" />
import * as events from 'events';
interface ProjectInfo {
    path: string;
    desc: string;
    author: string;
    formatSize: string;
    size: number;
}
declare class FsSystem extends events.EventEmitter {
    workPath: string;
    projectTree: ProjectInfo[];
    constructor(workPath: string);
    emitFile(filename: any): void;
    emitScanner(): void;
    emitdDone(): void;
    emitComputed(project: any): void;
    scannerCallback(): void;
    run(): void;
    loopReadFile(parPath: string, callback: Function): void;
    isNodeProject(list: string[], pkgDir: string): Boolean;
    isIncludePkg(list: any): any;
    isIncludeNodeModules(list: any): any;
    getPkgObj(pkgPath: any): any;
    isNpmPkg(pkgDir: any): boolean;
}
export default FsSystem;
