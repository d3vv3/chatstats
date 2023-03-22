import React, { useState, useEffect } from "react";

// Local imports
import AppRouter from "./routes";

import init, { polarize_by_contacts } from "wasm";

// Style
import "./styles/style.scss";

function App() {
  // Chat object
  const [chatObject, setChatObject] = useState({});
  const [fileInserted, setFileInserted] = useState({});
  const [wasmFunctions, setWasmFunctions] = useState(() => () => {return {}});

 useEffect(() => {
   init().then(() => {
     setWasmFunctions(() => polarize_by_contacts);
   })
 }, [])
  

  return (
    <div className="App">
        <AppRouter
            chatObject={chatObject}
            setChatObject={setChatObject}
            fileInserted={fileInserted}
            setFileInserted={setFileInserted}
            wasmFunctions={wasmFunctions}
        />
    </div>
  );
}

export default App;
