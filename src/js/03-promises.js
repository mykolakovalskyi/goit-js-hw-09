import Notiflix from 'notiflix';

const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    setTimeout(() => {
      Promise.resolve({ position, delay }).then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      });
    }, delay);
  } else {
    setTimeout(() => {
      Promise.reject({ position, delay }).catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    }, delay);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  let promiseDelay = Number(delayInput.value);
  let delayStep = Number(stepInput.value);
  let amountOfPrimises = Number(amountInput.value);

  if (promiseDelay < 0 || delayStep < 0 || amountOfPrimises < 0) {
    Notiflix.Notify.warning(`❗ Please enter a positive number`);
  } else {
    for (let i = 0; i < amountOfPrimises; i++) {
      let position = i + 1;
      let delay = promiseDelay + delayStep * i;
      createPromise(position, delay);
    }
  }

  event.currentTarget.reset();
});
