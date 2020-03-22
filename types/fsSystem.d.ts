/// <reference types="node" />
import * as events from 'events';
import { Parser, StaticRule } from './rules';
interface ProjectInfo {
    path: string;
    formatSize: string;
    size: number;
    info?: Object;
    computed: string;
    type: string;
}
interface Options {
    path: string;
    ignore?: string[];
    static?: boolean;
}
declare class FsSystem extends events.EventEmitter {
    workPath: string;
    projectTree: ProjectInfo[];
    ignoreList: string[];
    private isRemove;
    private isStatic;
    constructor(options?: Options);
    abort(): void;
    setWorkPath(path: any): void;
    emitError(): void;
    emitFile(filename: any): void;
    emitScanner(): void;
    emitdDone(): void;
    emitComputed(project: any): void;
    emitDeleteStart(): void;
    emitDeleteFile(path: any): void;
    emitDeleteDone(): void;
    emitErrorFile(): void;
    scannerCallback(): void;
    computedSize(curPath: any): number;
    run(): void;
    delete(pathList: any): void;
    loopReadFile2(parPath: string): void;
    loopStatic(staticList: StaticRule[]): void;
    parseInfo(info: Parser, parPath: any): {};
    judgeInclude(dirs: any, has: any): boolean;
}
export default FsSystem;
