export function generateRandomId() {
  return Math.random().toString().slice(2);
}

const colorsForNotes = ["#ED8E7A", "#5B88C4", "#73CABF", "#FAD491", "#E4ACCE"];

const colorsForBookmarks = [
  "#E55089",
  "#F7E43B",
  "#73C8A5",
  "#6FB8D3",
  "#F4E238",
  "#E4CEAF",
  "#E7E8CA",
];

export const generateRandomColorForNotes = () =>
  colorsForNotes[Math.floor(Math.random() * colorsForNotes.length)];

export const generateRandomColorForBookmarks = () =>
  colorsForBookmarks[Math.floor(Math.random() * colorsForBookmarks.length)];
