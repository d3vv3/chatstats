export function processJson(fileContentString) {
    var chat = JSON.parse(fileContentString);

    chat.messages = chat.messages.filter(m => m.from !== undefined).map(parseSpecialCases);
    return chat;
}

function parseSpecialCases(currentValue) {
    currentValue.date = parseInt(currentValue.date_unixtime)*1000;
    
    if (typeof currentValue.text === "string"){
        return currentValue;
    }

    if (currentValue.photo) currentValue.media_type = "image";

    else if (Array.isArray(currentValue.text)) {
        var text = currentValue.text.reduce(concatMessages);
        currentValue.text = (typeof text === "string" ? text : text.text);

        return currentValue;
    }

    else {
        return null;
    }

}

function concatMessages(total, msg) {
    total = (typeof total === "string" ? total : total.text);

    if (typeof msg === "string") {
        return total.concat(msg);
    }

    else if (typeof msg === "object") {
        return total.concat(msg.text);
    }

    else {
        return total;
    }
}
