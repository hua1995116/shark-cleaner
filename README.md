# shark-cleaner

A cleaning tool to help you quickly clear cache garbage.

[中文文档](./zh-CN.md)

[English](./)

## Origin

![1584517625611.jpg](https://s3.qiufengh.com/blog/1584517625611.jpg)

The origin of this project is because my computer has insufficient disks. I used some cleaning tools, but still couldn't clean up a lot of space for me. I'm a front-end development engineer, so I thought of a lot of `node_modules` in my working directory. Therefore, I developed a visual tool for cleaning `node_modules`. Of course, it will not only clean up `node_modules`. Its positioning is to clear all project caches. Currently it only supports cleaning `node_modules`, but it has saved me 20GB of space


## Usage

```bash
npm install -g node-shark

shark
```

## Effect Demo



## TODO

1. Support npm cache, yarn cache cleaning
2. Support nvm cleaning
3. electron client development
4. More other language cache cleaning




## Cache List

| Language | cache list    | directory                                                         | related                                   |
| ---- | ------------ | ------------------------------------------------------------ | ---------------------------------------- |
| Node | npm          | ~/.npm                                                       | https://github.com/shinnn/npm-cache-path |
|      | node_modules | $peoject/node_modules                                        |                                          |
|      | nvm          | ~/.nvm/versions/node                                         |                                          |
|      | yarn         | MacOS: /Users//Library/Caches/yarn Windows: C:/Users//AppData/Local/Yarn/cache |                                          |




## Contribution

```bash
git clone https://github.com/hua1995116/shark-cleaner.git

npm install

node cli / index.js
```
another bash

```bash
cd client

npm install

npm run dev
```

Open: http://localhost:1234/