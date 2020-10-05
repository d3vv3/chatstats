var JSZip = require("jszip");

export function getChatFileFromZip(f) {
  JSZip.loadAsync(f).then(
    function (zip) {
      zip.forEach(function (relativePath, zipEntry) {
        // 2) print entries
        console.log(zipEntry.name);
        console.log(zipEntry);
        console.log(relativePath);
        if (zipEntry.name === "_chat.txt") {
          zip
            .file("_chat.txt")
            .async("string")
            .then(function (text) {
              console.log(text);
              return text;
            });
        }
      });
    },
    function (e) {
      console.error(f.name + ": " + e.message);
    }
  );
}
