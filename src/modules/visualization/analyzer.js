import {
  getMessageCount,
  getWordCount,
  getPolarizedChat,
  getRandomColors,
  getWordList,
  // getCharList,
} from "./toolset.js";
// var chatObject = require("./result.json");

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var colors = getRandomColors(polarizedChat);
  var messageCount = getMessageCount(polarizedChat, colors);
  var wordList = getWordList(polarizedChat);
  var wordCount = getWordCount(wordList, colors);
  // var charList = getCharList(polarizedChat);

  return {
    messageCount: messageCount,
    wordCount: wordCount,
  };
}
