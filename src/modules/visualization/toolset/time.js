export function getMessagesMonth(
  polarizedDates,
  months,
  fillColors,
  lineColors
) {
  var chat = {};
  var color = -1;

  Object.keys(polarizedDates).forEach((user) => {
    chat[user] = {};

    months.forEach((month) => {
      polarizedDates[user][month] != null
        ? (chat[user][month] = polarizedDates[user][month].length)
        : (chat[user][month] = 0);
    });
  });

  return {
    labels: months,
    datasets: Object.keys(chat).map((key) => {
      color++;
      return {
        label: key,
        data: Object.values(chat[key]),
        type: "bar",
        backgroundColor: fillColors[color],
        borderColor: lineColors[color],
      };
    }),
  };
}

export function getMessagesDay(polarizedDates, days, fillColors, lineColors) {
  var chat = {};
  var color = -1;

  Object.keys(polarizedDates).forEach((user) => {
    chat[user] = {};

    days.forEach((day) => {
      polarizedDates[user][day] != null
        ? (chat[user][day] = polarizedDates[user][day].length)
        : (chat[user][day] = 0);
    });
  });

  return {
    labels: days,
    datasets: Object.keys(chat).map((key) => {
      color++;
      return {
        label: key,
        data: Object.values(chat[key]),
        type: "bar",
        backgroundColor: fillColors[color],
        borderColor: lineColors[color],
      };
    }),
  };
}

export function getMessagesHour(polarizedDates, hours, fillColors, lineColors) {
  var chat = {};
  var color = -1;

  Object.keys(polarizedDates).forEach((user) => {
    chat[user] = {};

    hours.forEach((hour) => {
      polarizedDates[user][hour] != null
        ? (chat[user][hour] = polarizedDates[user][hour].length)
        : (chat[user][hour] = 0);
    });
  });

  return {
    labels: hours,
    datasets: Object.keys(chat).map((key) => {
      color++;
      return {
        label: key,
        data: Object.values(chat[key]),
        type: "bar",
        backgroundColor: fillColors[color],
        borderColor: lineColors[color],
      };
    }),
  };
}
