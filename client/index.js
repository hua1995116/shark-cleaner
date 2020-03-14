import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import "./i18n";
import 'normalize.css/normalize.css';
import Home from './home';
import Detail from './detail';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/detail" component={Detail} exact />
      </Switch>
    </>
  )
}

window.addEventListener('load', () =>
  ReactDOM.render(
    <HashRouter>
      <App></App>
    </HashRouter>,
    document.getElementById('root'))
);