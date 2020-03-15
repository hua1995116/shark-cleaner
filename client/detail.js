import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import { Checkbox, Tooltip, Button } from "antd";
import { SettingTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import findIndex from 'lodash/findIndex';

function Detail() {
  const list = window.list || [];
  const { t } = useTranslation();
  const total = byteConvert(list.reduce((sum, item) => sum + item.size, 0));

  const orderList = list.sort((a, b) => b.size - a.size);
  let initChecked = [], initSize = 0;

  const selectedList = orderList.map(item => {
    if (item.size > 1024 * 1024 * 50) {
      initChecked.push(item.path);
      initSize += item.size;
      return {
        ...item,
        checked: true
      }
    }

    return {
      ...item,
      checked: false
    }
  });
  const [fileList, setList] = useState(selectedList);
  const [checkedList, setCheckList] = useState(initChecked);
  const [selectSize, setSelectSize] = useState(initSize);

  const handleSelect = (item) => {
    const listIndex = findIndex(fileList, o => o.path === item.path);
    fileList[listIndex].checked = !fileList[listIndex].checked;
    const index = checkedList.indexOf(item.path);
    if (index > -1) {
      checkedList.splice(index, index + 1);
      setSelectSize(selectSize - item.size);
    } else {
      checkedList.push(item.path);
      setSelectSize(selectSize + item.size);
    }
    setCheckList(checkedList);
    setList(fileList);
  }

  const renderDetail = (author, path, desc) => (
    <React.Fragment>
      <p className="tip-p">author: {author ? author : '-'}</p>
      <p className="tip-p">path: {path}</p>
      <p className="tip-p">desc: {desc ? desc : '-'}</p>
    </React.Fragment>
  );

  const handleClean = () => {
    console.log(checkedList);
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <div className="detail-header__info">
          <span>共扫描到垃圾 {total}</span>
          <Button size={'small'} onClick={() => location.href="/"}>返回</Button>
        </div>
        <button className="button button-primary button-large" onClick={handleClean}>
          {t("clean")}
        </button>
      </div>
      <div className="detail-list">
        <h3 className="detail-title">
          <SettingTwoTone />
          <span className="detail-title__name">node_modules</span>
          <span className="detail-title__select">已经选择<span>{byteConvert(selectSize)}</span></span>
        </h3>
        <ul>
          {fileList.map(item => {
            const name = item.path.split("/");
            const desc = item.desc || "";
            return (
              <React.Fragment key={item.path}>
                <li>
                  <span className="detail-list__check">
                    <Checkbox checked={item.checked} onChange={(e) => {handleSelect(item)}}>
                      <span className="detail-list__name">
                        {name[name.length - 1]}
                      </span>
                      <span className="detail-list__desc">
                        {desc.length > 30 ? desc.slice(0, 30) + "..." : desc}
                      </span>
                    </Checkbox>
                  </span>
                  <span className="detail-list__tools">
                    共 {item.formatSize}
                    <Tooltip title={renderDetail(item.author, item.path, item.desc)}>
                      <InfoCircleTwoTone className="detail-list__info"/>
                    </Tooltip>
                  </span>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Detail;
