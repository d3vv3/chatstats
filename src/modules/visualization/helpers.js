import es_words from "../../common_words/esCommonWords.json";
import en_words from "../../common_words/enCommonWords.json";
import whastsapp_words from "../../common_words/whatsappCommonWords.json";
const hexToRgba = require("hex-to-rgba");
const emojiRegex = require("emoji-regex");

function selectColor(number) {
  const hue = number * 137.508; // use golden angle approximation
  return {hue, saturation: 50, luminance: 75};  // `hsl(${hue},50%,75%)`
};

function hslToHex({hue, saturation, luminance}) {
  luminance /= 100;
  const a = saturation * Math.min(luminance, 1 - luminance) / 100;
  const f = n => {
    const k = (n + hue / 30) % 12;
    const color = luminance - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');  // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Scalable way of generating colors
export function getRandomColors(polarizedChat) {
  // var lines = [...colors].sort((a, b) => 0.5 - Math.random()).slice(0, Object.keys(polarizedChat).length);
  var lines = [...Array(Object.keys(polarizedChat).length).keys()].map((index) => hslToHex(selectColor(index)));
  var fill = lines.map(function (hex) {
    return hexToRgba(hex, 0.7);
  });
  return [fill, lines];
};

export function getSuperStrings(polarizedChat) {
  var superStrings = {};

  Object.keys(polarizedChat).forEach((key) => {
    superStrings[key] = polarizedChat[key].reduce((total, msg) => {
      if (msg.media_type != null) {
        return total;
      }

      return total.concat(msg.text + "\n");
    }, "");
  });

  return superStrings;
}

export function getWordList(superStrings) {
  var wordList = {};

  Object.keys(superStrings).forEach((key) => {
    // This if is a hotfix for some character issues
    if (key !== "undefined") {
      wordList[key] = superStrings[key].match(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+/g);
    }
  });

  return wordList;
}

export function getEmojiList(superStrings) {
  var emojiList = {};
  // var emojiPatt = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]+/ug;
  // var emojiPatt = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  var emojiPatt = emojiRegex();

  Object.keys(superStrings).forEach((key) => {
    emojiList[key] = superStrings[key].match(emojiPatt);
  });

  return emojiList;
}

function notCommonWord(word) {
  var result =
    es_words.esCommonWords.includes(word.toLowerCase()) ||
    en_words.enCommonWords.includes(word.toLowerCase()) ||
    whastsapp_words.whatsappCommonWords.includes(word.toLowerCase()) ||
    word.length <= 2 ||
    word.toLowerCase().includes("jaja") ||
    word.toLowerCase().includes("haha") ||
    word.toLowerCase().includes("jeje") ||
    word.toLowerCase().includes("hehe") ||
    word.toLowerCase().includes("si") ||
    word.toLowerCase().includes("no");
  return !result;
}

export function getWordRepetition(wordList, isEmoji) {
  var wordRepetition = {};
  Object.keys(wordList).forEach((key) => {
    try {
      wordList[key].forEach((word) => {
        if (notCommonWord(word) || isEmoji) {
          wordRepetition[word] != null
            ? ++wordRepetition[word]
            : (wordRepetition[word] = 1);
        }
      });
    } catch (e) {}
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
    spiral: "archimedean",
  };
}

export function getMaxNomination(object) {
  return {
    name: Object.keys(object)[Object.values(object).indexOf(Math.max(...Object.values(object)))],
    value: Math.max(...Object.values(object)),
  };
}

export function getMinNomination(object) {
  return {
    name: Object.keys(object)[Object.values(object).indexOf(Math.min(...Object.values(object)))],
    value: Math.min(...Object.values(object))
  };
}

export function getColorMap(polarizedChat, fillColors, lineColors) {
  const contacts = Object.keys(polarizedChat);
  let colorMap = {};
  contacts.forEach((contact, index) => {
    colorMap[contact] = {fillColor: fillColors[index], lineColor: lineColors[index]};
  });
  return colorMap;
}
