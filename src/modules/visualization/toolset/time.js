export function getMessagesMonth(polarizedDates, months, colors) {
    var chat = {};
    var color = -1;

    Object.keys(polarizedDates).forEach((user) => {
        chat[user] = {};

        months.forEach((month) => {
            polarizedDates[user][month] != null
            ? chat[user][month] = polarizedDates[user][month].length
            : chat[user][month] = 0;
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
              backgroundColor: colors[color],
          }
      }),
    };
}
