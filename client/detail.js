import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import i18n from "./i18n";
import { Checkbox, Tooltip, Button, message, Modal } from "antd";
import {
  SettingTwoTone,
  InfoCircleTwoTone,
  LoadingOutlined,
  ExperimentTwoTone,
  RestTwoTone,
  ThunderboltTwoTone
} from "@ant-design/icons";
import findIndex from "lodash/findIndex";
import { join } from "./shared";
import { format } from 'timeago.js';
// import Tip from './tip';
const logoList = [<SettingTwoTone />, <RestTwoTone />, <ExperimentTwoTone />, <ThunderboltTwoTone />]

window.list = [{
  path: '/Users/huayifeng/my/test',
  computed: 'node_modules',
  size: 4419301,
  formatSize: '4.21 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1584534787540,
  lastFile: 'package-lock.json'
},
{
  path: '/Users/huayifeng/my/test/2018',
  computed: 'node_modules',
  size: 132022,
  formatSize: '128.93 KB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582606134976,
  lastFile: 'example.gif'
},
{
  path: '/Users/huayifeng/my/test/Tapable',
  computed: 'node_modules',
  size: 239502,
  formatSize: '233.89 KB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582608789638,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/antd/1zh16/select',
  computed: 'node_modules',
  size: 351996538,
  formatSize: '335.69 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1584534787540,
  lastFile: 'package-lock.json'
},
{
  path: '/Users/huayifeng/my/test/babel-plugin',
  computed: 'node_modules',
  size: 29151037,
  formatSize: '27.80 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582606758856,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/benchmark-test',
  computed: 'node_modules',
  size: 1572403,
  formatSize: '1.50 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582638409064,
  lastFile: '1.html'
},
{
  path: '/Users/huayifeng/my/test/enquirer/examples',
  computed: 'node_modules',
  size: 483354,
  formatSize: '472.03 KB',
  type: 'node_modules',
  info: {},
  lastATime: 1582607288246,
  lastFile: 'option-initial-array.js'
},
{
  path: '/Users/huayifeng/my/test/jwt',
  computed: 'node_modules',
  size: 1107544,
  formatSize: '1.06 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582608789656,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/log-color',
  computed: 'node_modules',
  size: 1673822,
  formatSize: '1.60 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582622603538,
  lastFile: 'support.js'
},
{
  path: '/Users/huayifeng/my/test/log-color/ansi-html',
  computed: 'node_modules',
  size: 2253774,
  formatSize: '2.15 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582609003635,
  lastFile: 'LICENSE'
},
{
  path: '/Users/huayifeng/my/test/micro-frontend-example',
  computed: 'node_modules',
  size: 71897899,
  formatSize: '68.57 MB',
  type: 'node_modules',
  info: {},
  lastATime: 1582628296556,
  lastFile: 'yarn.lock'
},
{
  path: '/Users/huayifeng/my/test/module_alias',
  computed: 'node_modules',
  size: 13479,
  formatSize: '13.16 KB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582599631935,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/mop',
  computed: 'node_modules',
  size: 13416175,
  formatSize: '12.79 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1583207730038,
  lastFile: 'user3.js'
},
{
  path: '/Users/huayifeng/my/test/mop/gettime',
  computed: 'node_modules',
  size: 4497598,
  formatSize: '4.29 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582629906653,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/mss-sdk',
  computed: 'node_modules',
  size: 14483773,
  formatSize: '13.81 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582603234978,
  lastFile: 'a.js'
},
{
  path: '/Users/huayifeng/my/test/next/next-demo-01',
  computed: 'node_modules',
  size: 47107123,
  formatSize: '44.92 MB',
  type: 'node_modules',
  info: {},
  lastATime: 1582627970393,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/next/next-go',
  computed: 'node_modules',
  size: 77868842,
  formatSize: '74.26 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582628089238,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/next/town',
  computed: 'node_modules',
  size: 47134159,
  formatSize: '44.95 MB',
  type: 'node_modules',
  info: {},
  lastATime: 1582627970396,
  lastFile: 'nav.js'
},
{
  path: '/Users/huayifeng/my/test/snowpack-demo',
  computed: 'node_modules',
  size: 79713291,
  formatSize: '76.02 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582693466720,
  lastFile: 'index.tsx'
},
{
  path: '/Users/huayifeng/my/test/test-llvm/llvm-node',
  computed: 'node_modules',
  size: 110701567,
  formatSize: '105.57 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582641389200,
  lastFile: 'cmake_install.cmake'
},
{
  path: '/Users/huayifeng/my/test/test_URI',
  computed: 'node_modules',
  size: 450914,
  formatSize: '440.35 KB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582628784336,
  lastFile: 'index.js'
},
{
  path: '/Users/huayifeng/my/test/test_npm',
  computed: 'node_modules',
  size: 39644305,
  formatSize: '37.81 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582629580763,
  lastFile: '1.txt'
},
{
  path: '/Users/huayifeng/my/test/ts-react-process',
  computed: 'node_modules',
  size: 50668345,
  formatSize: '48.32 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582641243988,
  lastFile: 'index.html'
},
{
  path: '/Users/huayifeng/my/test/vue-flex-touch',
  computed: 'node_modules',
  size: 36880389,
  formatSize: '35.17 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582627441243,
  lastFile: 'index.js'
},
{
  path:
    '/Users/huayifeng/my/test/vue-flex-touch/example/vue-flex-touch-demo02',
  computed: 'node_modules',
  size: 116119102,
  formatSize: '110.74 MB',
  type: 'node_modules',
  info: {},
  lastATime: 1582627267413,
  lastFile: 'main.js'
},
{
  path: '/Users/huayifeng/my/test/vue-react-rander',
  computed: 'node_modules',
  size: 112210436,
  formatSize: '107.01 MB',
  type: 'node_modules',
  info: [Object],
  lastATime: 1582603282485,
  lastFile: 'vue-react-rander.e31bb0bc.map'
},
{
  path: '/Users/huayifeng/my/test/vue-router2',
  computed: 'node_modules',
  size: 95527197,
  formatSize: '91.10 MB',
  type: 'node_modules',
  info: {},
  lastATime: 1584268076561,
  lastFile: 'package-lock.json'
},
{
  path: '/Users/huayifeng/.npm',
  computed: './',
  size: 1204556954,
  formatSize: '1.12 GB',
  type: 'npm_cache',
  lastATime: 1585149140545,
  lastFile: 'f75b41381291d04611f1bf14109ac00651d7'
},
{
  path: '/Users/huayifeng/.nvm/versions/node/v10.10.0',
  computed: './',
  size: 281723063,
  formatSize: '268.67 MB',
  type: 'node_cache',
  lastATime: 1585149178168,
  lastFile: 'node'
},
{
  path: '/Users/huayifeng/.nvm/versions/node/v10.16.0',
  computed: './',
  size: 520124008,
  formatSize: '496.03 MB',
  type: 'node_cache',
  lastATime: 1584505143570,
  lastFile: 'npm'
},
{
  path: '/Users/huayifeng/.nvm/versions/node/v12.16.0',
  computed: './',
  size: 76790390,
  formatSize: '73.23 MB',
  type: 'node_cache',
  lastATime: 1582951153417,
  lastFile: 'node'
},
{
  path: '/Users/huayifeng/.nvm/versions/node/v6.9.3',
  computed: './',
  size: 57371651,
  formatSize: '54.71 MB',
  type: 'node_cache',
  lastATime: 1583898338999,
  lastFile: 'node'
},
{
  path: '/Users/huayifeng/.nvm/versions/node/v8.5.0',
  computed: './',
  size: 1504856951,
  formatSize: '1.40 GB',
  type: 'node_cache',
  lastATime: 1585149157523,
  lastFile: 'flow'
},
{
  path: '/Users/huayifeng/.nvm/versions/node/v8.9.0',
  computed: './',
  size: 112609829,
  formatSize: '107.39 MB',
  type: 'node_cache',
  lastATime: 1583925154751,
  lastFile: 'npm'
},
{
  path: '/Users/huayifeng/.npminstall_tarball',
  computed: './',
  size: 1182264293,
  formatSize: '1.10 GB',
  type: 'npm_cache',
  lastATime: 1584516556650,
  lastFile: '3.8.3-409eb8544ea0335711205869ec458ab109ee1061.tgz'
},
{
  path: '/Users/huayifeng/Library/Caches/Yarn/v4',
  computed: './',
  size: 683851899,
  formatSize: '652.17 MB',
  type: 'yarn_cache',
  lastATime: 0,
  lastFile: ''
},
{
  path: '/Users/huayifeng/Library/Caches/Yarn/v6',
  computed: './',
  size: 742391882,
  formatSize: '708.00 MB',
  type: 'yarn_cache',
  lastATime: 0,
  lastFile: ''
}];
function conversionGroup(list) {
  const groups = list.reduce((group, item) => {
    if (!group[item.type]) {
      group[item.type] = [];
    }
    group[item.type].push(item);
    return group;
  }, {});
  return Object.keys(groups).reduce((cacheList, key) => {
    cacheList[key] = {
      logo: key[key.length - 1].charCodeAt() % 4,
      list: groups[key].sort((a, b) => b.size - a.size)
    };
    return cacheList;
  }, {});
}

function Detail(props) {
  const { socket } = props;
  const list = window.list || [];
  const { t } = useTranslation();
  const total = byteConvert(list.reduce((sum, item) => sum + item.size, 0));

  let initChecked = [],
    initSize = 0;

  const selectedList = list.map(item => {
    const extra = {
      status: 0, // 0 - normal 1 - loading 2 - finish
      disabled: false
    };
    if (Date.now() - item.lastATime > 7 * 24 * 60 * 60 * 1000) {
      initChecked.push({
        path: item.path,
        computed: item.computed
      });
      initSize += item.size;
      return {
        ...item,
        checked: true,
        ...extra
      };
    }

    return {
      ...item,
      checked: false,
      ...extra
    };
  });
  const [lastIndex, setLastIndex] = useState(-1);
  const [fileList, setList] = useState(selectedList);
  const [checkedList, setCheckList] = useState(initChecked);
  const [selectSize, setSelectSize] = useState(initSize);

  useEffect(() => {
    const deleteStart = () => {
      console.log("delete-start");
    };
    const deleteFileDone = file => {
      // set status
      const statusList = [...fileList];
      let reduceSize = 0;
      statusList.map(item => {
        const index = findIndex(checkedList, { path: item.path });
        if (index > -1) {
          item.status = 2;
          item.checked = false;
          reduceSize = item.size;
        }
      });
      setList(statusList);
    };
    const deleteDone = () => {
      setCheckList([]);
      setSelectSize(0);
      console.log("delete-done");
    };
    socket.on("delete-start", deleteStart);

    socket.on("delete-file-done", deleteFileDone);

    socket.on("delete-done", deleteDone);
    return () => {
      socket.off("delete-start", deleteStart);
      socket.off("delete-file-done", deleteFileDone);
      socket.off("delete-done", deleteDone);
    };
  }, [selectSize]);

  const groupList = conversionGroup(fileList);
  const groupOrderList = Object.keys(groupList).reduce((list, item) => (list.concat(groupList[item].list)), []);

  const handleSelect = (item, e) => {
    const listIndex = findIndex(groupOrderList, o => o.path === item.path);
    if (e.nativeEvent.shiftKey) {
      let start = 0,
        end = 0;
      if (listIndex > lastIndex) {
        start = lastIndex + 1;
        end = listIndex;
      } else {
        start = listIndex;
        end = lastIndex - 1;
      }
      let changeSize = 0;
      for (let i = start; i <= end; i++) {
        const file = groupOrderList[i];
        file.checked = !file.checked;

        const index = findIndex(checkedList, { path: file.path });
        if (index > -1) {
          checkedList.splice(index, 1);
          changeSize -= file.size;
        } else {
          checkedList.push({
            path: file.path,
            computed: file.computed
          });
          changeSize += file.size;
        }
      }
      setSelectSize(selectSize + changeSize);
      setCheckList(checkedList);
      setList(groupOrderList);
      return;
    }

    groupOrderList[listIndex].checked = !groupOrderList[listIndex].checked;
    const index = findIndex(checkedList, { path: item.path });
    if (index > -1) {
      checkedList.splice(index, 1);
      setSelectSize(selectSize - item.size);
    } else {
      checkedList.push({
        path: item.path,
        computed: item.computed
      });
      setSelectSize(selectSize + item.size);
    }
    setCheckList(checkedList);
    setList(groupOrderList);
    setLastIndex(listIndex);
  };

  const renderDetail = (author, path, desc) => (
    <React.Fragment>
      <p className="tip-p">author: {author ? author : "-"}</p>
      <p className="tip-p">path: {path}</p>
      <p className="tip-p">desc: {desc ? desc : "-"}</p>
    </React.Fragment>
  );

  const handleClean = () => {
    if (checkedList.length === 0) {
      message.warning(t("select_one"));
      return;
    }
    Modal.info({
      title: t("select_confirm"),
      maskClosable: true,
      width: 520,
      content: (
        <div>
          {checkedList.map((item, index) => (
            <p key={item.path}>
              {index + 1}. {join(item.path, item.computed)}
            </p>
          ))}
        </div>
      ),
      onOk() {
        console.log("onOk");
        const disabledList = [...fileList];
        disabledList.map(item => {
          const index = findIndex(checkedList, { path: item.path });
          if (index > -1) {
            item.disabled = true;
            item.status = 1;
          }
        });
        setList(disabledList);
        socket.emit(
          "delete",
          checkedList.map(item => join(item.path, item.computed))
        );
      }
    });
  };

  return (
    <div className="detail-container">
      {/* <Tip></Tip> */}
      <div className="detail-header">
        <div className="detail-header__info">
          <span>
            {t("total_cache")} {total}
          </span>
          <Button size={"small"} onClick={() => (location.href = "/")}>
            {t("back")}
          </Button>
          <br />
          <span className="detail-title__select">
            {t("already_select")}
            <span>{byteConvert(selectSize)}</span>
          </span>
        </div>
        <button
          className="button button-primary button-large"
          onClick={handleClean}
        >
          {t("clean")}
        </button>
      </div>
      {Object.keys(groupList).map(group => {
        return (
          <div className="detail-list" key={group}>
            <h3 className="detail-title">
              {logoList[groupList[group].logo]}
              <span className="detail-title__name">{group}</span>
            </h3>
            <ul>
              {groupList[group].list.map(item => {
                const name = item.path.split("/");
                const desc = item.info ? item.info.description ? item.info.description : "" : "";
                return (
                  <React.Fragment key={item.path}>
                    <li>
                      <span className="detail-list__check">
                        <Checkbox
                          disabled={item.disabled}
                          checked={item.checked}
                          onChange={e => {
                            handleSelect(item, e);
                          }}
                        >
                          <span className="detail-list__name">
                            {name[name.length - 1] || name[name.length - 2]}
                          </span>
                          <span className="detail-list__desc">
                            {desc.length > 30
                              ? desc.slice(0, 30) + "..."
                              : desc}
                          </span>
                        </Checkbox>
                      </span>
                      <span className="detail-list__tools">
                        <span className="detail-list__date">
                          {
                            item.lastATime ? (
                              <>
                                <span className="detail-list__timeago" datetime={item.lastATime}>{format(item.lastATime, i18n.languages[0].replace('-', '_'))}</span>
                                {t("lastAtime")}
                              </>
                            ) : ""
                          }
                        </span>
                        <span className="detail-list__status">
                          {item.status === 1 ? (
                            <span>
                              {t("cleaning")}
                              <LoadingOutlined />
                            </span>
                          ) : item.status === 2 ? (
                            t("clean_done")
                          ) : (
                            ""
                          )}
                        </span>
                        {t("all")} {item.formatSize}
                        <Tooltip
                          title={renderDetail(
                            item.info && item.info.author,
                            item.path,
                            item.info && item.info.description
                          )}
                        >
                          <InfoCircleTwoTone className="detail-list__info" />
                        </Tooltip>
                      </span>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Detail;
