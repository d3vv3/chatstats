var randomColor = require("randomcolor");

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

// Returns number of messages per contact
export function getMessageCount(polarizedChat) {
  var nonChatjsResult = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    nonChatjsResult[key] = polarizedChat[key].length;
  });

  // Scalable way of generating colors
  var colors = randomColor({
    count: Object.keys(polarizedChat).length,
    hue: "purple",
    luminosity: "bright",
  });

  // Result should have a format Chartjs Doughnut wants
  return {
    labels: Object.keys(nonChatjsResult),
    datasets: [
      {
        data: Object.values(nonChatjsResult),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
}
