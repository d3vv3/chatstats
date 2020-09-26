import React from "react";

// Local imports
import FileInput from "./components/FileInput";

// Style
import "./styles/style.scss";

function App() {
  return (
    <div className="App">
      <h1>
        <span className="gradient-text">ChatStats!</span>
      </h1>

      <h2>
        A tool to visualize chat statistics and relevant data from your Whatsapp
        or Telegram chats.
      </h2>

      <FileInput />
      <p>
        Your information never leaves your device. It never gets sent. Every
        operation happens in your device. Check the code{" "}
        <a href="https://github.com/d3vv3/chatstats">here</a>.
      </p>
    </div>
  );
}

export default App;
