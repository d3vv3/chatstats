export function processTxt(fileContentString) {
  var patt = /(\n([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2}) - ([^:]*): (.*))/;

  // Split messages on protptype match
  var msgList = fileContentString.split(patt);
  // console.log(msgList);

  var parsedList = [];
  var aux = [];

  msgList.forEach((elem) => {

      if (patt.test(elem)) {
          var msg = parseMessage(aux);
          if (msg != null) {
              parsedList.push(msg);
          }
          aux = [];
      }

      else {
          aux.push(elem);
      }
  });

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
            date: formatDate(msg[0]),
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

function formatDate(date) {
    var patt = /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2}), ([0-9]{2}:[0-9]{2})/;
    var parseDate = patt.exec(date);

    parseDate[1] = ("0" + parseDate[1]).slice(-2);
    parseDate[2] = ("0" + parseDate[2]).slice(-2);

    return new Date(
        "20"+parseDate[3]+"-"+parseDate[1]+"-"+parseDate[2]+"T"+parseDate[4]+":00"
    );
}
