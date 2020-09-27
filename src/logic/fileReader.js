import { messageParser } from "./messageParser.js";

export function readFile(file, name) {

    //let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        // console.log(reader.result);
        messageParser(reader.result, name);
    };

    reader.onerror = function() {
        console.log(reader.error);
    };

}
