import * as fs from 'fs';
import * as path from 'path';
import * as multimatch from 'multimatch';

interface AnalySisOption {
  ignore: string[]
}

export function lastAccess(filePath, options: AnalySisOption): [number, string] {
  let lastAtime = 0;
  let lastFile = '';
  function loopfile(rootPath) {
    const dirs = fs.readdirSync(rootPath, {
      withFileTypes: true
    });
    dirs.forEach(item => {
      const curPath = path.join(rootPath, item.name);
      const stat = fs.statSync(curPath);
      // 如果是一些默认缓存文件或者扫描预读文件，则跳过
      if (multimatch([item.name], options.ignore).length > 0) {
        return;
      }
      if (item.isDirectory()) {
        loopfile(curPath);
      } else {
        if (+stat.atime > lastAtime) {
          lastAtime = +stat.atime;
          lastFile = item.name;
        }
      }
    })
  }
  loopfile(filePath);
  return [lastAtime, lastFile];
}

