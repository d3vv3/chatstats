import { messageParser } from "./messageParser.js";

export function readFile(fileContent, fileName) {
  let reader = new FileReader();

  // Get the content of the file as a String (maybe give utf-8?)
  reader.readAsText(fileContent);

  // Callback every time a reading operation is complete
  reader.onload = function () {
    // console.log(reader.result);
    messageParser(reader.result, fileName);
  };

  // Callback each time an error occurs on any other operation
  reader.onerror = function () {
    // Send to logging and pass
    console.log(reader.error);
  };
}
