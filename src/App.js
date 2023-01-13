import React, { useState } from "react";

// Local imports
import AppRouter from "./routes/routes";

// Style
import "./styles/style.scss";

function App() {
  // Chat object
  const [chatObject, setChatObject] = useState({});
  const [fileInserted, setFileInserted] = useState({});

  return (
    <div className="App">
        <AppRouter
            chatObject={chatObject}
            setChatObject={setChatObject}
            fileInserted={fileInserted}
            setFileInserted={setFileInserted}
        />
    </div>
  );
}

export default App;
