export function processTxt(fileContentString) {
  const patt = /(\n\u200e?\[?([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4},? [0-9]{2}:[0-9]{2}:?[0-9]{0,2})\]? ?-? ([^:]*): (.*))/;
  const userLang = navigator.language || navigator.userLanguage;
  var langUS = userLang === 'en-US';
  console.log(langUS);

  // Split messages on protptype match
  var msgList = fileContentString.split(patt);

  var parsedList = getParsedMessageList(msgList, patt, langUS);

  if (parsedList === null) {
      parsedList = getParsedMessageList(msgList, patt, !langUS);
  }

  // Acommodate format to Telegram chats
  var chat = { messages: parsedList, name: "Whatsapp chat" };
  return chat;
}

function getParsedMessageList(msgList, patt, langUS) {
    var parsedList = [];
    var aux = [];
    var changeLang = false;

    [...msgList].forEach((elem) => {
      if (patt.test(elem)) {
        var msg = parseMessage(aux, langUS);

        if (msg !== null) {
          parsedList.push(msg);
          if (isNaN(msg.date)) {
              changeLang = true;
              return;
          }
        }

        aux = [];
      } else {
        aux.push(elem);
      }
    });

    if (changeLang) {return null;}

    return parsedList;
}

function parseMessage(msg, langUS) {
  if (msg.length !== 4) {
    return null;
  } else {
    var msgObject = {
      date: formatDate(msg[0], langUS),
      from: msg[1],
      text: msg[2].concat(msg[3]),
      type: "message",
      media_type: getMediaType(msg[2]), // Telegram compatibility
      photo:
        /.jpg \(file attached\)$/.test(msg[2]) || /\.jpg>$/.test(msg[2])
          ? "yes"
          : null,
    };

    return msgObject;
  }
}

function getMediaType(text) {
  if (text === "<Media omitted>") {
    return "unknown";
  } else if (/\.opus \(file attached\)$/.test(text) || /\.opus>$/.test(text)) {
    return "voice_message";
  } else if (/\.mp4 \(file attached\)$/.test(text) || /\.mp4>$/.test(text)) {
    return "video_file";
  } else if (/\.webp \(file attached\)$/.test(text) || /\.webp>$/.test(text)) {
    return "sticker";
  } else {
    return null;
  }
}

function formatDate(date, langUS) {
  var patt = /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4}),? ([0-9]{2}:[0-9]{2})(:[0-9]{2})?/;
  var parseDate = patt.exec(date);

  var day = langUS ? parseDate[2]: parseDate[1];
  var month = langUS ? parseDate[1]: parseDate[2];

  var year = ("20" + parseDate[3]).slice(-4);

  day = ("0" + day).slice(-2);
  month = ("0" + month).slice(-2);

  if (parseDate[5] === undefined) {
      parseDate.[5] = ":00";
  }

  // console.log(
  //     year +
  //     "-" +
  //     month +
  //     "-" +
  //     day +
  //     "T" +
  //     parseDate[4] +
  //     parseDate[5]
  // );

  return new Date(
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      parseDate[4] +
      parseDate[5]
  );
}
