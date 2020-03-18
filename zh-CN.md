# shark-cleaner

一个帮你快速清理缓存垃圾的清理工具。

[中文文档](./)

[English](./README.md)

## 起源

![1584517625611.jpg](https://s3.qiufengh.com/blog/1584517625611.jpg)

这个项目起源是因为我的电脑磁盘不足, 我使用了一些清理工具，但是还是无法为我清理出大量的空间，我是一名前端开发工程师，因此我想到了在我的工作目录含有大量的 `node_modules`, 因此我开发了一个可视化的清理 `node_modules` 的工具，当然它不仅仅只会清理 `node_modules`。 它的定位是清理所有项目缓存, 目前它只支持清理 `node_modules`，但是它已经帮我节省了 20GB 的空间


## 使用

Node 版本大于等于 10.10.0

```bash
npm install -g node-shark

shark
```

## 效果演示



## TODO

1. 支持 npm cache，yarn cache 的清理
2. 支持 nvm 清理
3. electron 客户端开发
4. 更多其他的语言缓存的清理




## 缓存列表

| 语言 | 缓存列表     | 目录                                                         | 相关库                                   |
| ---- | ------------ | ------------------------------------------------------------ | ---------------------------------------- |
| Node | npm          | ~/.npm                                                       | https://github.com/shinnn/npm-cache-path |
|      | node_modules | $peoject/node_modules                                        |                                          |
|      | nvm          | ~/.nvm/versions/node                                         |                                          |
|      | yarn         | MacOS: /Users//Library/Caches/yarn Windows: C:/Users//AppData/Local/Yarn/cache |                                          |




## 贡献

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

打开: http://localhost:1234/