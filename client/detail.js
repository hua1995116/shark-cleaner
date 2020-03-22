import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
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
// import Tip from './tip';
window.list = [ { path: '/Users/huayifeng/my/test/antd/1zh16/select',
computed: 'node_modules',
size: 351996538,
formatSize: '335.69 MB',
type: 'node_modules',
info: {} },
{ path: '/Users/huayifeng/.npm',
computed: './',
size: 1191848032,
formatSize: '1.11 GB',
type: 'npm_cache' },
{ path: '/Users/huayifeng/.nvm/versions/node/v10.10.0',
computed: './',
size: 259457061,
formatSize: '247.44 MB',
type: 'node_cache' },
{ path: '/Users/huayifeng/.nvm/versions/node/v10.16.0',
computed: './',
size: 520124008,
formatSize: '496.03 MB',
type: 'node_cache' },
{ path: '/Users/huayifeng/.nvm/versions/node/v12.16.0',
computed: './',
size: 76790390,
formatSize: '73.23 MB',
type: 'node_cache' },
{ path: '/Users/huayifeng/.nvm/versions/node/v6.9.3',
computed: './',
size: 57371651,
formatSize: '54.71 MB',
type: 'node_cache' },
{ path: '/Users/huayifeng/.nvm/versions/node/v8.5.0',
computed: './',
size: 1504749930,
formatSize: '1.40 GB',
type: 'node_cache' },
{ path: '/Users/huayifeng/.nvm/versions/node/v8.9.0',
computed: './',
size: 112609829,
formatSize: '107.39 MB',
type: 'node_cache' } ]
const logoList = [<SettingTwoTone />, <RestTwoTone />, <ExperimentTwoTone />, <ThunderboltTwoTone />]

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
    if (item.size > 1024 * 1024 * 50) {
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
    const deleteFile = file => {
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

    socket.on("delete-file", deleteFile);

    socket.on("delete-done", deleteDone);
    return () => {
      socket.off("delete-start", deleteStart);
      socket.off("delete-file", deleteFile);
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
          if (index) {
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
                const desc = item.info ? item.info.description : "";
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
                            {name[name.length - 1]}
                          </span>
                          <span className="detail-list__desc">
                            {desc.length > 30
                              ? desc.slice(0, 30) + "..."
                              : desc}
                          </span>
                        </Checkbox>
                      </span>
                      <span className="detail-list__tools">
                        <span className="detail-list__status">
                          {item.status === 1 ? (
                            <span>
                              正在清理
                              <LoadingOutlined />
                            </span>
                          ) : item.status === 2 ? (
                            "清理完成"
                          ) : (
                            ""
                          )}
                        </span>
                        共 {item.formatSize}
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
