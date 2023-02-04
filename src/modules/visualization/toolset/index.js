import { getMessageCount, getCharCount, getWordCount } from "./counts.js";
import { getWordAvg, getCharAvg } from "./averages.js";
import {
  getMessagesMonth,
  getMessagesDay,
  getMessagesHour,
} from "./time.js";
import { getTopWords } from "./repetitions.js";
import { getPhotoCount, getMediaCount } from "./media.js";
import { chatReplies, conversationStarter, fastestReplier } from "./replies.js";
import { jsonToChartJS } from "./chartjs.js";
import { sentimentAnalysis } from "./nlp.js";

export {
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
}