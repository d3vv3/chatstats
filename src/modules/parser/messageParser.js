import { processTxt } from "./processTxt.js";
import { processJson } from "./processJson.js";
import { getChatFileFromZip } from "./zipReader.js";

export async function messageParser(fileContentString, fileName, fileContent) {
  // Define both supported extension types
  var isZip = /.zip$/;
  var isTxt = /.txt$/;
  var isJson = /.json$/;

  var chat;

  // Check the extension of the input file
  if (isZip.test(fileName)) {
    try {
      var chatString = await getChatFileFromZip(fileContent);
      chat = processTxt(chatString);
      console.log(chat);
      return chat;
    } catch (e) {
      console.error("Are you sure the file is a valid chat?");
      console.debug(e);
      return null;
    }
  } else if (isTxt.test(fileName)) {
    try {
      chat = processTxt(fileContentString);
      console.log(chat);
      return chat;
    } catch (e) {
      console.error("Are you sure the file is a valid chat?");
      console.debug(e);
      return null;
    }
  } else if (isJson.test(fileName)) {
    try {
      chat = processJson(fileContentString);
      return chat;
    } catch (e) {
      console.error("Are you sure the file is a valid chat?");
      console.debug(e);
      return null;
    }
  } else {
    console.error("File extension not supported.");
    return null;
  }
}
