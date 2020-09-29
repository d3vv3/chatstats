import {
     getMessageCount, getWordCount, getPolarizedChat
 } from "./toolset.js";
// var chatObject = require("./result.json");

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var messageCount = getMessageCount(polarizedChat);
  var wordCount = getWordCount(polarizedChat);

  return {
    messageCount: messageCount,
    wordCount: wordCount,
  };
}
