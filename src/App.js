import React, { useState, useEffect } from "react";

// Local imports
import AppRouter from "./routes";

import init, { add } from "wasm";

// Style
import "./styles/style.scss";

function App() {
  // Chat object
  const [chatObject, setChatObject] = useState({});
  const [fileInserted, setFileInserted] = useState({});
  const [ans, setAns] = useState(0);

 useEffect(() => {
   init().then(() => {
     setAns(add(1, 1));
   })
 }, [])
  

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
