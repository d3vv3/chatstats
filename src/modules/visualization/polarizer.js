// Separate each contact messages to analize separately
export function getPolarizedChat(chatObject) {
  // console.log(chatObject);
  var result = {};
  // Try in case component called it with null argument
  try {
    // Iterate through every message
    for (let msg of chatObject.messages) {
      // If the contact is in results as key
      result[msg.from] != null
        ? result[msg.from].push(msg) // Then add the message to its key
        : (result[msg.from] = [msg]); // If it doesn't exist, create array with it
    }
  } catch (e) {}

  return result;
}

export function polarizeByDate(polarizedChat) {
    var result = {};
    var months = []

    Object.keys(polarizedChat).forEach((key => {
        result[key] = {};
        try {

            for(let msg of polarizedChat[key]) {

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
        } catch(e) {}
    }))

    return {chat: result, months: months};
}
