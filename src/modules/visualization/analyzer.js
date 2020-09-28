import { getMessageCount, getPolarizedChat } from "./toolset.js";
// var chatObject = require("./result.json");

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var messageCount = getMessageCount(polarizedChat);

  return {
    messageCount: messageCount,
  };
}
