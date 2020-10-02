import {
    getPolarizedChat,
    polarizeByMonth,
    polarizeByDay,
    polarizeByHour
} from "./polarizer.js";
import {
    getRandomColors,
    getSuperStrings,
    getWordList,
    getEmojiList,
    getWordRepetition,
    getCloudOptions
} from "./helpers.js";

import {
    getMessageCount,
    getCharCount
} from "./toolset/counts.js";
import {
    getWordAvg,
    getCharAvg
} from "./toolset/averages.js";
import {
    getMessagesMonth,
    getMessagesDay,
    getMessagesHour
} from "./toolset/time.js";
import {
    getTopWords
} from "./toolset/repetitions.js"

export function analyze(chatObject) {
  var polarizedChat = getPolarizedChat(chatObject);
  var colors = getRandomColors(polarizedChat);

  // Helpers
  var superStrings = getSuperStrings(polarizedChat);
  var wordList = getWordList(superStrings);
  var emojiList = getEmojiList(superStrings);
  var wordRepetition = getWordRepetition(wordList);
  var emojiRepetition = getWordRepetition(emojiList);
  console.log(emojiList);
  console.log(emojiRepetition);

  // Counts
  var messageCount = getMessageCount(polarizedChat, colors);
  var charCount = getCharCount(superStrings, colors);

  // Averages
  var wordAvg = getWordAvg(polarizedChat, wordList, colors);
  var charAvg = getCharAvg(polarizedChat, superStrings, colors);

  // Dates
  var polarizedMonths = polarizeByMonth(polarizedChat);
  var polarizedDays = polarizeByDay(polarizedChat);
  var polarizedHours = polarizeByHour(polarizedChat);

  var messagesMonth = getMessagesMonth(
      polarizedMonths["chat"], polarizedMonths["months"], Array.from(colors)
  );
  var messagesDay = getMessagesDay(
      polarizedDays["chat"], polarizedDays["days"], Array.from(colors)
  );
  var messagesHour = getMessagesHour(
      polarizedHours["chat"], polarizedHours["hours"], Array.from(colors)
  );

  // Most repetitions
  const cloudOptions = getCloudOptions();
  var topWords = getTopWords(wordRepetition);
  var topEmojis = getTopWords(emojiRepetition);
  console.log(topEmojis);

  return {
    messageCount: messageCount,
    charCount: charCount,
    wordAvg: wordAvg,
    charAvg: charAvg,
    messagesMonth: messagesMonth,
    messagesDay: messagesDay,
    messagesHour: messagesHour,
    topWords: topWords,
    topEmojis: topEmojis,
    cloudOptions: cloudOptions
  };
}
