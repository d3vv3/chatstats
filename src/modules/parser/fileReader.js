import { messageParser } from "./messageParser.js";

export function processFile(fileContent, fileName, callback) {
  let reader = new FileReader();

  // Get the content of the file as a String
  reader.readAsText(fileContent, "UTF-8");

  // Callback every time a reading operation is complete
  reader.onload = async function () {
    callback(await messageParser(reader.result, fileName, fileContent));
  };

  // Callback each time an error occurs on any other operation
  reader.onerror = function () {
    // Send to logging and pass
    console.error(reader.error);
  };
}
