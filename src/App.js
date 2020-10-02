import React, { useState } from "react";

// Local imports
import Routes from "./routes/routes";

// Style
import "./styles/style.scss";

function App() {
  // Chat object
  const [chatObject, setChatObject] = useState({});

  return (
    <div className="App">
      <Routes chatObject={chatObject} setChatObject={setChatObject} />
    </div>
  );
}

export default App;
