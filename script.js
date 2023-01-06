const form = document.querySelector("form");
const message = document.getElementById("message");
const display = document.getElementById("display");
let messages = [];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

document.addEventListener("DOMContentLoaded", (e) => {
  messages = localStorage.getItem("messages")
    ? JSON.parse(localStorage.getItem("messages"))
    : [];
  loadMessages();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messages.push({ message: message.value, date: formatDateTime(new Date()) });
  localStorage.setItem("messages", JSON.stringify(messages));
  loadMessages();
  message.innerText = "";
});

const loadMessages = () => {
  display.innerHTML = "";
  messages.forEach(({ message, date }) => {
    console.log(`${date} ${message}`);
    display.innerHTML += `<div><hr><h6>${date}</h6> <h2>${message}</h2><hr></div>`;
  });
};

const formatDateTime = (date) => {
  const month = date.getMonth();
  const days = date.getDay();
  const fullYear = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strDateTime = `${months[month]} ${days}, ${fullYear} ${hours}:${minutes} ${ampm}`;

  return strDateTime;
};
