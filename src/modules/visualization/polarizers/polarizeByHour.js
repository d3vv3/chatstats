export default function polarizeByHour(polarizedChat) {
    var result = {};
    var hours = [];
    for (var i = 0; i < 24; i++) {
      var h = ("0" + i).slice(-2) + ":00";
      hours.push(h);
    }
  
    Object.keys(polarizedChat).forEach((key) => {
      result[key] = {};
      try {
        for (let msg of polarizedChat[key]) {
          var msg_date = new Date(msg.date);
          var hour = msg_date.getHours();
          var date = ("0" + hour).slice(-2) + ":00";
  
          result[key][date] != null
            ? result[key][date].push(msg)
            : (result[key][date] = [msg]);
        }
      } catch (e) {}
    });
  
    return { chat: result, hours: hours };
}