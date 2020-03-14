import React from "react";
import { useTranslation } from "react-i18next";
import { byteConvert } from "./shared";
import { Checkbox, Tooltip } from "antd";
import { SettingTwoTone } from "@ant-design/icons";

const list = [
  {
    path: "/Users/huayifeng/my/test",
    desc: "",
    author: '""',
    size: 4419301,
    formatSize: "4.21 MB"
  },
  {
    path: "/Users/huayifeng/my/test/2018",
    desc: "",
    author: '""',
    size: 132022,
    formatSize: "128.93 KB"
  },
  {
    path: "/Users/huayifeng/my/test/Tapable",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 239502,
    formatSize: "233.89 KB"
  },
  {
    path: "/Users/huayifeng/my/test/babel-plugin",
    desc: "",
    author: '""',
    size: 29151037,
    formatSize: "27.80 MB"
  },
  {
    path: "/Users/huayifeng/my/test/antd-next",
    size: 125451389,
    formatSize: "119.64 MB"
  },
  {
    path: "/Users/huayifeng/my/test/benchmark-test",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 1572403,
    formatSize: "1.50 MB"
  },
  {
    path: "/Users/huayifeng/my/test/iframe",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 421877,
    formatSize: "411.99 KB"
  },
  {
    path: "/Users/huayifeng/my/test/jwt",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 1107544,
    formatSize: "1.06 MB"
  },
  {
    path: "/Users/huayifeng/my/test/log-color",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 1673822,
    formatSize: "1.60 MB"
  },
  {
    path: "/Users/huayifeng/my/test/micro-frontend-example",
    size: 71897899,
    formatSize: "68.57 MB"
  },
  {
    path: "/Users/huayifeng/my/test/mop",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 13416175,
    formatSize: "12.79 MB"
  },
  {
    path: "/Users/huayifeng/my/test/mss-sdk",
    desc: "",
    author: '""',
    size: 14483773,
    formatSize: "13.81 MB"
  },
  {
    path: "/Users/huayifeng/my/test/module_alias",
    desc: "",
    author: '""',
    size: 13479,
    formatSize: "13.16 KB"
  },
  {
    path: "/Users/huayifeng/my/test/test_URI",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 450914,
    formatSize: "440.35 KB"
  },
  {
    path: "/Users/huayifeng/my/test/test_npm",
    desc: "",
    size: 39644305,
    formatSize: "37.81 MB"
  },
  {
    path: "/Users/huayifeng/my/test/snowpack-demo",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 79713291,
    formatSize: "76.02 MB"
  },
  {
    path: "/Users/huayifeng/my/test/vue-react-rander",
    desc: "",
    author: '""',
    size: 112210436,
    formatSize: "107.01 MB"
  },
  {
    path: "/Users/huayifeng/my/test/ts-react-process",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 50668345,
    formatSize: "48.32 MB"
  },
  {
    path: "/Users/huayifeng/my/test/vue-flex-touch",
    desc:
      "vue-flex-touch both for long press touch on mobile and right click on pc",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 36880389,
    formatSize: "35.17 MB"
  },
  {
    path: "/Users/huayifeng/my/test/vue-router2",
    size: 95620429,
    formatSize: "91.19 MB"
  },
  {
    path: "/Users/huayifeng/my/test/antd/1zh16",
    desc: null,
    size: 172523541,
    formatSize: "164.53 MB"
  },
  {
    path: "/Users/huayifeng/my/test/enquirer/examples",
    size: 483354,
    formatSize: "472.03 KB"
  },
  {
    path: "/Users/huayifeng/my/test/log-color/ansi-html",
    desc: "An elegant lib that converts the chalked (ANSI) text to HTML.",
    author: '{"name":"Tjatse"}',
    size: 2253774,
    formatSize: "2.15 MB"
  },
  {
    path: "/Users/huayifeng/my/test/mop/gettime",
    desc: "",
    author:
      '"hua1995116 <qiufneghyf@gmail.com> (https://github.com/hua1995116)"',
    size: 4497598,
    formatSize: "4.29 MB"
  },
  {
    path: "/Users/huayifeng/my/test/next/next-demo-01",
    size: 47107123,
    formatSize: "44.92 MB"
  },
  {
    path: "/Users/huayifeng/my/test/next/next-go",
    desc: "Production ready blog + boilerplate for Next.js",
    size: 77868842,
    formatSize: "74.26 MB"
  },
  {
    path: "/Users/huayifeng/my/test/next/town",
    size: 47134159,
    formatSize: "44.95 MB"
  },
  {
    path: "/Users/huayifeng/my/test/test-llvm/llvm-node",
    desc: "Node Bindings for LLVM >=4.0",
    author: '"Micha Reiser <micha@famreiser.ch>"',
    size: 110701567,
    formatSize: "105.57 MB"
  },
  {
    path: "/Users/huayifeng/my/test/antd/1zh16/select",
    desc: "React Select",
    size: 299216410,
    formatSize: "285.36 MB"
  },
  {
    path:
      "/Users/huayifeng/my/test/vue-flex-touch/example/vue-flex-touch-demo02",
    size: 116119102,
    formatSize: "110.74 MB"
  }
];

function Detail() {
  const { t } = useTranslation();
  const total = byteConvert(list.reduce((sum, item) => sum + item.size, 0));

  const renderDetail = (author, path, desc) => (
    <React.Fragment>
      <p className="tip-p">author: {author ? author : '-'}</p>
      <p className="tip-p">path: {path}</p>
      <p className="tip-p">desc: {desc ? desc : '-'}</p>
    </React.Fragment>
  );

  return (
    <div className="detail-container">
      <div className="detail-header">
        <div className="detail-header__info">共扫描到垃圾 {total}</div>
        <button className="button button-primary button-large">
          {t("clean")}
        </button>
      </div>
      <div className="detail-list">
        <h3 className="detail-title">
          <SettingTwoTone />
          <span className="detail-title__name">node_modules</span>
        </h3>
        <ul>
          {list.map(item => {
            const name = item.path.split("/");
            const desc = item.desc || "";

            return (
              <React.Fragment key={item.path}>
                <li>
                  <span className="detail-list__check">
                    <Checkbox>
                      <span className="detail-list__name">
                        {name[name.length - 1]}
                      </span>
                      <span className="detail-list__desc">
                        {desc.length > 30 ? desc.slice(0, 30) + "..." : desc}
                      </span>
                    </Checkbox>
                  </span>
                  <Tooltip title={renderDetail(item.author, item.path, item.desc)}>
                    <span className="detail-list__tools">
                      共 {item.formatSize}
                    </span>
                  </Tooltip>
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
