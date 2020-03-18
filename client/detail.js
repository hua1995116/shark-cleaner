import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import { Checkbox, Tooltip, Button, message, Modal } from "antd";
import { SettingTwoTone, InfoCircleTwoTone, LoadingOutlined, ExperimentTwoTone, RestTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import findIndex from 'lodash/findIndex';
// import Tip from './tip';

window.list = [{
  path: '/Users/huayifeng/my/test',
  desc: '',
  author: '""',
  size: 4419301,
  formatSize: '4.21 MB'
},
{
  path: '/Users/huayifeng/my/test/2018',
  desc: '',
  author: '""',
  size: 132022,
  formatSize: '128.93 KB'
},
{
  path: '/Users/huayifeng/my/test/Tapable',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 239502,
  formatSize: '233.89 KB'
},
{
  path: '/Users/huayifeng/my/test/antd/1zh16',
  desc: '',
  author: '""',
  size: 161565355,
  formatSize: '154.08 MB'
},
{
  path: '/Users/huayifeng/my/test/antd/1zh16/select',
  desc: 'React Select',
  author: '""',
  size: 328830935,
  formatSize: '313.60 MB'
},
{
  path: '/Users/huayifeng/my/test/antd-next',
  desc: '',
  author: '""',
  size: 125451389,
  formatSize: '119.64 MB'
},
{
  path: '/Users/huayifeng/my/test/babel-plugin',
  desc: '',
  author: '""',
  size: 29151037,
  formatSize: '27.80 MB'
},
{
  path: '/Users/huayifeng/my/test/benchmark-test',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 1572403,
  formatSize: '1.50 MB'
},
{
  path: '/Users/huayifeng/my/test/enquirer/examples',
  desc: '',
  author: '""',
  size: 483354,
  formatSize: '472.03 KB'
},
{
  path: '/Users/huayifeng/my/test/jwt',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 1107544,
  formatSize: '1.06 MB'
},
{
  path: '/Users/huayifeng/my/test/log-color',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 1673822,
  formatSize: '1.60 MB'
},
{
  path: '/Users/huayifeng/my/test/log-color/ansi-html',
  desc:
    'An elegant lib that converts the chalked (ANSI) text to HTML.',
  author: '{"name":"Tjatse"}',
  size: 2253774,
  formatSize: '2.15 MB'
},
{
  path: '/Users/huayifeng/my/test/micro-frontend-example',
  desc: '',
  author: '""',
  size: 71897899,
  formatSize: '68.57 MB'
},
{
  path: '/Users/huayifeng/my/test/module_alias',
  desc: '',
  author: '""',
  size: 13479,
  formatSize: '13.16 KB'
},
{
  path: '/Users/huayifeng/my/test/mop',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 13416175,
  formatSize: '12.79 MB'
},
{
  path: '/Users/huayifeng/my/test/mop/gettime',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 4497598,
  formatSize: '4.29 MB'
},
{
  path: '/Users/huayifeng/my/test/mss-sdk',
  desc: '',
  author: '""',
  size: 14483773,
  formatSize: '13.81 MB'
},
{
  path: '/Users/huayifeng/my/test/next/next-demo-01',
  desc: '',
  author: '""',
  size: 47107123,
  formatSize: '44.92 MB'
},
{
  path: '/Users/huayifeng/my/test/next/next-go',
  desc: 'Production ready blog + boilerplate for Next.js',
  author: '""',
  size: 77868842,
  formatSize: '74.26 MB'
},
{
  path: '/Users/huayifeng/my/test/next/town',
  desc: '',
  author: '""',
  size: 47134159,
  formatSize: '44.95 MB'
},
{
  path: '/Users/huayifeng/my/test/snowpack-demo',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 79713291,
  formatSize: '76.02 MB'
},
{
  path: '/Users/huayifeng/my/test/test-llvm/llvm-node',
  desc: 'Node Bindings for LLVM >=4.0',
  author: '"Micha Reiser <micha@famreiser.ch>"',
  size: 110701567,
  formatSize: '105.57 MB'
},
{
  path: '/Users/huayifeng/my/test/test_URI',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 450914,
  formatSize: '440.35 KB'
},
{
  path: '/Users/huayifeng/my/test/test_npm',
  desc: '',
  author: '""',
  size: 39644305,
  formatSize: '37.81 MB'
},
{
  path: '/Users/huayifeng/my/test/ts-react-process',
  desc: '',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 50668345,
  formatSize: '48.32 MB'
},
{
  path: '/Users/huayifeng/my/test/vue-flex-touch',
  desc:
    'vue-flex-touch both for long press touch on mobile and right click on pc',
  author:
    '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
  size: 36880389,
  formatSize: '35.17 MB'
},
{
  path:
    '/Users/huayifeng/my/test/vue-flex-touch/example/vue-flex-touch-demo02',
  desc: '',
  author: '""',
  size: 116119102,
  formatSize: '110.74 MB'
},
{
  path: '/Users/huayifeng/my/test/vue-react-rander',
  desc: '',
  author: '""',
  size: 112210436,
  formatSize: '107.01 MB'
},
{
  path: '/Users/huayifeng/my/test/vue-router2',
  desc: '',
  author: '""',
  size: 95527197,
  formatSize: '91.10 MB'
}];

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
            <p key={item}>{index + 1}. {item + '/node_modules'}</p>
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
        socket.emit('delete', checkedList.map(item => (item + '/node_modules')));
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
