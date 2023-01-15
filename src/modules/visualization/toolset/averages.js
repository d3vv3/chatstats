export function getWordAvg(polarizedChat, wordList) {
  var words = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(wordList).forEach(key => {
    var msgs = polarizedChat[key].length;
    try {
      var total = wordList[key].length;
    } catch {
      console.log(key, wordList);
    }

    words[key] = total / msgs;
  });

  return words;
}

export function getCharAvg(
  polarizedChat,
  superStrings
) {
  var chars = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach(key => {
    var msgs = polarizedChat[key].length;
    var total = superStrings[key].length;
    chars[key] = total / msgs;
  });

  const charsNumber = Object.keys(chars).map(c => chars[c]);
  // TODO: move to honorableMentions
  const longWriter = Object.keys(chars)[charsNumber.indexOf(Math.max(...charsNumber))];
  const shortWritter = Object.keys(chars)[charsNumber.indexOf(Math.min(...charsNumber))];

  return chars;
}
