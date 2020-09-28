export function processTxt(messages) {
  var patt = /(\n[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2} - .*)/;

  var msgList = messages.split(patt);

  var parseList = msgList.map(parseMessage);
  parseList = parseList.filter((elem) => elem !== "");

  var chat = { messages: parseList, name: "Whatsapp chat" };

  return chat;
}

function parseMessage(text) {
  // Prototype for a Whatsapp message
  var patt = /\n([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2}) - (.*): (.*)/;

  // messagesArray as an array of matches (results) or null
  var messagesArray = patt.exec(text);
  // console.log(metadata);

  // If no matches with Whatsapp prototype, gg
  if (messagesArray == null) {
    return null;
  }

  // Create the message object as the one from Telegram
  var msg = {
    date: messagesArray[1], // Date metadata
    from: messagesArray[2], // Contact name metadata
    text: messagesArray[3], // Message content
    type: messagesArray[3] === "<Media omitted>" ? "media" : "message", // Telegram compatibility
  };

  // Returns the message objet
  return msg;
}
