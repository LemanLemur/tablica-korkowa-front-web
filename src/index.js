import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store";
import "./index.css";

import App from "./app/App";
import Header from "./app/Header";
import Profile from "./app/Profile";
import SignUp from "./app/SignUp";
import PageNotFound from "./app/PageNotFound";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header/>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route render={() => <PageNotFound/>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
