'use strict';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

const submitBtn = document.querySelector('form');
submitBtn.addEventListener('submit', e => {
  e.preventDefault();
  const amount = e.target.elements['amount'].value;
  const step = e.target.elements['step'].value;
  const delay = e.target.elements['delay'].value;

  // console.log(amount);
  // console.log(step);
  // console.log(delay);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
