import { getPolarizedChat, polarizeByDate } from "./polarizer.js";
import { getRandomColors, getSuperStrings, getWordList } from "./helpers.js";

import { getMessageCount, getCharCount } from "./toolset/counts.js";
import { getWordAvg, getCharAvg } from "./toolset/averages.js";
import { getMessagesMonth } from "./toolset/time.js";
// var chatObject = require("./result.json");

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var colors = getRandomColors(polarizedChat);

  // Helpers
  var superStrings = getSuperStrings(polarizedChat);
  var wordList = getWordList(superStrings);

  // Counts
  var messageCount = getMessageCount(polarizedChat, colors);
  var charCount = getCharCount(superStrings, colors);

  // Averages
  var wordAvg = getWordAvg(polarizedChat, wordList, colors);
  var charAvg = getCharAvg(polarizedChat, superStrings, colors);

  // Dates
  var polarizedDates = polarizeByDate(polarizedChat);
  var messagesMonth = getMessagesMonth(
      polarizedDates["chat"], polarizedDates["months"], Array.from(colors)
  );

  return {
    messageCount: messageCount,
    charCount: charCount,
    wordAvg: wordAvg,
    charAvg: charAvg,
    messagesMonth: messagesMonth,
  };
}
