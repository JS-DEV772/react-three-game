import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

function Overlay() {
  const [ready, set] = useState(false);
  return (
    <>
      <App />
      <div className="dot" />
      <div
        className={`fullscreen bg ${ready ? "ready" : "notready"} ${
          ready && "clicked"
        }`}
      >
        <div className="stack">
          <div className="intro-message">
            <h2>Welcome to</h2>
            <h1>Game</h1>
          </div>
          <a onClick={() => set(true)}>Click (needs fullscreen)</a>
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<Overlay />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
