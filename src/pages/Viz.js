import React, { useState, useEffect } from "react";

// External chartjs imports
import { Doughnut, Bar } from "react-chartjs-2";

// Local imports
import LoadingIcon from "../components/LoadingIcon";

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
    <div className="viz-container">
      <div className="flex-row">
        <div className="stat-item">
          <h2> Message Count </h2>
          <p>Ammount of messages sent by each contact.</p>
          <div className="chart-container">
            <Doughnut
              data={stats.messageCount}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="stat-item">
          <h2> Character count </h2>
          <p>Ammount of characters sent by each contact.</p>
          <div className="chart-container">
            <Doughnut
              data={stats.charCount}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div className="stat-item">
          <h2> Average words per message </h2>
          <p>Average words per message by each contact.</p>
          <div className="chart-container">
            <Doughnut
              data={stats.wordAvg}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="stat-item">
          <h2> Average characters per message </h2>
          <p>Average characters per message by each contact.</p>
          <div className="chart-container">
            <Doughnut
              data={stats.charAvg}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div className="stat-item">
          <h2> Monthly distribution </h2>
          <p>Messages sent per month by each contact </p>
          <div className="chart-container">
            <Bar
              data={stats.messagesMonth}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="stat-item">
          <h2> Weekday distribution </h2>
          <p>Distribution sent per weekday per contact </p>
          <div className="chart-container">
            <Bar
              data={stats.messagesDay}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div className="stat-item">
          <h2> Hourly distribution </h2>
          <p>Distribution of messages per hour per contact </p>
          <div className="chart-container">
            <Bar
              data={stats.messagesHour}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viz;
