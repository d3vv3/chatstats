export default function polarizeByMonth(polarizedChat) {
    var result = {};
    var months = [];
  
    Object.keys(polarizedChat).forEach((key) => {
      result[key] = {};
      try {
        for (let msg of polarizedChat[key]) {
          var month = msg.date.getMonth() + 1;
          // console.log(msg.date.getMonth());
          var year = msg.date.getFullYear();
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