import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { register, unregister } from "./serviceWorker";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

register();