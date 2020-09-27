export function processTxt(messages) {

    var patt = /(\n[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2} - .*)/;

    var msgList = messages.split(patt);

    var parseList = msgList.map(parseMessage);
    parseList = parseList.filter(elem => elem !== "");

    var chat = {messages: parseList, name:'Whatsapp chat'};

    return chat;

}

function parseMessage(text) {

    var patt = /\n([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2}, [0-9]{2}:[0-9]{2}) - (.*): (.*)/;
    var metadata = patt.exec(text);
    // console.log(metadata);

    if (metadata == null) {
        return "";
    }

    var msg = {
        date: metadata[1],
        from: metadata[2],
        text: metadata[3],
        type: 'message'
    }

    // console.log(msg);
    return msg;

}
