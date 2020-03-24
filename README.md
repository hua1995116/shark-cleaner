# shark-cleaner

A cleaning tool to help you quickly clear cache garbage.

[中文文档](./zh-CN.md)

[English](./)

<p align="center">
    <a href="https://npmcharts.com/compare/shark-cleaner?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/shark-cleaner.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/shark-cleaner" rel="nofollow"><img src="https://img.shields.io/npm/v/shark-cleaner.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/shark-cleaner" rel="nofollow"><img src="https://img.shields.io/npm/l/shark-cleaner.svg?style=flat" style="max-width:100%;"></a>
</p>

## Origin

![1584517625611.jpg](https://s3.qiufengh.com/blog/1584517625611.jpg)

The origin of this project is because my computer has insufficient disks. I used some cleaning tools, but still couldn't clean up a lot of space for me. I'm a front-end development engineer, so I thought of a lot of `node_modules` in my working directory. Therefore, I developed a visual tool for cleaning `node_modules`. Of course, it will not only clean up `node_modules`. Its positioning is to clear all project caches. Currently it only supports cleaning `node_modules`, but it has saved me 20GB of space


## Usage

Node >= 10.10.0

```bash
npm install -g shark-cleaner

shark
```

## Effect Demo

video demo: https://s3.qiufengh.com/shark-cleaner/shark-cleaner.mp4

<img src="https://s3.qiufengh.com/shark-cleaner/shark-init.jpg" width="300"/>

<img src="https://s3.qiufengh.com/shark-cleaner/shark-scanner.jpg" width="300"/>

<img src="https://s3.qiufengh.com/shark-cleaner/shark-computed.jpg" width="300"/>


## Features

1. Support cleaning node_modules, nvm, npm cache
2. Support i18n

## TODO

1. ~~Support yarn cache cleanup~~
2. electron client development
3. More other language cache cleaning (such as go cache, pip cache)
4. Unit test


## Cache List

| Language | cache list     | Mac directory         |  Windows directory        | related                                   |
| ---- | ------------ | ---------------------- | -------------------------------- | ---------------------------------------- |
| Node | npm          | ~/.npm                 | \$HOME/AppData/Roaming/npm-cache | https://github.com/shinnn/npm-cache-path |
|      | node_modules | \$peoject/node_modules | \$peoject/node_modules           |                                          |
|      | nvm          | ~/.nvm/versions/node   | \$HOME/AppData/Roaming/nvm       |                                          |
|      | yarn         | ~/Library/Caches/Yarn  | \$HOME/AppData/Local/Yarn/Cache  |                                          |


## Need help

Hope to provide the path of the mainstream language cache package (such as go, python, etc.)

## Thanks

Animation Support(https://codepen.io/kevin_David_k/pen/eYNeQVY)

## Contribution

```bash
git clone https://github.com/hua1995116/shark-cleaner.git

npm install

node cli/index.js
```
another bash

```bash
cd client

npm install

npm run dev
```

Open: http://localhost:1234/

## License

Copyright (c) 2020 蓝色的秋风 (hua1995116) Licensed under the MIT license.

## Wechat Group

<img src="https://s3.qiufengh.com/blog/WechatIMG713.jpeg" width="300"/>