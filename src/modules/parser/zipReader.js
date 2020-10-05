var JSZip = require("jszip");

export function getChatFileFromZip(f) {
    return JSZip.loadAsync(f).then(
        function (zip) {

            var chat = '';
          zip.forEach(function (relativePath, zipEntry) {
            // 2) print entries
            // console.log(zipEntry.name);
            // console.log(zipEntry);
            // console.log(relativePath);
            if (zipEntry.name === "_chat.txt") {
              chat = zip
                .file("_chat.txt")
                .async("string")
                .then(function (text) {
                  console.log(text);
                  console.log(new Date().getTime());
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
