var randomColor = require("randomcolor");

// Separate each contact messages to analize separately
export function getPolarizedChat(chatObject) {
  // console.log(chatObject);
  var result = {};
  // Try in case component called it with null argument
  try {
    // Iterate through every message
    for (let msg of chatObject.messages) {
      // If the contact is in results as key
      result[msg.from] != null
        ? result[msg.from].push(msg) // Then add the message to its key
        : (result[msg.from] = [msg]); // If it doesn't exist, create array with it
    }
  } catch (e) {}

  return result;
}

// Scalable way of generating colors
export function getRandomColors(polarizedChat) {
  var colors = randomColor({
    count: Object.keys(polarizedChat).length,
    luminosity: "light",
  });

  return colors;
}

// Returns number of messages per contact
export function getMessageCount(polarizedChat, colors) {
  var nonChatjsResult = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    nonChatjsResult[key] = polarizedChat[key].length;
  });

  // Result should have a format Chartjs Doughnut wants
  return {
    labels: Object.keys(nonChatjsResult),
    datasets: [
      {
        data: Object.values(nonChatjsResult),
        backgroundColor: colors,
        // hoverBackgroundColor: colors,
      },
    ],
  };
}

export function getSuperStrings(polarizedChat) {
    var superStrings = {};

    Object.keys(polarizedChat).forEach((key) => {
      superStrings[key] = polarizedChat[key].reduce((total, msg) => {
          // return msg.text.split(/[^a-zA-Z]+/);
          return total.concat(msg.text + "\n");
      }, "");
    });
    console.log(superStrings);

    return superStrings;
}

export function getCharCount(superStrings, colors) {
  var chars = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(superStrings).forEach((key) => {
    chars[key] = superStrings[key].length;
  });

  return {
    labels: Object.keys(chars),
    datasets: [
      {
        data: Object.values(chars),
        backgroundColor: colors,
        // hoverBackgroundCOlor: colors,
      },
    ],
  };
}

export function getWordList(superStrings) {
    var wordList = {};

    Object.keys(superStrings).forEach((key) => {
        wordList[key] = superStrings[key].split(/[^a-zA-Z]+/);
        console.log(wordList);
    });

    return wordList;
}

export function getWordAvg(polarizedChat, wordList, colors) {
  var words = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(wordList).forEach((key) => {
      var msgs = polarizedChat[key].length
      var total = wordList[key].length;
      words[key] = total/msgs
  });

  return {
    labels: Object.keys(words),
    datasets: [
      {
        data: Object.values(words),
        backgroundColor: colors,
        // hoverBackgroundCOlor: colors,
      },
    ],
  };
}

export function getCharAvg(polarizedChat, superStrings, colors) {
  var chars = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    var msgs = polarizedChat[key].length
    var total = superStrings[key].length;
    chars[key] = total/msgs
  });

  return {
    labels: Object.keys(chars),
    datasets: [
      {
        data: Object.values(chars),
        backgroundColor: colors,
        // hoverBackgroundCOlor: colors,
      },
    ],
  };
}
