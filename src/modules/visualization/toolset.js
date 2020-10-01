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

export function getMessagesMonth(polarizedDates, months, colors) {
    var chat = {};
    var color = -1;

    Object.keys(polarizedDates).forEach((user) => {
        chat[user] = {};

        months.forEach((month) => {
            polarizedDates[user][month] != null
            ? chat[user][month] = polarizedDates[user][month].length
            : chat[user][month] = 0;
        });
    });
    console.log(chat);

    return {
      labels: months,
      datasets: Object.keys(chat).map((key) => {
          color++;
          return {
              label: key,
              data: Object.values(chat[key]),
              type: "bar",
              backgroundColor: colors[color],
          }
      }),
    };
}

export function polarizeByDate(polarizedChat) {
    var result = {};
    var months = []

    Object.keys(polarizedChat).forEach((key => {
        result[key] = {};
        try {

            for(let msg of polarizedChat[key]) {

                var month = msg.date.getMonth() + 1;
                var year = msg.date.getFullYear();
                var date = month + "/" + year;

                if (months.indexOf(date) === -1) {
                    months.push(date);
                }

                result[key][date] != null
                ? result[key][date].push(msg)
                : (result[key][date] = [msg]);

            }
        } catch(e) {}
    }))

    return {chat: result, months: months};
}
