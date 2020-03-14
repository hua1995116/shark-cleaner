// import * as FS from 'fs';

interface fsizeOptions {
  symbolicLinks?: Boolean;
  skipErrors?: Boolean;
  logErrors?: Boolean;
  countFolders?: Boolean;
  countSymbolicLinks?: Boolean;
  // fs?: FS
}

declare module 'nodejs-fs-utils' {
  namespace NodejsFsUtils {
    function fsize(path: string, opts?: fsizeOptions, callback?: Function): void;
    function fsizeSync(path: string, opts?: fsizeOptions): number;
  }
  export = NodejsFsUtils;
}