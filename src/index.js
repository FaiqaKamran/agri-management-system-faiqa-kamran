import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import {
  Provider,
  useDispatch,
} from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

import App from "./App";
import store from "./store/store";

import loadFromStorage from "./store/thunks/loadFromStorage";

const ReduxInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return <App />;
};

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxInitializer />
    </Provider>
  </React.StrictMode>
);