import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');
let selectedDate;
let curentDate;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime();
    curentDate = new Date().getTime();
    if (selectedDate <= curentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  let string = value.toString();
  if (string.length < 2) {
    return string.padStart(2, '0');
  }
  return string;
}

startBtn.addEventListener('click', () => {
  let timeDifference;
  timerId = setInterval(() => {
    curentDate = new Date().getTime();
    timeDifference = selectedDate - curentDate;
    let dateOutput = convertMs(timeDifference);
    daysOutput.textContent = addLeadingZero(dateOutput.days);
    hoursOutput.textContent = addLeadingZero(dateOutput.hours);
    minutesOutput.textContent = addLeadingZero(dateOutput.minutes);
    secondsOutput.textContent = addLeadingZero(dateOutput.seconds);
    if (timeDifference <= 1000) {
      clearInterval(timerId);
      startBtn.disabled = true;
    }
  }, 1000);
});
