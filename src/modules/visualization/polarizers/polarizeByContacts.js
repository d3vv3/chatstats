function polarizeByContacts(chatObject) {
    // Separate each contact messages to analize separately
    // console.log(chatObject);
    var result = {};
    // Try in case component called it with null argument
    try {
      // Iterate through every message
      for (let msg of (chatObject.messages ?? [])) {
        // If the contact is in results as key
        if (msg.type === "message") {
          result[msg.from] != null
            ? result[msg.from].push(msg) // Then add the message to its key
            : (result[msg.from] = [msg]); // If it doesn't exist, create array with it
        };
      };
    } catch (e) {
      console.error(e);
    };
    return result;
};

export default polarizeByContacts;