import { processTxt } from "./processTxt.js";

export function messageParser(fileContentString, fileName) {
  // Define both supported extension types
  var isTxt = /.txt$/;
  var isJson = /.json$/;

  // Check the extension of the input file
  if (isTxt.test(fileName)) {
    try {
      var chat = processTxt(fileContentString);
      console.log(chat);
      return chat;
    } catch (e) {
      console.error("Are you sure the file is a valid chat?");
      console.debug(e);
      return null;
    }
  } else if (isJson.test(fileName)) {
    try {
      // eslint-disable-next-line
      var chat = JSON.parse(fileContentString);
      console.log(chat);
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