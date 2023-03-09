// date
const d = new Date();

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDate() {
  return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}
const hours = d.getHours();
var ampm = hours <= 11 ? "AM" : "PM";
const getHours = () => {
  if (hours > 12) return hours - 12;
  else return hours;
};

let minutes = d.getMinutes();
const getMinutes = () => {
  if (minutes < 10) return `0${+minutes}`;
  else return minutes;
};

let seconds = d.getSeconds();
const getSeconds = () => {
  if (seconds < 10) return `0${+seconds}`;
  else return seconds;
};

export const timestamp =
  getDate() +
  " | " +
  getHours() +
  ":" +
  getMinutes() +
  ":" +
  getSeconds() +
  " " +
  ampm;
