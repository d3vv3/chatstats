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
        media_type: parseMediaType(msg[4]), // Telegram compatibility
        photo:
            /.jpg \(file attached\)$/.test(msg[4]) || /\.jpg>$/.test(msg[4])
            ? "yes"
            : null
        };
        // console.log(msgObject);
        return msgObject;
    }
}