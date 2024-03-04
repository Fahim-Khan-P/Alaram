const currentTime = document.getElementById("currentTime");
const hourSelect = document.getElementById("hourSelect");
const minuteSelect = document.getElementById("minuteSelect");
const ampmSelect = document.getElementById("ampmSelect");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const notification = document.getElementById("notification");
const ringtone = new Audio("ring.mp3");

Array.from({ length: 12 }, (_, i) => 12 - i)
  .forEach((value) => {
    const option = createOption(value);
    hourSelect.appendChild(option);
  });

Array.from({ length: 60 }, (_, i) => 59 - i)
  .forEach((value) => {
    const option = createOption(value);
    minuteSelect.appendChild(option);
  });
  
["AM", "PM"].forEach((ampm) => {
  const option = createOption(ampm);
  ampmSelect.appendChild(option);
});

setInterval(() => {
  const date = new Date();
  let h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h -= 12;
    ampm = "PM";
  }
  h = h === 0 ? 12 : h;
  h = h < 10 ? `0${h}` : h;

  currentTime.textContent = `${h}:${formatTime(m)}:${formatTime(s)} ${ampm}`;

  if (alarmTime === `${h}:${formatTime(m)} ${ampm}`) {
    playRingtone();
    notification.textContent = "Ringing...";
    notification.classList.add('ringing');
  } else if (alarmTime) {
    notification.textContent = "Alarm is already set";
    notification.classList.remove("ringing");
  } else {
    notification.textContent = "Please set Alarm!";
    notification.classList.remove("ringing");
  }
}, 1000);

let alarmTime = "";

function setAlarm() {
  if (alarmTime) {
    clearAlarm();
  } else {
    const hour = hourSelect.value;
    const minute = minuteSelect.value;
    const ampm = ampmSelect.value;

    alarmTime = `${hour}:${minute} ${ampm}`;
    setAlarmBtn.textContent = "Clear Alarm";
    notification.textContent = "Alarm is already set";
  }
}

function clearAlarm() {
  alarmTime = "";
  pauseRingtone();
  setAlarmBtn.textContent = "Set Alarm";
  notification.textContent = "Please set Alarm!";
  notification.classList.remove("ringing");
}

function playRingtone() {
  ringtone.play();
  ringtone.loop = true;
}

function pauseRingtone() {
  ringtone.pause();
}

function createOption(value) {
  const option = document.createElement("option");
  option.value = formatTime(value);
  option.textContent = formatTime(value);
  return option;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setAlarmBtn.addEventListener("click", setAlarm);