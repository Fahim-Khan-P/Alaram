const currentTime = document.getElementById("currentTime");
const hourSelect = document.getElementById("hourSelect");
const minuteSelect = document.getElementById("minuteSelect");
const ampmSelect = document.getElementById("ampmSelect");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const notification = document.getElementById("notification");
const ringtone = new Audio("ring.mp3");

for (let i = 12; i > 0; i--) {
  const option = document.createElement("option");
  option.value = i < 10 ? `0${i}` : i;
  option.textContent = i < 10 ? `0${i}` : i;
  hourSelect.appendChild(option);
}

for (let i = 59; i >= 0; i--) {
  const option = document.createElement("option");
  option.value = i < 10 ? `0${i}` : i;
  option.textContent = i < 10 ? `0${i}` : i;
  minuteSelect.appendChild(option);
}

["AM", "PM"].forEach((ampm) => {
  const option = document.createElement("option");
  option.value = ampm;
  option.textContent = ampm;
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

  currentTime.textContent = `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
    notification.textContent = "Ringing";
  } else if (alarmTime) {
    notification.textContent = "Alarm is already set";
  } else {
    notification.textContent = "Please set Alarm!";
  }
});

let alarmTime = "";

function setAlarm() {
  if (alarmTime) {
    alarmTime = "";
    ringtone.pause();
    setAlarmBtn.textContent = "Set Alarm";
    notification.textContent = "Please set Alarm!";
  } else {
    const hour = hourSelect.value;
    const minute = minuteSelect.value;
    const ampm = ampmSelect.value;

    if ([hour, minute, ampm].includes("Hour") || [hour, minute, ampm].includes("Minute") || [hour, minute, ampm].includes("AM/PM")) {
      alert("Invalid time!");
      return;
    }

    alarmTime = `${hour}:${minute} ${ampm}`;
    setAlarmBtn.textContent = "Clear Alarm";
    notification.textContent = "Alarm is already set";
  }
}

setAlarmBtn.addEventListener("click", setAlarm);