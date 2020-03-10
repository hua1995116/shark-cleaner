interface ProjectInfo {
    path: String;
    desc: String;
    author: String;
    size: string;
}
declare class FsSystem {
    workPath: string;
    projectTree: ProjectInfo[];
    constructor(workPath: string);
    emitFile(filename: any): void;
    init(): void;
    loopReadFile(parPath: string): void;
    isNodeProject(list: string[], pkgDir: string): Boolean;
    isIncludePkg(list: any): any;
    isIncludeNodeModules(list: any): any;
    getPkgObj(pkgPath: any): any;
    isNpmPkg(pkgDir: any): boolean;
}
export default FsSystem;
