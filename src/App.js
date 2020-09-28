import React, { useState } from "react";

// Local imports
import FileInput from "./components/FileInput";
import LoadingIcon from "./components/LoadingIcon";

// Style
import "./styles/style.scss";

function App() {
  // Main app states: 0 (main), 1 (loading) 2 (viz)
  const [filePage, setFilePage] = useState(0);

  // Chat object
  const [chatObject, setChatObject] = useState(null);

  return (
    <div className="App">
      {filePage === 0 ? (
        <div className="landing-container">
          <h1>
            <span className="gradient-text">ChatStats!</span>
          </h1>

          <h2>
            A tool to visualize chat statistics and relevant data from your
            Whatsapp or Telegram chats.
          </h2>

          <FileInput handler={setFilePage} setChatObject={setChatObject} />
          <p>
            Your information never leaves your device. It never gets sent. Every
            operation happens in your device. Check the code{" "}
            <a href="https://github.com/d3vv3/chatstats">here</a>.
          </p>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}

export default App;
