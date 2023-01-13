import moment from 'moment';

export function parseDateTime(date, time, langUS) {
    // console.log(date, time)

    // iOS and Android
    return moment(`${date} ${time}`, ["D/M/YY, H:mm:ss", "DD/MM/YYYY, HH:mm"]).toDate();
}