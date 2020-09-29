import {
  getMessageCount,
  getWordCount,
  getPolarizedChat,
  getRandomColors,
} from "./toolset.js";
// var chatObject = require("./result.json");

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var colors = getRandomColors(polarizedChat);
  var messageCount = getMessageCount(polarizedChat, colors);
  var wordCount = getWordCount(polarizedChat, colors);

  return {
    messageCount: messageCount,
    wordCount: wordCount,
  };
}
