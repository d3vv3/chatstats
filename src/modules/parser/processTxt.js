export function processTxt(fileContentString) {
  var patt = /(\n[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2} - .*)/;

  // Split messages on protptype match
  var msgList = fileContentString.split(patt);

  // Parse messages
  var parseList = msgList.map(parseMessage);

  // Filter to remove empty messages from parsing
  parseList = parseList.filter((elem) => elem !== null);

  // Acommodate format to Telegram chats
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
    type: "message", // Telegram compatibility
  };

  // Returns the message objet
  return msg;
}
