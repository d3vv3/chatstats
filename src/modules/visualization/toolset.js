// Returns number of messages per contact
function messageCount(polarizedChat) {
  var result = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
    result[key] = polarizedChat[key].length;
  });
  return result;
}
