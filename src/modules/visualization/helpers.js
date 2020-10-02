var randomColor = require("randomcolor");

// Scalable way of generating colors
export function getRandomColors(polarizedChat) {
  var colors = randomColor({
    count: Object.keys(polarizedChat).length,
    luminosity: "light",
  });

  return colors;
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

export function getWordRepetition(wordList) {
    var wordRepetition = {};
    Object.keys(wordList).forEach((key) => {
        wordList[key].forEach((word) => {
            wordRepetition[word] != null
            ? ++wordRepetition[word]
            : wordRepetition[word] = 1;
        });
    });

    return wordRepetition;
}

export function getCloudOptions() {
    return {
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [20, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean"
    }
}
