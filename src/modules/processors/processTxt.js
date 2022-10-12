import { parseMessage } from "../parsers/messageParser";

export function processTxt(fileContentString) {
  //const patt = /(\n\u200e?\[?([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4},? [0-9]{2}:[0-9]{2}:?[0-9]{0,2})\]? ?-? ([^:]*): (.*))/;
  const patt = /(\d{2}\/\d{2}\/\d{4}),\s(\d(?:\d)?:\d{2})\s-\s([^:]*):\s(.*?)(?=\s*\d{2}\/\d{2}\/\d{4},\s|$)/ug;
  const userLang = navigator.language || navigator.userLanguage;
  var langUS = userLang === "en-US";
  // console.log(langUS);

  // Split messages on prototype match
  var msgList = fileContentString.match(patt);
  //console.log(msgList);

  var parsedList = getParsedMessageList(msgList, patt, langUS);

  if (parsedList === null) {
    parsedList = getParsedMessageList(msgList, patt, !langUS);
  }

  // Acommodate format to Telegram chats
  var chat = { messages: parsedList, name: "WhatsApp Chat" };
  return chat;
}

function getParsedMessageList(msgList, patt, langUS) {
  var parsedList = [];

  [...msgList].forEach(elem => {
    // console.log(elem);
    if (elem.match(patt)) {
      var msg = parseMessage(elem, patt, langUS);
      // console.log(msg);

      if (msg !== null) {
        if (isNaN(msg.date)) {
          return null;
        }
        parsedList.push(msg);
      }

    } else {
      console.error(elem);
    }
  });
  // console.log(parsedList);
  return parsedList;
}