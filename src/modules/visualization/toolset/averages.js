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
