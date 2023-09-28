import moment from 'moment';

export function parseDateTime(date, time, langUS) {
    // console.log(date, time)

    let datetime = moment(`${date} ${time}`, ["D/M/YY, H:mm:ss", "D/M/YY, H:mm", "M/DD/YY, HH:mm","DD/MM/YYYY, HH:mm", "DD/MM/YYYY, H:MM A"]).toDate()

    // iOS and Android
    return datetime.getTime();
}
