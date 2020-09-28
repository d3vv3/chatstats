import React, { useState, useEffect } from "react";

// External chartjs imports
import { Doughnut } from "react-chartjs-2";

// Local imports
import LoadingIcon from "./LoadingIcon";

// Local visualization module
import {
  getPolarizedChat,
  getMessageCount,
} from "../modules/visualization/polarize.js";

// Style
import "../styles/style.scss";

function Viz(props) {
  // State to change loading screen
  const [loading, setLoading] = useState(true);

  // Places to hold information for the graphs
  const [polarizedChat, setPolarizedChat] = useState(undefined);
  const [messageCount, setMessageCount] = useState(null);
  const [caractersCount, setMCaractersCount] = useState(null);
  const [commonWordsCloud, setCommonWordsCloud] = useState(null);
  const [monthlyMessageCount, setMonthlyMessageCount] = useState(null);
  const [messagesPerWeekDay, setMessagesPerWeekDay] = useState(null);
  const [messagesHourDistrubution, setMessagesHourDistribution] = useState(
    null
  );
  const [mostUsedEmojis, setMostUsedEmojis] = useState(null);

  useEffect(() => {
    // TODO: load, extract and analyze data
    // Probably use futures and promises here
    // The next two lines do not work yet
    // setPolarizedChat(getPolarizedChat(props.chatObject));
    // setMessageCount(getMessageCount(polarizedChat));

    console.log(messageCount);
    // TODO: set loading to false once finished
  }, []); // This array is so useEffect doesn't trigger endlessly but once

  return loading ? <LoadingIcon /> : <div></div>;
}

export default Viz;
