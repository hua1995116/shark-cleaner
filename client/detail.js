import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import { Checkbox, Tooltip, Button, message, Modal } from "antd";
import { SettingTwoTone, InfoCircleTwoTone, LoadingOutlined, ExperimentTwoTone, RestTwoTone, ThunderboltTwoTone } from "@ant-design/icons";
import findIndex from 'lodash/findIndex';

window.list = [ { path: '/Users/huayifeng/work/api-creator/client',
desc: '',
author: '""',
size: 193950779,
formatSize: '184.97 MB' },
{ path: '/Users/huayifeng/work/api-creator/server',
desc: '',
author: '""',
size: 191201418,
formatSize: '182.34 MB' },
{ path:
 '/Users/huayifeng/work/api-creator/server/packages/zebra-egg-mysql',
desc: '',
author:
 '"huayifeng <huayifeng@meituan.com> (https://github.com/hua1995116)"',
size: 1146883,
formatSize: '1.09 MB' },
{ path: '/Users/huayifeng/work/api-creator-docs',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 113981771,
formatSize: '108.70 MB' },
{ path: '/Users/huayifeng/work/babel-plugin-autocss',
desc: 'Modular build plugin for babel.',
author:
 '["chencheng <sorrycc@gmail.com>","qingwei-li <cinwell.li@gmail.com>","dailuwen <dailuwen@meituan.com>"]',
size: 28188339,
formatSize: '26.88 MB' },
{ path: '/Users/huayifeng/work/banma-cli',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 19104694,
formatSize: '18.22 MB' },
{ path: '/Users/huayifeng/work/banma_fe_approver_system',
desc: '',
author: '""',
size: 225566974,
formatSize: '215.12 MB' },
{ path: '/Users/huayifeng/work/banma_fe_approver_system/client',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 152761067,
formatSize: '145.68 MB' },
{ path: '/Users/huayifeng/work/banma_fe_deploy',
desc: '',
author:
 '"NatureFeng <ftrsicun@gmail.com> (http://naturefeng.github.io)"',
size: 809238586,
formatSize: '771.75 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/dev/banma_fe_data',
desc: '数据业务平台',
author: '"banmafe"',
size: 405095603,
formatSize: '386.33 MB' },
{ path: '/Users/huayifeng/work/banma_fe_deploy/temp/dev/banma_page',
desc: '',
author: '"peisong fe"',
size: 573154127,
formatSize: '546.60 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_brules',
desc: '',
author: '""',
size: 357186296,
formatSize: '340.64 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_data',
desc: '数据业务平台',
author: '"banmafe"',
size: 253793866,
formatSize: '242.04 MB' },
{ path: '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_h5',
desc: 'banma fe h5',
author: '"banmafe"',
size: 517278364,
formatSize: '493.32 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_intranet',
desc: 'shadow安全监控平台',
author: '"banmafe"',
size: 292582122,
formatSize: '279.03 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_manage_web',
desc: 'banma fe manage web',
author: '"banmafe"',
size: 277669319,
formatSize: '264.81 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_paotui2b',
desc: '跑腿B端前端',
author: '""',
size: 177060656,
formatSize: '168.86 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_paotuib_pc',
desc: '跑腿B端PC',
author: '""',
size: 177043832,
formatSize: '168.84 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_platform',
desc: '',
author: '"peisong fe"',
size: 348167361,
formatSize: '332.04 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_robot',
desc: '',
author: '"peisong fe"',
size: 160495651,
formatSize: '153.06 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_runner',
desc: '跑腿项目',
author: '""',
size: 109674683,
formatSize: '104.59 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_fe_set_platform',
desc: 'set unit manage platform',
author: '""',
size: 236353574,
formatSize: '225.40 MB' },
{ path: '/Users/huayifeng/work/banma_fe_deploy/temp/st/banma_page',
desc: '',
author: '"peisong fe"',
size: 483336288,
formatSize: '460.95 MB' },
{ path: '/Users/huayifeng/work/banma_fe_folders',
desc: '',
author: '""',
size: 217421,
formatSize: '212.33 KB' },
{ path: '/Users/huayifeng/work/banma_fe_iam_package',
desc: '',
author: '""',
size: 401172,
formatSize: '391.77 KB' },
{ path: '/Users/huayifeng/work/banma_fe_international',
desc: '',
author: '""',
size: 174917351,
formatSize: '166.81 MB' },
{ path: '/Users/huayifeng/work/banma_fe_intranet',
desc: 'shadow安全监控平台',
author: '"banmafe"',
size: 358291618,
formatSize: '341.69 MB' },
{ path: '/Users/huayifeng/work/banma_fe_minifyimg',
desc: '',
author: '""',
size: 202246744,
formatSize: '192.88 MB' },
{ path: '/Users/huayifeng/work/banma_fe_model',
desc: '',
author: '""',
size: 143393021,
formatSize: '136.75 MB' },
{ path: '/Users/huayifeng/work/banma_fe_node_config_center',
desc: '',
author: '""',
size: 510628143,
formatSize: '486.97 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_node_config_center/packages/config-cli-service',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 34383718,
formatSize: '32.79 MB' },
{ path: '/Users/huayifeng/work/banma_fe_node_log',
desc: 'banma fe log',
author: '""',
size: 99737832,
formatSize: '95.12 MB' },
{ path: '/Users/huayifeng/work/banma_fe_node_log/static',
desc: '',
author: '""',
size: 223472625,
formatSize: '213.12 MB' },
{ path: '/Users/huayifeng/work/banma_fe_schedule',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 17799941,
formatSize: '16.98 MB' },
{ path: '/Users/huayifeng/work/banma_fe_set_platform',
desc: 'set unit manage platform',
author: '""',
size: 241916304,
formatSize: '230.71 MB' },
{ path: '/Users/huayifeng/work/banma_fe_tangram_ui',
desc: 'vue base high level components',
author: '"weeast"',
size: 321250898,
formatSize: '306.37 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_template/config-html-plugin/template',
desc: '',
author: '"{{author}}"',
size: 38319436,
formatSize: '36.54 MB' },
{ path: '/Users/huayifeng/work/banma_fe_toolbox/bmMonitor-sdk-init',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 38745509,
formatSize: '36.95 MB' },
{ path: '/Users/huayifeng/work/banma_fe_toolbox/cat-analysis',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 17395109,
formatSize: '16.59 MB' },
{ path: '/Users/huayifeng/work/banma_fe_toolbox/i18n',
desc: 'peisong i18n sdk',
author: '""',
size: 265082013,
formatSize: '252.80 MB' },
{ path: '/Users/huayifeng/work/banma_fe_toolbox/localize-loader',
desc: '',
author: '""',
size: 42489012,
formatSize: '40.52 MB' },
{ path:
 '/Users/huayifeng/work/banma_fe_toolbox/localize-loader/example',
desc: '',
author: '""',
size: 69673324,
formatSize: '66.45 MB' },
{ path: '/Users/huayifeng/work/banma_fe_upload',
desc: '',
author: '""',
size: 405459589,
formatSize: '386.68 MB' },
{ path: '/Users/huayifeng/work/banma_fe_vr',
desc: 'Boilerplate with A-Frame\'s \'Hello, World!\' of WebVR.',
author: '""',
size: 74057092,
formatSize: '70.63 MB' },
{ path: '/Users/huayifeng/work/banma_fe_vr/data',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 10780615,
formatSize: '10.28 MB' },
{ path: '/Users/huayifeng/work/banma_page',
desc: '',
author: '"peisong fe"',
size: 463836207,
formatSize: '442.35 MB' },
{ path: '/Users/huayifeng/work/block-demo',
desc: 'block demo',
author: '"jiazhao"',
size: 183399081,
formatSize: '174.90 MB' },
{ path: '/Users/huayifeng/work/citadel-editor',
desc: '',
author: '""',
size: 219906591,
formatSize: '209.72 MB' },
{ path: '/Users/huayifeng/work/element',
desc: 'A Component Library for Vue.js.',
author: '""',
size: 148031595,
formatSize: '141.17 MB' },
{ path: '/Users/huayifeng/work/gen-skeleton',
desc: 'web site skeleton generator',
author: '["jocs","dailuwen <dailuwen@meituan.com>"]',
size: 409594737,
formatSize: '390.62 MB' },
{ path: '/Users/huayifeng/work/heartbeat',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 2854103,
formatSize: '2.72 MB' },
{ path: '/Users/huayifeng/work/mongo-set',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 10278880,
formatSize: '9.80 MB' },
{ path: '/Users/huayifeng/work/mos-mss',
desc: 'mtyun MSS(Meituan Storage Service) sdk for Node.js',
author: '"Meituan Storage Service"',
size: 33842135,
formatSize: '32.27 MB' },
{ path: '/Users/huayifeng/work/nest-demo',
desc: '',
author: '""',
size: 24103957,
formatSize: '22.99 MB' },
{ path: '/Users/huayifeng/work/node_template_js',
desc: 'template from 配送FE',
author: '"jdd"',
size: 187848784,
formatSize: '179.15 MB' },
{ path: '/Users/huayifeng/work/owl',
desc: 'dianping front-end monitor js-sdk',
author: '"jiayi.zhou"',
size: 54948850,
formatSize: '52.40 MB' },
{ path: '/Users/huayifeng/work/performance-fun-deploy',
desc: '',
author: '""',
size: 128702624,
formatSize: '122.74 MB' },
{ path: '/Users/huayifeng/work/pro_practices',
desc: 'pro',
author: '"peisong fe"',
size: 555755779,
formatSize: '530.01 MB' },
{ path: '/Users/huayifeng/work/sign-in-project',
desc: '',
author: '""',
size: 148854213,
formatSize: '141.96 MB' },
{ path: '/Users/huayifeng/work/simple-chat-app',
desc: '',
author: '""',
size: 63913572,
formatSize: '60.95 MB' },
{ path: '/Users/huayifeng/work/test/dynamicData',
desc: '',
author: '"huayifeng &lt;huayifeng@meituan.com&gt;"',
size: 58532073,
formatSize: '55.82 MB' },
{ path: '/Users/huayifeng/work/top-schedule',
desc: '',
author:
 '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
size: 4614214,
formatSize: '4.40 MB' },
{ path: '/Users/huayifeng/work/ui-helper',
desc: '',
author: '""',
size: 94788730,
formatSize: '90.40 MB' },
{ path: '/Users/huayifeng/work/ui-helper-index',
desc: '',
author: '""',
size: 175737193,
formatSize: '167.60 MB' },
{ path: '/Users/huayifeng/work/ui-helper-server',
desc: '',
author: '""',
size: 233127286,
formatSize: '222.33 MB' },
{ path: '/Users/huayifeng/work/vue-bug',
desc: '',
author: '""',
size: 113942299,
formatSize: '108.66 MB' },
{ path: '/Users/huayifeng/work/ymfe-yapi-mt',
desc: 'YAPI',
author: '""',
size: 461266627,
formatSize: '439.90 MB' },
{ path: '/Users/huayifeng/work/zuma',
desc: 'zuma',
author: '"xiezhiqiang02"',
size: 442643336,
formatSize: '422.14 MB' },
{ path: '/Users/huayifeng/work/zuma/app/public/client-new',
desc: 'zuma',
author: '"xiezhiqiang02 <xiezhiqiang02@meituan.com>"',
size: 250047204,
formatSize: '238.46 MB' } ]

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
