export function getTopWords(wordRepetition) {
    const commonWords = [
        "de", "la", "que", "el", "en", "y", "a", "los", "se", "del", "las",
        "un", "por", "con", "no", "una", "su", "para", "es", "al", "lo",
        "como", "más", "o", "pero", "sus", "le", "ha", "me", "si", "sin",
        "sobre", "este", "ya", "entre", "cuando", "todo", "esta", "ser", "son",
        "dos", "también", "fue", "había", "era", "muy", "años", "hasta",
        "desde", "está", "mi", "porque", "qué", "solo", "han", "yo", "hay",
        "vez", "puede", "todos", "así", "nos", "ni", "parte", "tiene", "él",
        "uno", "donde", "bien", "tiempo", "mismo", "ese", "ahora", "cada",
        "vida", "otro"
    ];

    var topWords = Object.entries(wordRepetition)
    .sort(([,a],[,b]) => b-a).filter(([word,]) => {
        if (commonWords.some(common => common === word)) {console.log(word);}
        return !commonWords.some(common => word === common);
    }).slice(0, 40).map(([word, count]) => {
        return {text: word, value: count};
    });

    return topWords;
}
