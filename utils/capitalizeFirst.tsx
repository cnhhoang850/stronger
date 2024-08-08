export default function capitalizeFirstLetter(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
