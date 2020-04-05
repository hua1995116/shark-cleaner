#!/usr/bin/env node
const program = require("commander");
const logSymbols = require('log-symbols');
const colors = require('colors');
const Server = require('./server');
const open = require('open');
const os = require('os');

const info = {
  path: os.homedir(),
  ignore: [],
  port: 8082,
  static: false
};

program
  .version("0.1.0")
  .option("-p, --path [path]", `scanner path | <example> node-cleaner -p './dist'`)
  .option("-i, --ignore", "ignore directory | <example> node-cleaner -p '.git,.vscode'")
  .parse(process.argv);

if (program.path) {
  try {
    info.path = program.path;
  } catch (e) {
    console.log(logSymbols.error, `node-cleaner -p <path> must have params'`.red);
    process.exit(0);
  }
}

if (program.ignore) {
  try {
    const i = program.ignore.split(",");
    info.push(...i);
  } catch (e) {
    console.log(logSymbols.error, `node-cleaner -i <ignore> must have params'`.red);
    process.exit(0);
  }
}


const runner = new Server(info);
runner.run(async (e) => {
  console.log(`listening on port ${info.port}`);
  if (process.env.NODE_ENV !== 'local') {
    await open(`http://localhost:${info.port}`);
  }
});