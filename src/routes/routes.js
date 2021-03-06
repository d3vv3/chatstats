import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

// Local imports
import MainPage from "../pages/MainPage";
import Viz from "../pages/Viz";

function Routes(props) {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/graphs">
                <Viz
                    chatObject={props.chatObject}
                    fileInserted={props.fileInserted}
                />
            </Route>
            <Route path="/">
                <MainPage
                    setChatObject={props.setChatObject}
                    setFileInserted={props.setFileInserted}
                />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default Routes;
