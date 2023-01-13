export function parseMediaType(text) {
    if (text === "<Media omitted>") {
      return "unknown";
    } else if (/\.opus \(file attached\)$/.test(text) || /\.opus>$/.test(text)) {
      return "voice_message";
    } else if (/\.mp4 \(file attached\)$/.test(text) || /\.mp4>$/.test(text)) {
      return "video_file";
    } else if (/\.webp \(file attached\)$/.test(text) || /\.webp>$/.test(text)) {
      return "sticker";
    } else if (/\.jpg \(file attached\)$/.test(text) || /\.jpg>$/.test(text)) {
      return "image"
    } else {
      return null;
    }
}