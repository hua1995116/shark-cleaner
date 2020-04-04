import React, { useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./i18n";
import "normalize.css/normalize.css";
import Home from "./home";
import Detail from "./detail";
// import io from "socket.io-client";
import io from './adapter';
import Header from './header';
import Bottom from './bottom';

const uri = "http://localhost:8082";
const options = {
  transports: ["websocket"],
  autoConnect: false
};

function App() {
  const socket = useMemo(() => {
    return io(uri, options);
  }, []);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <React.Fragment>
      <Header></Header>
      <Switch>
        <Route path="/" component={() => <Home socket={socket} />} exact />
        <Route
          path="/detail"
          component={() => <Detail socket={socket} />}
          exact
        />
      </Switch>
      <Bottom></Bottom>
    </React.Fragment>
  );
}

window.addEventListener("load", () =>
  ReactDOM.render(
    <HashRouter>
      <App></App>
    </HashRouter>,
    document.getElementById("root")
  )
);
