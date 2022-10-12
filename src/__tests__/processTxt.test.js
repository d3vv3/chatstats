/**
 * @jest-environment jsdom
 */

import { processTxt } from "../modules/processors/processTxt";

import fs from "fs";
import path from "path";


const loadTestChat = (name) => {
    const file = path.join("src/__mock__", name);
    // console.log(file);
    const content = fs.readFileSync(file, "utf8", function(err, data) {
        if (err) console.error(err);
        return data;
    });
    // console.log(content);
    return content;
}


test("Process a .txt chat file" , () => {
    const txtChatContent = loadTestChat("test1.txt");
    var count = (txtChatContent.match(/ - /g) || []).length;
    const chat = processTxt(txtChatContent);
    console.info("Probably", count, "messages", "and we got", chat.messages.length);
    console.info("Success rate:", (chat.messages.length/count)*100, "%");
});