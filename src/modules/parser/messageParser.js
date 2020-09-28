import { processTxt } from "./processTxt.js";
import { processJson } from "./processJson.js";

export function messageParser(fileContentString, fileName) {
  // Define both supported extension types
  var isTxt = /.txt$/;
  var isJson = /.json$/;

  // Check the extension of the input file
  if (isTxt.test(fileName)) {
    try {
      var chat = processTxt(fileContentString);
      console.log(chat);
    } catch (e) {
      console.error("Are you sure the file is a valid chat?");
      console.debug(e);
    }
  } else if (isJson.test(fileName)) {
    try {
      // eslint-disable-next-line
      var chat = processJson(fileContentString);
      console.log(chat);
    } catch (e) {
      console.error("Are you sure the file is a valid chat?");
      console.debug(e);
    }
  } else {
    console.error("File extension not supported.");
  }
}
