export function processTxt(fileContentString) {
  var patt = /(\n([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2}) - (.*): (.*))/;

  // Split messages on protptype match
  var msgList = fileContentString.split(patt);

  var index = 0;
  var parsedList = [];

  while(index > -1) {
      index = msgList.findIndex((value) => {return patt.test(value)})

      var msg = parseMessage(msgList.slice(0, index));
      if (msg !== null) {
          parsedList.push(msg);
      }

      msgList = msgList.slice(index+1);
  }

  // Acommodate format to Telegram chats
  var chat = { messages: parsedList, name: "Whatsapp chat" };

  return chat;
}

function parseMessage(msg) {
    if (msg.length !== 4) {
        return null
    }

    else {
        var msgObject = {
            date: msg[0],
            from: msg[1],
            text: msg[2].concat(msg[3]),
            type: 'message',
            media_type: getMediaType(msg[2]), // Telegram compatibility
            photo: /.jpg \(file attached\)$/.test(msg[2]) ? 'yes' : null,
        }
        return msgObject;
    }

}

function getMediaType(text) {
    if (text === "<Media omitted>") {
        return "unknown";
    }

    else if (/.opus \(file attached\)$/.test(text)) {
        return "voice_message";
    }

    else if (/.mp4 \(file attached\)$/.test(text)) {
        return "video_file";
    }

    else if (/.webp \(file attached\)$/.test(text)) {
        return "sticker";
    }

    else {
        return null;
    }

}
