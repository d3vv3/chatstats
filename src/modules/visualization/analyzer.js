import {
  polarizeByContacts,
  polarizeByDay,
  polarizeByHour,
  polarizeByMonth
} from "./polarizers";
import {
  getRandomColors,
  getSuperStrings,
  getWordList,
  getEmojiList,
  getWordRepetition,
  getCloudOptions,
  getMostTalkerNomination,
} from "./helpers.js";

import { getMessageCount, getCharCount } from "./toolset/counts.js";
import { getWordAvg, getCharAvg } from "./toolset/averages.js";
import {
  getMessagesMonth,
  getMessagesDay,
  getMessagesHour,
} from "./toolset/time.js";
import { getTopWords } from "./toolset/repetitions.js";
import { getPhotoCount, getMediaCount } from "./toolset/media.js";

export function analyze(chatObject) {
  var polarizedChat = polarizeByContacts(chatObject);
  var colors = getRandomColors(polarizedChat);
  var fillColors = colors[0];
  var lineColors = colors[1];

  // Helpers
  var superStrings = getSuperStrings(polarizedChat);
  var wordList = getWordList(superStrings);
  var emojiList = getEmojiList(superStrings);
  var wordRepetition = getWordRepetition(wordList, false);
  var emojiRepetition = getWordRepetition(emojiList, true);

  // Counts
  var messageCount = getMessageCount(polarizedChat, fillColors, lineColors);
  var charCount = getCharCount(superStrings, fillColors, lineColors);

  // Averages
  var wordAvg = getWordAvg(polarizedChat, wordList, fillColors, lineColors);
  var charAvg = getCharAvg(polarizedChat, superStrings, fillColors, lineColors);

  // Dates
  var polarizedMonths = polarizeByMonth(polarizedChat);
  var polarizedDays = polarizeByDay(polarizedChat);
  var polarizedHours = polarizeByHour(polarizedChat);

  var messagesMonth = getMessagesMonth(
    polarizedMonths["chat"],
    polarizedMonths["months"],
    Array.from(fillColors),
    Array.from(lineColors)
  );
  var messagesDay = getMessagesDay(
    polarizedDays["chat"],
    polarizedDays["days"],
    Array.from(fillColors),
    Array.from(lineColors)
  );
  var messagesHour = getMessagesHour(
    polarizedHours["chat"],
    polarizedHours["hours"],
    Array.from(fillColors),
    Array.from(lineColors)
  );

  // Most repetitions
  const cloudOptions = getCloudOptions();
  var topWords = getTopWords(wordRepetition);
  var topEmojis = getTopWords(emojiRepetition);

  // Media counts
  var photoCount = getPhotoCount(polarizedChat, fillColors, lineColors);
  var videoCount = getMediaCount(
      polarizedChat, fillColors, lineColors, "video_file"
  );
  var audioCount = getMediaCount(
      polarizedChat, fillColors, lineColors, "voice_message"
  );
  var stickerCount = getMediaCount(
      polarizedChat, fillColors, lineColors, "sticker"
  );

  const mostTalker = getMostTalkerNomination(polarizedChat);

  return {
    mostTalker,
    messageCount: messageCount,
    charCount: charCount,
    wordAvg: wordAvg,
    charAvg: charAvg,
    messagesMonth: messagesMonth,
    messagesDay: messagesDay,
    messagesHour: messagesHour,
    topWords: topWords,
    topEmojis: topEmojis,
    cloudOptions: cloudOptions,
    photoCount: photoCount,
    videoCount: videoCount,
    audioCount: audioCount,
    stickerCount: stickerCount,
    fillColors,
    lineColors,
  };
}
