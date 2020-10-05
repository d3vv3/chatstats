var JSZip = require("jszip");

export function getChatFileFromZip(f) {
  return JSZip.loadAsync(f).then(
    function (zip) {
      var chat = "";
      zip.forEach(function (relativePath, zipEntry) {
        if (zipEntry.name === "_chat.txt") {
          chat = zip
            .file("_chat.txt")
            .async("string")
            .then(function (text) {
              return text;
            });
        }
      });
      return chat;
    },
    function (e) {
      console.error(f.name + ": " + e.message);
    }
  );
}
