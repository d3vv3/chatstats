export default function polarizeByDay(polarizedChat) {
    var result = {};
    var week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    Object.keys(polarizedChat).forEach((key) => {
      result[key] = {};
      try {
        for (let msg of polarizedChat[key]) {
          var msg_date = new Date(msg.date);
          var day = msg_date.getDay();
          var date = week[day];
  
          result[key][date] != null
            ? result[key][date].push(msg)
            : (result[key][date] = [msg]);
        };
      } catch (e) {
        console.error(e);
      };
    });
  
    return { chat: result, days: week };
};