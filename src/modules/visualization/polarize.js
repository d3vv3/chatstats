import { messageCount } from "./toolset.js";
// var chatObject = require("./result.json");

export function getPolarizedChat(chatObject) {
  // Separate each contact messages to analize separately
  console.log(chatObject);
  var result = {};

  // Iterate through every message
  for (let msg of chatObject.messages) {
    // If the contact is in results as key
    result[msg.from] != null
      ? result[msg.from].push(msg) // Then add the message to its key
      : (result[msg.from] = [msg]); // If it doesn't exist, create array with it
  }

  return result;
}

export function getMessageCount(polarizedChat) {
  return messageCount(polarizedChat);
}
