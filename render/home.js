import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./index.less";
import Animate from "./animate";
import Wave from "./wave";
import { Input, message } from "antd";
import { useTranslation } from "react-i18next";
import debounce from 'lodash/debounce';

let count = 1;

function Home(props) {
  const { t } = useTranslation();
  const socket = props.socket;
  const [detail, setDetail] = useState("");
  const [isStart, setStart] = useState(false);
  const [isComputed, setComputed] = useState(false);
  const [cache, setCache] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const connectListener = () => {
      console.log('connected');
    };

    const fileListener = file => {
      setCache(cache.concat(file));
    };

    const scannerDoneListener = () => {
      console.log('scannerDone');
      setComputed(true);
      setProgress(50);
    }

    const computedListener = file => {
      const tempPagoress = 50 + (file.current / file.total) * 50;
      setProgress(tempPagoress);
    }

    const doneListener = list => {
      console.log('done');
      setProgress(100);
      console.log(list);
      window.list = list;
      location.href = '#/detail';
    }

    const fileErrorListener = () => {
      message.warning(t('file_error'));
      setTimeout(() => {
        location.href = '/';
      }, 1500);
    }

    socket.on("connect", connectListener);

    socket.on("file", fileListener);

    socket.on("scannerDone", scannerDoneListener);

    socket.on("computed", computedListener);

    socket.on("done", doneListener);

    socket.on("file-error", fileErrorListener);

    return () => {
      socket.off("connect", connectListener);
      socket.off("file", fileListener);
      socket.off("scannerDone", scannerDoneListener);
      socket.off("computed", computedListener);
      socket.off("done", doneListener);
      socket.off("file-error", fileErrorListener);
    }
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      if (cache.length) {
        const data = cache.pop();
        setDetail(data);
        count++;
        setProgress((0.5 - 1 / count) * 100);
      }
    }, 100);
    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, [cache]);

  const handlePath = useCallback(debounce(e => {
    socket.emit('setPath', e);
  }, 500), []);

  const handleScanner = () => {
    setStart(true);
    socket.emit("scanner");
  };

  const filterLength = text => {
    if (text.length > 30) {
      return (
        text.slice(0, 10) + "..." + text.slice(text.length - 17, text.length)
      );
    }
    return text;
  };

  return (
    <div className="main-container">
      <Animate></Animate>
      <div className="main-body">
        <div className="main-title">{t("title")}</div>
        <div className="main-tip">{t("tip")}</div>
        {!isStart && (
          <>
            <button
              onClick={handleScanner}
              className="main-btn button button-primary button-large"
            >
              {t("main_btn")}
            </button>
            <Input className="main-path" placeholder={t('set_scanner_path')} onChange={(e) => handlePath(e.target.value)}></Input>
          </>
        )}
        {isStart && (
          <>
            <div className="scanner-dir">
            {isComputed && <div className="scanner-dir__computed">{t('computed')}...</div>}
            {!isComputed && (
                <>
                  <span className="scanner-dir__label">{t('dir')}: </span>
                  <span className="scanner-dir__value">
                    {filterLength(detail)}
                  </span>
                </>
            )}
            </div>
            <Wave progress={progress}></Wave>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
