import {
  getMessageCount,
  getPolarizedChat,
  getRandomColors,
  getSuperStrings,
  getCharCount,
  getWordList,
  getWordAvg,
  getCharAvg,
  polarizeByDate,
  getMessagesMonth,
} from "./toolset.js";
// var chatObject = require("./result.json");

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var colors = getRandomColors(polarizedChat);
  var messageCount = getMessageCount(polarizedChat, colors);
  var superStrings = getSuperStrings(polarizedChat);
  var wordList = getWordList(superStrings);
  var charCount = getCharCount(superStrings, colors);
  var wordAvg = getWordAvg(polarizedChat, wordList, colors);
  var charAvg = getCharAvg(polarizedChat, superStrings, colors);
  var polarizedDates = polarizeByDate(polarizedChat);
  console.log(polarizedDates);
  var messagesMonth = getMessagesMonth(polarizedDates["chat"], polarizedDates["months"], Array.from(colors));

  return {
    messageCount: messageCount,
    charCount: charCount,
    wordAvg: wordAvg,
    charAvg: charAvg,
    messagesMonth: messagesMonth,
  };
}
