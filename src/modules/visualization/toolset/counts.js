// Returns number of messages per contact
export function getMessageCount(polarizedChat, colors) {
  var nonChatjsResult = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    nonChatjsResult[key] = polarizedChat[key].length;
  });

  // Result should have a format Chartjs Doughnut wants
  return {
    labels: Object.keys(nonChatjsResult),
    datasets: [
      {
        data: Object.values(nonChatjsResult),
        backgroundColor: colors,
        // hoverBackgroundColor: colors,
      },
    ],
  };
}

export function getCharCount(superStrings, colors) {
  var chars = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(superStrings).forEach((key) => {
    chars[key] = superStrings[key].length;
  });

  return {
    labels: Object.keys(chars),
    datasets: [
      {
        data: Object.values(chars),
        backgroundColor: colors,
        // hoverBackgroundCOlor: colors,
      },
    ],
  };
}
