import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import { Checkbox, Tooltip, Button, message, Modal } from "antd";
import { SettingTwoTone, InfoCircleTwoTone, LoadingOutlined, ExperimentTwoTone, RestTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import findIndex from 'lodash/findIndex';
import { join } from './shared';
// import Tip from './tip';

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
  const [lastIndex, setLastIndex] = useState(-1);
  const [fileList, setList] = useState(selectedList);
  const [checkedList, setCheckList] = useState(initChecked);
  const [selectSize, setSelectSize] = useState(initSize);

  useEffect(() => {
    const deleteStart = () => {
      console.log('delete-start');
    };
    const deleteFile = file => {
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
      setList(statusList);
    }
    const deleteDone = () => {
      setCheckList([]);
      setSelectSize(0);
      console.log('delete-done');
    };
    socket.on("delete-start", deleteStart);

    socket.on("delete-file", deleteFile);

    socket.on("delete-done", deleteDone);
    return () => {
      socket.off('delete-start', deleteStart);
      socket.off('delete-file', deleteFile);
      socket.off('delete-done', deleteDone);
    }

  }, [selectSize]);

  const handleSelect = (item, e) => {
    const listIndex = findIndex(fileList, o => o.path === item.path);
    if (e.nativeEvent.shiftKey) {
      let start = 0, end = 0;
      if (listIndex > lastIndex) {
        start = lastIndex + 1;
        end = listIndex;
      } else {
        start = listIndex;
        end = lastIndex - 1;
      }
      let changeSize = 0;
      for (let i = start; i <= end; i++) {
        const file = fileList[i];
        file.checked = !file.checked;
        const index = checkedList.indexOf(file.path);
        if (index > -1) {
          checkedList.splice(index, 1);
          changeSize -= file.size;
        } else {
          checkedList.push(file.path);
          changeSize += file.size;
        }
      }
      setSelectSize(selectSize + changeSize);
      setCheckList(checkedList);
      setList(fileList);
      return;
    }

    fileList[listIndex].checked = !fileList[listIndex].checked;
    const index = checkedList.indexOf(item.path);
    if (index > -1) {
      checkedList.splice(index, 1);
      setSelectSize(selectSize - item.size);
    } else {
      checkedList.push(item.path);
      setSelectSize(selectSize + item.size);
    }
    setCheckList(checkedList);
    setList(fileList);
    setLastIndex(listIndex);
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
      width: 520,
      content: (
        <div>
          {checkedList.map((item, index) => (
            <p key={item}>{index + 1}. {join(item, 'node_modules')}</p>
          ))}
        </div>
      ),
      onOk() {
        console.log('onOk');
        const disabledList = [...fileList];
        disabledList.map(item => {
          if (checkedList.indexOf(item.path) > -1) {
            item.disabled = true;
            item.status = 1;
          }
        })
        setList(disabledList);
        socket.emit('delete', checkedList.map(item => join(item, 'node_modules')));
      },
    });

  }

  return (
    <div className="detail-container">
      {/* <Tip></Tip> */}
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
                    <Checkbox disabled={item.disabled} checked={item.checked} onChange={(e) => {handleSelect(item, e)}}>
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
