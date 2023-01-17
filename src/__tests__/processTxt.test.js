/**
 * @jest-environment jsdom
 */

import { processTxt } from "../modules/processors/processTxt";
import { loadTestChat } from "../__utils__/utils";



test("Process an Android .txt chat file" , () => {
    const txtChatContent = loadTestChat("test_chat_1.txt");
    var count = (txtChatContent.match(/ - /g) || []).length;
    const chat = processTxt(txtChatContent);
    // console.info("Probably", count, "messages", "and we got", chat.messages.length);
    // console.info("This may be due to group name changes, group creation and others");
    // console.info("Success rate:", (chat.messages.length/count)*100, "%");
});

test("Process an iOS .txt chat file" , () => {
    const txtChatContent = loadTestChat("test_chat_2.txt");
    var count = (txtChatContent.match(/\[/g) || []).length;
    const chat = processTxt(txtChatContent);
    // console.info("Probably", count, "messages", "and we got", chat.messages.length);
    // console.info("This may be due to group name changes, group creation and others");
    // console.info("Success rate:", (chat.messages.length/count)*100, "%");
});