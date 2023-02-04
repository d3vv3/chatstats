import {
  // polarizeByContacts,
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
  getColorMap,
} from "./helpers.js";

import { 
  getMessageCount,
  getCharCount,
  getWordCount,
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
  jsonToChartJS,
  sentimentAnalysis,
 } from "./toolset";

export function analyze(chatObject, polarizeByContacts) {
  if (chatObject === {}) return {};
  var polarizedChat = Object.fromEntries(polarizeByContacts(chatObject));
  var replies = chatReplies(chatObject);
  var colors = getRandomColors(polarizedChat);
  var fillColors = colors[0];
  var lineColors = colors[1];

  // Colors
  var colorMap = getColorMap(polarizedChat, fillColors, lineColors);

  // Helpers
  var superStrings = getSuperStrings(polarizedChat);
  var wordList = getWordList(superStrings);
  var emojiList = getEmojiList(superStrings);
  var wordRepetition = getWordRepetition(wordList, false);
  var emojiRepetition = getWordRepetition(emojiList, true);

  // Counts
  var messageCount = getMessageCount(polarizedChat);
  // console.log(jsonToChartJS(messageCount));
  var charCount = getCharCount(superStrings);
  var wordCount = getWordCount(polarizedChat)

  // Averages
  var wordAvg = getWordAvg(polarizedChat, wordList);
  var charAvg = getCharAvg(polarizedChat, superStrings);

  // Dates
  var polarizedMonths = polarizeByMonth(polarizedChat);
  var polarizedDays = polarizeByDay(polarizedChat);
  var polarizedHours = polarizeByHour(polarizedChat);

  // Sentiment
  var sentimentInTime = sentimentAnalysis(polarizedChat);

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
  var videoCount = getMediaCount(polarizedChat, "video_file");
  var audioCount = getMediaCount(polarizedChat, "voice_message");
  var stickerCount = getMediaCount(polarizedChat, "sticker");

  // Replies and streaks
  var conversationsStarted = conversationStarter(replies);
  var fastestRepliers = fastestReplier(replies);

  return {
    // Honorable mentions
    mostMessages: getMaxNomination(messageCount),
    mostTalker: getMaxNomination(wordCount),
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
    messageCount: jsonToChartJS(messageCount, colorMap),
    wordCount: jsonToChartJS(wordCount, colorMap),
    charCount: jsonToChartJS(charCount, colorMap),

    // Averages
    wordAvg: jsonToChartJS(wordAvg, colorMap),
    charAvg: jsonToChartJS(charAvg, colorMap),

    // Insights
    conversationsStarted: jsonToChartJS(conversationsStarted, colorMap),
    fastestRepliers: jsonToChartJS(fastestRepliers, colorMap),

    // Distributions
    messagesMonth: messagesMonth, // jsonToChartJSBar(polarizedMonths, "months", colorMap),
    messagesDay: messagesDay, 
    // jsonToChartJSBar(polarizedDays, "days", colorMap),
    messagesHour: messagesHour, // jsonToChartJSBar(polarizedHours, "hours", colorMap),

    // Sentiment
    sentimentInTime,

    // Clouds
    topWords: topWords,
    topEmojis: topEmojis,
    cloudOptions: cloudOptions,

    // Multimedia count
    photoCount: jsonToChartJS(photoCount, colorMap),
    videoCount: jsonToChartJS(videoCount, colorMap),
    audioCount: jsonToChartJS(audioCount, colorMap),
    stickerCount: jsonToChartJS(stickerCount, colorMap),

    // Colors
    fillColors,
    lineColors,
    colorMap,
  };
}
