var randomColor = require("randomcolor");

// Scalable way of generating colors
export function getRandomColors(polarizedChat) {
  var colors = randomColor({
    count: Object.keys(polarizedChat).length,
    luminosity: "light",
  });

  var unique = [...new Set(colors)];
  while (unique.length < Object.keys(polarizedChat).length) {
    unique.push(
      randomColor({
        count: 1,
        luminosity: "light",
      })
    );
    unique = [...new Set(colors)];
  }
  console.log(unique);
  return unique;
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

export function getWordList(superStrings) {
  var wordList = {};

  Object.keys(superStrings).forEach((key) => {
    wordList[key] = superStrings[key].split(/[^a-zA-Z]+/);
  });

  return wordList;
}
