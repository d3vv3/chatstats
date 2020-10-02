export function getTopWords(wordRepetition) {
    var topWords = Object.entries(wordRepetition)
    .sort(([,a],[,b]) => b-a).slice(0, 40).map(([word, count]) => {
        return {text: word, value: count};
    });

    return topWords;
}
