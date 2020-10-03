export function getPhotoCount(polarizedChat, fillColors, lineColors) {
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

  // Result should have a format Chartjs Doughnut wants
  return {
    labels: Object.keys(photoCount),
    datasets: [
      {
        data: Object.values(photoCount),
        backgroundColor: fillColors,
        borderColor: lineColors,
        // hoverBackgroundColor: colors,
      },
    ],
  };
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

  // Result should have a format Chartjs Doughnut wants
  return {
    labels: Object.keys(mediaCount),
    datasets: [
      {
        data: Object.values(mediaCount),
        backgroundColor: fillColors,
        borderColor: lineColors,
        // hoverBackgroundColor: colors,
      },
    ],
  };
}
