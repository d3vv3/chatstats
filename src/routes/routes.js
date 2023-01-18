import React from "react";

import { 
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

// Local imports
import MainPage from "../pages/MainPage";
import Viz from "../pages/Viz";

function AppRouter(props) {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/graphs" element={<Viz
                    chatObject={props.chatObject}
                    fileInserted={props.fileInserted}
                    wasmFunctions={props.wasmFunctions}
                />} />

            <Route path="/" element={<MainPage
                    setChatObject={props.setChatObject}
                    setFileInserted={props.setFileInserted}
                />} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
