// Returns number of messages per contact
export function getMessageCount(polarizedChat) {
  var nonChatjsResult = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    nonChatjsResult[key] = polarizedChat[key].length;
  });

  // Result should have a format Chartjs Doughnut wants
  return nonChatjsResult;
}

export function getCharCount(superStrings) {
  var chars = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(superStrings).forEach((key) => {
    chars[key] = superStrings[key].length;
  });

  return chars;
}

export function getWordCount(polarizedChat) {
  var nonChatjsResult = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    nonChatjsResult[key] = polarizedChat[key].map(message => message.text.split(" ").length).reduce((partialSum, a) => partialSum + a, 0);
  });

  // Result should have a format Chartjs Doughnut wants
  // console.log(nonChatjsResult);
  return nonChatjsResult;
}
