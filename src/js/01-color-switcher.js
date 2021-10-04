'use strict';

import { getRandomHexColor } from './functions.js';


const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyNode = document.querySelector('body');
let changeColor = null;

startBtn.addEventListener('click', () => {
  changeColor = setInterval(() => {
    bodyNode.style.backgroundColor = getRandomHexColor();
  }, 1000)
  startBtn.disabled = true;
})

stopBtn.addEventListener('click', () => {
  clearInterval(changeColor);
  startBtn.disabled = false;
})

console.log(getRandomHexColor)