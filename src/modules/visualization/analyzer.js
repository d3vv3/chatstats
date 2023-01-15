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
  getMaxNomination,
  getMinNomination,
} from "./helpers.js";

import { 
  getMessageCount,
  getCharCount,
  getWordAvg,
  getCharAvg,
  getMessagesMonth,
  getMessagesDay,
  getMessagesHour,
  getTopWords,
  getPhotoCount,
  getMediaCount,
  chatReplies,
  conversationStarter,
  fastestReplier,
  jsonToChartJS
 } from "./toolset";

export function analyze(chatObject) {
  if (chatObject === {}) return {};
  var polarizedChat = polarizeByContacts(chatObject);
  var replies = chatReplies(chatObject);
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

  console.log("Hours", polarizedHours);

  // console.log(polarizedMonths);

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
  var photoCount = getPhotoCount(polarizedChat);
  var videoCount = getMediaCount(
      polarizedChat, fillColors, lineColors, "video_file"
  );
  var audioCount = getMediaCount(
      polarizedChat, fillColors, lineColors, "voice_message"
  );
  var stickerCount = getMediaCount(
      polarizedChat, fillColors, lineColors, "sticker"
  );

  // Replies and streaks
  var conversationsStarted = conversationStarter(replies);
  var fastestRepliers = fastestReplier(replies);

  return {
    // Honorable mentions
    mostTalker: getMaxNomination(messageCount),
    mostChars: getMaxNomination(charCount),
    mostWordsPerMessage: getMaxNomination(wordAvg),
    leastWordsPerMessage: getMinNomination(wordAvg),
    mostCharactersPerMessage: getMaxNomination(charAvg),
    leastCharactersPerMessage: getMinNomination(charAvg),
    mostConversationsStarted: getMaxNomination(conversationsStarted),
    leastConversationsStarted: getMinNomination(conversationsStarted),
    fastestReplier: getMinNomination(fastestRepliers),
    slowestReplier: getMaxNomination(fastestRepliers),
    mostAudios: getMaxNomination(audioCount),
    mostStickers: getMaxNomination(stickerCount),
    mostPhotos: getMaxNomination(photoCount),
    mostVideos: getMaxNomination(videoCount),

    // Counts
    messageCount: jsonToChartJS(messageCount, fillColors, lineColors),
    charCount: jsonToChartJS(charCount, fillColors, lineColors),

    // Averages
    wordAvg: jsonToChartJS(wordAvg, fillColors, lineColors),
    charAvg: jsonToChartJS(charAvg, fillColors, lineColors),

    // Insights
    conversationsStarted: jsonToChartJS(conversationsStarted, fillColors, lineColors),
    fastestRepliers: jsonToChartJS(fastestRepliers, fillColors, lineColors),

    // Distributions
    messagesMonth: messagesMonth, // jsonToChartJSBar(polarizedMonths, "months", fillColors, lineColors),
    messagesDay: messagesDay, 
    // jsonToChartJSBar(polarizedDays, "days", fillColors, lineColors),
    messagesHour: messagesHour, // jsonToChartJSBar(polarizedHours, "hours", fillColors, lineColors),

    // Clouds
    topWords: topWords,
    topEmojis: topEmojis,
    cloudOptions: cloudOptions,

    // Multimedia count
    photoCount: jsonToChartJS(photoCount, fillColors, lineColors),
    videoCount: jsonToChartJS(videoCount, fillColors, lineColors),
    audioCount: jsonToChartJS(audioCount, fillColors, lineColors),
    stickerCount: jsonToChartJS(stickerCount, fillColors, lineColors),

    // Colors
    fillColors,
    lineColors,
  };
}
