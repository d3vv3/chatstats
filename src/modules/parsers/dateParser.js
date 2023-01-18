import moment from 'moment';

export function parseDateTime(date, time, langUS) {
    // console.log(date, time)

    let datetime = moment(`${date} ${time}`, ["D/M/YY, H:mm:ss", "DD/MM/YYYY, HH:mm"]).toDate()

    // iOS and Android
    return datetime.getTime();
}