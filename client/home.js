import React, { useState, useEffect, useMemo } from "react";
import "./index.less";
import Animate from "./animate";
import Wave from "./wave";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";

const uri = "http://localhost:8082";
const options = {
  transports: ["websocket"],
  autoConnect: false
};
let count = 1;

function Home() {
  const { t } = useTranslation();
  // const [socket] = useSocket(uri, options);
  const socket = useMemo(() => {
    return io(uri, options);
  }, []);
  const [detail, setDetail] = useState("");
  const [isStart, setStart] = useState(false);
  // const [isStart, setStart] = useState(true);
  // const [detail, setDetail] = useState('/Users/huayifeng/my/test/antd/1zh16/select');
  const [isComputed, setComputed] = useState(true);
  const [cache, setCache] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("first");
    socket.connect();
    socket.on("connect", () => {
      console.log(111);
    });

    socket.on("file", file => {
      setCache(cache.concat(file));
    });

    socket.on("scannerDone", () => {
      setProgress(50);
    });

    socket.on("computed", file => {
      const tempPagoress = 50 + (file.current / file.total) * 50;
      setProgress(tempPagoress);
    });

    socket.on("done", file => {
      setProgress(100);
      console.log(file);
    });
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
          <button
            onClick={handleScanner}
            className="main-btn button button-primary button-large"
          >
            {t("main_btn")}
          </button>
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
