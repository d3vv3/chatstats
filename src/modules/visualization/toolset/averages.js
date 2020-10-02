export function getWordAvg(polarizedChat, wordList, fillColors, lineColors) {
  var words = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(wordList).forEach((key) => {
    var msgs = polarizedChat[key].length;
    var total = wordList[key].length;
    words[key] = total / msgs;
  });

  return {
    labels: Object.keys(words),
    datasets: [
      {
        data: Object.values(words),
        backgroundColor: fillColors,
        borderColor: lineColors,
        // hoverBackgroundCOlor: colors,
      },
    ],
  };
}

export function getCharAvg(
  polarizedChat,
  superStrings,
  fillColors,
  lineColors
) {
  var chars = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    var msgs = polarizedChat[key].length;
    var total = superStrings[key].length;
    chars[key] = total / msgs;
  });

  return {
    labels: Object.keys(chars),
    datasets: [
      {
        data: Object.values(chars),
        backgroundColor: fillColors,
        borderColor: lineColors,
        // hoverBackgroundCOlor: colors,
      },
    ],
  };
}
