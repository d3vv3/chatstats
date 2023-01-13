import { parseDateTime } from "./dateParser";
import { parseMediaType } from "./mediaParser";

export function parseMessage(msg, patt, langUS) {
    msg = msg.split(patt);
    // console.log(msg);
    if (msg.length !== 6) {
        return null;
    } else {
        var msgObject = {
        date: parseDateTime(msg[1], msg[2], langUS),
        from: msg[3],
        text: msg[4],
        type: "message",
        media_type: parseMediaType(msg[4])
        };
        // console.log(msgObject);
        return msgObject;
    }
}