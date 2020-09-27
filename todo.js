window.setInterval(theTime, 1000);
window.setInterval(theDate, 1000);
function theDate() {
  const today = document.querySelector(".date");

  const date = new Date();
  const day = date.getDate();
  let months = [
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
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  today.innerText = day + ", " + month + " " + year;
}
function theTime() {
  const time = document.querySelector(".time");
  const date = new Date();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  let suf;
  if (hours > 11) suf = "pm";
  else suf = "am";
  if (hours > 12) hours = Math.abs(hours - 12);
  if (mins < 10) mins = "0" + mins;
  if (hours < 10) hours = "0" + hours;
  if (secs < 10) secs = "0" + secs;
  time.innerText = hours + " : " + mins + " : " + secs + " " + suf;
}

function inputValid() {
  let input = document.querySelector("#todo");
  let btn = document.querySelector("#add-btn");
  let checkInput = input.value.trim();
  if (checkInput.length > 0) btn.style.pointerEvents = "auto";
  else btn.style.pointerEvents = "none";
}
