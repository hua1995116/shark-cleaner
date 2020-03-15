import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import { Checkbox, Tooltip, Button, message, Modal } from "antd";
import { SettingTwoTone, InfoCircleTwoTone, LoadingOutlined, ExperimentTwoTone, RestTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import findIndex from 'lodash/findIndex';

function Detail(props) {
  const { socket } = props;
  const list = window.list || [];
  const { t } = useTranslation();
  const total = byteConvert(list.reduce((sum, item) => sum + item.size, 0));

  const orderList = list.sort((a, b) => b.size - a.size);
  let initChecked = [], initSize = 0;

  const selectedList = orderList.map(item => {
    const extra = {
      status: 0, // 0 - normal 1 - loading 2 - finish
      disabled: false,
    }
    if (item.size > 1024 * 1024 * 50) {
      initChecked.push(item.path);
      initSize += item.size;
      return {
        ...item,
        checked: true,
        ...extra
      }
    }

    return {
      ...item,
      checked: false,
      ...extra
    }
  });
  const [fileList, setList] = useState(selectedList);
  const [checkedList, setCheckList] = useState(initChecked);
  const [selectSize, setSelectSize] = useState(initSize);

  useEffect(() => {
    socket.on("delete-start", () => {
      console.log('delete-start');
    });

    socket.on("delete-file", file => {
      const index = checkedList.indexOf(file);
      if (index > -1) {
        checkedList.splice(index, index + 1);
        setCheckList(checkedList);
      }
      // set status
      const statusList = [...fileList];
      let reduceSize = 0;
      statusList.map(item => {
        if (checkedList.indexOf(item.path) > -1) {
          item.status = 2;
          item.checked = false;
          reduceSize = item.size;
        }
      })
      setSelectSize(selectSize - reduceSize);
      setList(statusList);
    });

    socket.on("delete-done", () => {
      console.log('delete-done');
    });

  }, []);

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
    if (checkedList.length === 0) {
      message.warning(t('select_one'));
      return;
    }
    Modal.info({
      title: t('select_confirm'),
      maskClosable: true,
      content: (
        <div>
          {checkedList.map(item => (
            <p key={item}>{item}</p>
          ))}
        </div>
      ),
      onOk() {
        const disabledList = [...fileList];
        disabledList.map(item => {
          if (checkedList.indexOf(item.path) > -1) {
            item.disabled = true;
            item.status = 1;
          }
        })
        setList(disabledList);
        socket.emit('delete', checkedList.map(item => (item + '/node_modules')));
      },
    });

  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <div className="detail-header__info">
          <span>{t('total_cache')} {total}</span>
          <Button size={'small'} onClick={() => location.href = "/"}>{t('back')}</Button>
        </div>
        <button className="button button-primary button-large" onClick={handleClean}>
          {t("clean")}
        </button>
      </div>
      <div className="detail-list">
        <h3 className="detail-title">
          <SettingTwoTone />
          <span className="detail-title__name">node_modules</span>
          <span className="detail-title__select">{t('already_select')}<span>{byteConvert(selectSize)}</span></span>
        </h3>
        <ul>
          {fileList.map(item => {
            const name = item.path.split("/");
            const desc = item.desc || "";
            return (
              <React.Fragment key={item.path}>
                <li>
                  <span className="detail-list__check">
                    <Checkbox disabled={item.disabled} checked={item.checked} onChange={(e) => {handleSelect(item)}}>
                      <span className="detail-list__name">
                        {name[name.length - 1]}
                      </span>
                      <span className="detail-list__desc">
                        {desc.length > 30 ? desc.slice(0, 30) + "..." : desc}
                      </span>
                    </Checkbox>
                  </span>
                  <span className="detail-list__tools">
                    <span className="detail-list__status">
                      {item.status === 1 ?  <span>正在清理<LoadingOutlined /></span> : item.status === 2 ? '清理完成' : ''}
                    </span>
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
      <div className="detail-list">
        <h3 className="detail-title">
          <ExperimentTwoTone />
          <span className="detail-title__name">npm cache</span>
          <span className="detail-title__select">{t('already_select')}<span>{byteConvert(0)}</span></span>
        </h3>
        <div>
          {t('developing')}
        </div>
      </div>
      <div className="detail-list">
        <h3 className="detail-title">
          <ThunderboltTwoTone />
          <span className="detail-title__name">yarn cache</span>
          <span className="detail-title__select">{t('already_select')}<span>{byteConvert(0)}</span></span>
        </h3>
        <div>
          {t('developing')}
        </div>
      </div>
      <div className="detail-list">
        <h3 className="detail-title">
          <RestTwoTone />
          <span className="detail-title__name">nvm cache</span>
          <span className="detail-title__select">{t('already_select')}<span>{byteConvert(0)}</span></span>
        </h3>
        <div>
          {t('developing')}
        </div>
      </div>
    </div>
  );
}

export default Detail;
