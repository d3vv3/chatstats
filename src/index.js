import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { register, unregister } from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
register();