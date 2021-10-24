import flatpickr from "flatpickr";
import { convertMs, addLeadingZero } from './functions.js'
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const inputNode = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.disabled = true;
stopBtn.disabled = true;

let time;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future')
      
    } else {
      startBtn.disabled = false;
    }


    let time = selectedDates[0].getTime() - Date.now()
    
    const updateTime = function (time) { 
    const { days, hours, minutes, seconds } = convertMs(time);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }
    
    startBtn.addEventListener('click', () => {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      inputNode.disabled = true;
      
      
      timerId = setInterval(() => {
        if (parseInt(time / 1000) === 0) {
          clearInterval(timerId);
        }
        else {
          updateTime(time -= 1000)
          
        }
      }, 1000)
      
      console.log(time)
    });

    stopBtn.addEventListener('click', () => {
       clearInterval(timerId);
      stopBtn.disabled = true;
      startBtn.disabled = false;
    })

  },
};



flatpickr(inputNode, options)


