// import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App";

import { insertCoin } from "playroomkit";

window._USETEMPSTORAGE = true;

insertCoin({
  // gameId: "PSSRagCh1Ns7k99lCEkb",
  skipLobby: true,
}).then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});