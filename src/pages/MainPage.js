import React from "react";

// Local imports
import FileInput from "../components/FileInput";

// Style
import "../styles/style.scss";

function MainPage(props) {
  return (
    <div className="landing-container">
        <h1>
            <span className="gradient-text">ChatStats!</span>
        </h1>
        <h2>
            A tool to visualize chat statistics and relevant data from your Whatsapp and Telegram
            chats.
        </h2>
        <FileInput setChatObject={props.setChatObject} setFileInserted={props.setFileInserted} />
        <p>
            Your information never leaves your device. It never gets sent. Every
            operation happens in your device. Check the code{" "}
            <a href="https://github.com/d3vv3/chatstats">here</a>.
        </p>
    </div>
  );
}

export default MainPage;
