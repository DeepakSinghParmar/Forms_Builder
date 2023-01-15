import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./component/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
