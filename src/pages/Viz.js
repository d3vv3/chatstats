import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// External chartjs imports
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart } from 'chart.js';
import ReactWordcloud from "react-wordcloud";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Local imports
import LoadingIcon from "../components/LoadingIcon";

// Local visualization module
import { analyze } from "../modules/visualization/analyzer.js";

import { exportAsImage } from "../modules/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { polarizeByContacts } from "../modules/visualization/polarizers";

// Style
// import "../styles/style.scss";


Chart.register(ChartDataLabels);


function Viz(props) {
  // State to change loading screen
  const [loading, setLoading] = useState(true);

  // Places to hold information for the graphs
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const exportRef = useRef();

  useEffect(() => {
    try {
      if (typeof props.fileInserted !== "string") {
        setLoading(false);
        navigate("/");
        return;
      }
      // FIXME: doesnt finish execution
      if (props.chatObject !== {} && props.chatObject !== undefined && props.chatObject !== null) {
        console.log(props.wasmFunctions)
        console.log(props.chatObject)
        setStats(analyze(props.chatObject, props.wasmFunctions));
        if (stats !== null) {
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
    <div className="viz-container" ref={exportRef}>
      <h1>
        <span className="gradient-text">ChatStats!</span>
      </h1>
      <p className="bold">Here is an insight of your chat. Share it if you found it useful!</p>
      <div className="flex-row">
        <div className="item-container">
          <div className="stat-item">
            <h2> Message count </h2>
            <p className="description">Amount of messages sent by each contact.</p>
            <div
              className={
                stats.messageCount.labels.length > 10
                  ? "chart-container bigger"
                  : "chart-container"
              }
            >
              <Pie
                data={stats.messageCount}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "center",
                      align: "end"
                    }
                  }
                }}
              />
            </div>
          </div>
          <p className="comment">Seems like "{stats.mostTalker.name}" is the most talkative.</p>
        </div>
        <div className="item-container">
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
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "center",
                      align: "end"
                    }
                  }}}
              />
            </div>
          </div>
          <p className="comment">"{stats.mostChars.name}" wrote {stats.mostChars.value} characters... that is a lot!</p>
          </div>
        </div>
      <div className="flex-row">
        <div className="item-container">
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
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "center",
                      align: "end",
                      formatter: (e) => e.toFixed(1)
                    }
                  }
                }}
              />
            </div>
          </div>
          <p className="comment">"{stats.mostWordsPerMessage.name}" is the most wordy. "{stats.leastWordsPerMessage.name}" is... most efficient?</p>
        </div>
        <div className="item-container">
          <div className="stat-item">
            <h2> Average characters per message </h2>
            <p className="description">Average characters per message by each contact.</p>
            <div
              className={
                stats.charAvg.labels.length > 10
                  ? "chart-container bigger"
                  : "chart-container"
              }
            >
              <Pie
                data={stats.charAvg}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "center",
                      align: "end",
                      formatter: (e) => e.toFixed(1)
                    }
                  } }}
              />
            </div>
          </div>
          <p className="comment">"{stats.mostCharactersPerMessage.name}" is the one writting longer messages, while "{stats.leastCharactersPerMessage.name}" keeps it short.</p>
        </div>
        <div className="item-container">
          <div className="stat-item">
            <h2> Conversations started </h2>
            <p className="description">Conversations started by each contact.</p>
            <div
              className={
                stats.charAvg.labels.length > 10
                  ? "chart-container bigger horizontal"
                  : "chart-container horizontal"
              }
            >
              <Bar
                data={stats.conversationsStarted}
                options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false, position: 'bottom' },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "end",
                      align: "start"
                    }
                  },
                  indexAxis: 'y' }}
              />
            </div>
          </div>
          <p className="comment">"{stats.mostConversationsStarted.name}" tends to start the conversation. "{stats.leastConversationsStarted.name}" does it the least often.</p>
        </div>
        <div className="item-container">
          <div className="stat-item">
            <h2> Average response time </h2>
            <p className="description">Average response time in minutes by each contact.</p>
            <div
              className={
                stats.charAvg.labels.length > 10
                  ? "chart-container bigger horizontal"
                  : "chart-container horizontal"
              }
            >
              <Bar
                data={stats.fastestRepliers}
                options={{ 
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false, position: 'bottom' },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "end",
                      align: "end",
                      formatter: (e) => e.toFixed(1)
                    }
                  }, 
                  indexAxis: 'y' }}
              />
            </div>
          </div>
          <p className="comment">"{stats.fastestReplier.name}" usually replies in {stats.fastestReplier.value.toFixed(1)} mins. "{stats.slowestReplier.name}" checks the phone from time to time... to say something.</p>
      </div>
        </div>
      <div className="flex-row">
        { stats.photoCount.labels.length !== 0 ? (
          <div className="item-container">
            <div className="stat-item">
              <h2> Photo count </h2>
              <p className="description">Amount of photos sent by each contact.</p>
              <div
                className={
                  stats.photoCount.labels.length > 10
                    ? "chart-container bigger"
                    : "chart-container"
                }
              >
                <Pie
                  data={stats.photoCount}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' },
                      datalabels: {
                        display: true,
                        color: "white",
                        anchor: "center",
                        align: "end"
                      }
                    } 
                  }}
                />
              </div>
            </div>
            <p className="comment">"{stats.mostPhotos.name}" sent {stats.mostPhotos.value} photos.</p>
          </div>
        ) : null}
        {stats.videoCount.labels.length !== 0 ? (
          <div className="item-container">
            <div className="stat-item">
              <h2> Video count </h2>
              <p className="description">Amount of videos sent by each contact.</p>
              <div
                className={
                  stats.videoCount.labels.length > 10
                    ? "chart-container bigger"
                    : "chart-container"
                }
              >
                <Pie
                  data={stats.videoCount}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' },
                    datalabels: {
                      display: true,
                      color: "white",
                      anchor: "center",
                      align: "end"
                    }
                  }
                }}
                />
              </div>
            </div>
            <p className="comment">"{stats.mostVideos.name}" sent the most videos.</p>
          </div>
        ) : null}
      </div>
      <div className="flex-row">
        {stats.audioCount.labels.length !== 0 ? (
          <div className="item-container">
            <div className="stat-item">
              <h2> Audio count </h2>
              <p className="description">Amount of audios sent by each contact.</p>
              <div
                className={
                  stats.audioCount.labels.length > 10
                    ? "chart-container bigger"
                    : "chart-container"
                }
              >
                <Pie
                  data={stats.audioCount}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' },
                      datalabels: {
                        display: true,
                        color: "white",
                        anchor: "center",
                        align: "end"
                      }
                    }
                  }}
                />
              </div>
            </div>
            <p className="comment">"{stats.mostAudios.name}" is more into talking than into writting.</p>
          </div>
        ) : null}
        {stats.stickerCount.labels.length !== 0 ? (
          <div className="item-container">
            <div className="stat-item">
              <h2> Sticker count </h2>
              <p className="description">Amount of stickers sent by each contact.</p>
              <div
                className={
                  stats.stickerCount.labels.length > 10
                    ? "chart-container bigger"
                    : "chart-container"
                }
              >
                <Pie
                  data={stats.stickerCount}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' },
                      datalabels: {
                        display: true,
                        color: "white",
                        anchor: "center",
                        align: "end"
                      }
                    }
                  }}
                />
              </div>
            </div>
            <p className="comment">{stats.mostStickers.name} loved the stickers feature WhastApp introduced.</p>
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
              options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, datalabels: { display: false} } }}
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
              options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, datalabels: { display: false} } }}
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

          <Bar
            data={stats.messagesHour}
            options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, datalabels: { display: false} } }}
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
      <div>
          <button 
            className="share-button"
            onClick={() => exportAsImage(document.body, "chatstats")}>
            Share <FontAwesomeIcon icon={faShareFromSquare} />
          </button>
        </div>
    </div>
  );
}

export default Viz;
