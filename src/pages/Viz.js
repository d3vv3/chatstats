import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// External chartjs imports
import { Doughnut, Bar, Pie, Radar } from "react-chartjs-2";
import 'chart.js/auto';
import ReactWordcloud from "react-wordcloud";

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
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (typeof props.fileInserted !== "string") {
        setLoading(false);
        navigate("/");
      }
      // FIXME: doesnt finish execution
      if (props.chatObject !== {}) {
        setStats(analyze(props.chatObject));
        if (stats != null) {
          setLoading(false);
          return;
        }
      }
      
      // Set loading to false once finished
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line
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
          <p className="description">Amount of messages sent by each contact.</p>
          <p className="comment">Seems like "{stats.mostTalker}" is the most talkative.</p>
          <div
            className={
              stats.messageCount.labels.length > 10
                ? "chart-container bigger"
                : "chart-container"
            }
          >
            <Pie
              data={stats.messageCount}
              options={{ maintainAspectRatio: false, plugins: {legend: "bottom"} }}
            />
          </div>
        </div>
        <div className="stat-item">
          <h2> Character count </h2>
          <p className="description">Amount of characters sent by each contact.</p>
          <div
            className={
              stats.charCount.labels.length > 10
                ? "chart-container bigger"
                : "chart-container"
            }
          >
            <Pie
              data={stats.charCount}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div className="stat-item">
          <h2> Average words per message </h2>
          <p className="description">Average words per message by each contact.</p>
          <div
            className={
              stats.wordAvg.labels.length > 10
                ? "chart-container bigger"
                : "chart-container"
            }
          >
            <Pie
              data={stats.wordAvg}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="stat-item">
          <h2> Average characters per message </h2>
          <p className="description">Average characters per message by each contact.</p>
          <p className="comment">"{stats.charAvg.longWriter}" is the one hitting the most keys, while "{stats.charAvg.shortWritter}" likes to keep it short.</p>
          <div
            className={
              stats.charAvg.labels.length > 10
                ? "chart-container bigger"
                : "chart-container"
            }
          >
            <Pie
              data={stats.charAvg}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
      <div className="flex-row">
        {stats.photoCount.labels.length !== 0 ? (
          <div className="stat-item">
            <h2> Photo Count </h2>
            <p className="description">Amount of photos sent by each contact.</p>
            <div
              className={
                stats.photoCount.datasets.length > 10
                  ? "chart-container bigger"
                  : "chart-container"
              }
            >
              <Pie
                data={stats.photoCount}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        ) : null}
        {stats.videoCount.labels.length !== 0 ? (
          <div className="stat-item">
            <h2> Video Count </h2>
            <p className="description">Amount of videos sent by each contact.</p>
            <div
              className={
                stats.videoCount.datasets.length > 10
                  ? "chart-container bigger"
                  : "chart-container"
              }
            >
              <Pie
                data={stats.videoCount}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex-row">
        {stats.audioCount.labels.length !== 0 ? (
          <div className="stat-item">
            <h2> Audio Count </h2>
            <p className="description">Amount of audios sent by each contact.</p>
            <div
              className={
                stats.audioCount.datasets.length > 10
                  ? "chart-container bigger"
                  : "chart-container"
              }
            >
              <Pie
                data={stats.audioCount}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        ) : null}
        {stats.stickerCount.labels.length !== 0 ? (
          <div className="stat-item">
            <h2> Sticker Count </h2>
            <p className="description">Amount of stickers sent by each contact.</p>
            <div
              className={
                stats.stickerCount.datasets.length > 10
                  ? "chart-container bigger"
                  : "chart-container"
              }
            >
              <Pie
                data={stats.stickerCount}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex-row">
        <div className="stat-item">
          <h2> Monthly distribution </h2>
          <p className="description">Messages sent per month by each contact. </p>
          <div
            className={
              stats.messagesMonth.datasets.length > 10
                ? "chart-container bigger"
                : "chart-container"
            }
          >
            <Bar
              data={stats.messagesMonth}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="stat-item">
          <h2> Weekday distribution </h2>
          <p className="description">Distribution sent per weekday per contact. </p>
          <div
            className={
              stats.messagesDay.datasets.length > 10
                ? "chart-container bigger"
                : "chart-container"
            }
          >
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
          <p className="description">Distribution of messages per hour per contact. </p>
          <div
            className={
              stats.messagesHour.datasets.length > 10
                ? "chart-container bigger hourly"
                : "chart-container hourly"
            }
          >

          {/* <Radar data={stats.messagesHour} 
            options={{ maintainAspectRatio: false }}/> */}

          <Bar
            data={stats.messagesHour}
            options={{ maintainAspectRatio: false }}
          />
          </div>
        </div>
      </div>
      <div className="flex-row">
        <div className="stat-item">
          <h2> Most used words </h2>
          <p className="description">A word cloud with most used words bigger. </p>
          <ReactWordcloud options={stats.cloudOptions} words={stats.topWords} />
        </div>
        <div className="stat-item">
          <h2> Most used emojis </h2>
          <p className="description">An emoji cloud with most used emojis bigger. </p>
          <ReactWordcloud
            options={stats.cloudOptions}
            words={stats.topEmojis}
          />
        </div>
      </div>
    </div>
  );
}

export default Viz;
