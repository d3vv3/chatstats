var Sentiment = require('sentiment');

var sentiment = new Sentiment();

export const sentimentAnalysis = (polarizedChat) => {
    let result = {}
    Object.keys(polarizedChat).forEach(contact => {
        result[contact] = polarizedChat[contact].reduce((prev, current) => {
            return prev + sentiment.analyze(current.text);
        }, 0);
    });
    return result;
}