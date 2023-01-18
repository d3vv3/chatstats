export default function polarizeByMonth(polarizedChat) {
    var result = {};
    var months = [];
  
    Object.keys(polarizedChat).forEach((key) => {
      result[key] = {};
      try {
        for (let msg of polarizedChat[key]) {
          var msg_date = new Date(msg.date);
          var month = msg_date.getMonth() + 1;
          var year = msg_date.getFullYear();
          var date = month + "/" + year;
  
          if (months.indexOf(date) === -1) {
            months.push(date);
          };
  
          result[key][date] != null
            ? result[key][date].push(msg)
            : (result[key][date] = [msg]);
        };
      } catch (e) {
        console.error(e);
      };
    });
  
    return { chat: result, months: months };
};