// Separate each contact messages to analize separately
export function getPolarizedChat(chatObject) {
  // console.log(chatObject);
  var result = {};
  // Try in case component called it with null argument
  try {
    // Iterate through every message
    for (let msg of chatObject.messages) {
      // If the contact is in results as key
      if (msg.type !== "service") {
        console.log(msg.from);
        result[msg.from] != null
          ? result[msg.from].push(msg) // Then add the message to its key
          : (result[msg.from] = [msg]); // If it doesn't exist, create array with it
      }
    }
  } catch (e) {}
  console.log(result);
  return result;
}

export function polarizeByMonth(polarizedChat) {
  var result = {};
  var months = [];

  Object.keys(polarizedChat).forEach((key) => {
    result[key] = {};
    try {
      for (let msg of polarizedChat[key]) {
        var month = msg.date.getMonth() + 1;
        var year = msg.date.getFullYear();
        var date = month + "/" + year;

        if (months.indexOf(date) === -1) {
          months.push(date);
        }

        result[key][date] != null
          ? result[key][date].push(msg)
          : (result[key][date] = [msg]);
      }
    } catch (e) {}
  });

  return { chat: result, months: months };
}

export function polarizeByDay(polarizedChat) {
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
        var day = msg.date.getDay();
        var date = week[day];

        result[key][date] != null
          ? result[key][date].push(msg)
          : (result[key][date] = [msg]);
      }
    } catch (e) {}
  });

  return { chat: result, days: week };
}

export function polarizeByHour(polarizedChat) {
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
        var hour = msg.date.getHours();
        var date = ("0" + hour).slice(-2) + ":00";

        result[key][date] != null
          ? result[key][date].push(msg)
          : (result[key][date] = [msg]);
      }
    } catch (e) {}
  });

  return { chat: result, hours: hours };
}
