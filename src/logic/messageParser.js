import { processTxt } from "./processTxt.js";

export function messageParser(messages, fileName) {

    var isTxt = /.txt$/;
    var isJson = /.json$/;

    if (isTxt.test(fileName)) {
        var chat = processTxt(messages);
        console.log(chat);
    }

    else if (isJson.test(fileName)) {
        var chat = JSON.parse(messages);
        console.log(chat);
    }

    else {
        console.log('Error: file type not supported.');
    }

}
