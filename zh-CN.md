# shark-cleaner

一个帮你快速清理缓存垃圾的清理工具。

[中文文档](./)

[English](./README.md)

<p align="center">
    <a href="https://npmcharts.com/compare/shark-cleaner?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/shark-cleaner.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/shark-cleaner" rel="nofollow"><img src="https://img.shields.io/npm/v/shark-cleaner.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/shark-cleaner" rel="nofollow"><img src="https://img.shields.io/npm/l/shark-cleaner.svg?style=flat" style="max-width:100%;"></a>
</p>

## 起源

![1584517625611.jpg](https://s3.qiufengh.com/blog/1584517625611.jpg)

这个项目起源是因为我的电脑磁盘不足, 我使用了一些清理工具，但是还是无法为我清理出大量的空间，我是一名前端开发工程师，因此我想到了在我的工作目录含有大量的 `node_modules`, 因此我开发了一个可视化的清理 `node_modules` 的工具，当然它不仅仅只会清理 `node_modules`。 它的定位是清理所有项目缓存, 目前它只支持清理 `node_modules`，但是它已经帮我节省了 20GB 的空间

## 使用

Node 版本大于等于 10.10.0

```bash
npm install -g shark-cleaner

shark
```

## 效果演示

视频演示: https://s3.qiufengh.com/shark-cleaner/shark-cleaner.mp4

<img src="https://s3.qiufengh.com/shark-cleaner/shark-init.jpg" width="300"/>

<img src="https://s3.qiufengh.com/shark-cleaner/shark-scanner.jpg" width="300"/>

<img src="https://s3.qiufengh.com/shark-cleaner/shark-computed.jpg" width="300"/>

## 功能

1. 支持清理 node_modules、nvm、npm 缓存
2. 支持国际化

## TODO

1. ~~支持 yarn cache 的清理~~
2. electron 客户端开发
3. 更多其他的语言缓存的清理（例如 go cache，pip cache）
4. 单元测试

## 缓存列表

| 语言 | 缓存列表     | 目录 Mac               | 目录 Windows                     | 相关库                                   |
| ---- | ------------ | ---------------------- | -------------------------------- | ---------------------------------------- |
| Node | npm          | ~/.npm                 | \$HOME/AppData/Roaming/npm-cache | https://github.com/shinnn/npm-cache-path |
|      | node_modules | \$peoject/node_modules | \$peoject/node_modules           |                                          |
|      | nvm          | ~/.nvm/versions/node   | \$HOME/AppData/Roaming/nvm       |                                          |
|      | yarn         | ~/Library/Caches/Yarn  | \$HOME/AppData/Local/Yarn/Cache  |                                          |

## 需要帮助

希望能提供主流语言缓存包的路径（例如 go、python 等）

## 鸣谢

动画支持(https://codepen.io/kevin_David_k/pen/eYNeQVY)

## 贡献

```bash
git clone https://github.com/hua1995116/shark-cleaner.git

npm install

node cli/index.js
```

打开另一个控制台

```bash
cd client

npm install

npm run dev
```

打开: http://localhost:1234/

## License

Copyright (c) 2020 蓝色的秋风 (hua1995116) Licensed under the MIT license.

## 微信交流群

<img src="https://s3.qiufengh.com/blog/WechatIMG713.jpeg" width="300"/>
