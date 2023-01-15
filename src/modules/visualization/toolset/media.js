export function getPhotoCount(polarizedChat) {
  var photoCount = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
      polarizedChat[key].forEach((msg) => {
          if (msg.photo != null) {
              photoCount[key] != null
              ? photoCount[key]++ : photoCount[key] = 1;
          }
      });
  });

  return photoCount;
}

export function getMediaCount(polarizedChat, fillColors, lineColors, type) {
  var mediaCount = {};

  // Iterate polarizedChat keys and see their array length
  Object.keys(polarizedChat).forEach((key) => {
      polarizedChat[key].forEach((msg) => {
          if (msg.media_type === type) {
              mediaCount[key] != null
              ? mediaCount[key]++ : mediaCount[key] = 1;
          }
      });
  });

  return mediaCount;
}
