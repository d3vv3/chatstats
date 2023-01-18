const chatReplies = (chatObject) => {
    const messages = chatObject.messages;
    if (messages === undefined) return [];
    return (messages).reduce((accumulator, currentMessage, currentIndex, array) => {
        const previousMessage = accumulator[accumulator.length - 1]
        const nextMessage = array[currentIndex + 1]
        if (nextMessage === undefined) return accumulator;

        var currentDate = new Date(currentMessage.date);
        var previousDate = new Date(previousMessage.date);
        // console.log(currentDate)
        // console.log(previousDate)

        const minutesToPrevious = (currentDate - previousDate)/1000/60
        // If time distance from previous message is geq than 5 hours, consider it a starter message, else reply.
        let currentMessageType = "reply";
        if (minutesToPrevious >= 5*60) {
            currentMessageType = "starter";
        }
        // If previous message was from another contact, consider it as response: we want it.
        if (currentMessage.from !== previousMessage.from) {
            accumulator.push({
                from: currentMessage.from,
                date: currentDate,
                type: currentMessageType,
                replyTime: minutesToPrevious < 5*60 ? minutesToPrevious : 0
            });
            return accumulator;
        }
        // If next to current message is from another contact, the current contact finished answering: we want it
        // console.log(currentMessage, nextMessage);
        if (currentMessage.from !== nextMessage.from) {
            accumulator.push({
                from: currentMessage.from,
                date: currentDate,
                type: "reply-end",
                replyTime: 0
            })
        }
        return accumulator;
        }, [{from: messages[0].from, date: messages[0].date, type: "starter", replyTime: 0}])
};

const conversationStarter = (chatReplies) => {
    let result = {};
    chatReplies.filter(m => m.type === "starter").forEach(m => {
        if (result[m.from] === undefined) result[m.from] = 1;
        else result[m.from] += 1;
    });
    let orderedResult = Object.values({...result}).sort((a, b) => b - a);
    let newResult = {}
    orderedResult.forEach(value => {
        newResult[Object.keys({...result})[Object.values({...result}).indexOf(value)]] = value;
    });
    return newResult;
};

const fastestReplier = (chatReplies) => {
    let result = {};
    chatReplies.filter(m => m.type === "reply").forEach(m => {
        if (result[m.from] === undefined) {
            result[m.from] = {replies: 1, cummulativeResponseTime: m.replyTime}
        } else {
            result[m.from].replies += 1;
            result[m.from].cummulativeResponseTime += m.replyTime;
        }
    });
    // Object.keys({...result}).sort(k => result[k].cummulativeResponseTime/result[k].replies);
    // TODO: sort results by speed
    Object.keys({...result}).map(key => result[key] = result[key].cummulativeResponseTime/result[key].replies);
    let orderedResult = Object.values({...result}).sort((a, b) => a - b);
    let newResult = {}
    orderedResult.forEach(value => {
        newResult[Object.keys({...result})[Object.values({...result}).indexOf(value)]] = value;
    });
    return newResult;
}

export { 
    chatReplies,
    conversationStarter,
    fastestReplier
}