import React, { useState, useEffect } from "react";

// External chartjs imports
import { Doughnut, Bar } from "react-chartjs-2";

// Local imports
import LoadingIcon from "./LoadingIcon";

// Local visualization module
import { analyze } from "../modules/visualization/analyzer.js";

// Style
import "../styles/style.scss";

function Viz(props) {
  // State to change loading screen
  const [loading, setLoading] = useState(true);

  // Places to hold information for the graphs
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // TODO: load, extract and analyze data
    // Probably use futures and promises here
    // The next two lines do not work yet
    try {
      setStats(analyze(props.chatObject));
      // Set loading to false once finished
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [props.chatObject]);
  // This array is so useEffect doesn't trigger endlessly but once,
  // and then when the props.chatObject updates

  return loading ? (
    <LoadingIcon />
  ) : (
    <div>
      <Doughnut data={stats.messageCount} />
      <Doughnut data={stats.charCount} />
      <Doughnut data={stats.wordAvg} />
      <Doughnut data={stats.charAvg} />
      <Bar data={stats.messagesMonth} />
      <Bar data={stats.messagesDay} />
      <Bar data={stats.messagesHour} />
    </div>
  );
}

export default Viz;
