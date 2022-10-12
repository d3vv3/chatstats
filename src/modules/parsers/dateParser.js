export function parseDateTime(date, time, langUS) {

    // var patt = /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4}),? ([0-9]{2}:[0-9]{2})(:[0-9]{2})?/;
    date = date.split("/");

    var month = langUS ? date[1] : date[0];
    var day = langUS ? date[0] : date[1];

    var year = date[2];

    time = time.split(":")
    if (time[2] === undefined) {
        time[2] = "00";
    }

    return new Date(
        year + "-" + month + "-" + day + "T" + time[0] + ":" + time[1] + ":" + time[2]
    );
}