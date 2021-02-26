const form = document.querySelector('.form');
const container = document.querySelector('.content');
const playPause = document.querySelector('.play');
const timeNumbers = document.querySelector('.time-number');

let timer;
let seconds = 0;

function openForm() {
  form.style.display = 'block';
  container.style.filter = 'blur(6px)';
}

function closeForm() {
  form.style.display = 'none';
  container.style.filter = 'blur(0)';
  playPause.classList.add('play');
}

function resetTime() {
  playPause.textContent = 'Play';
  playPause.classList.remove('pause');
  playPause.classList.add('play');

  timeNumbers.classList.remove('paused');
  timeNumbers.classList.add('on');

  clearInterval(timer);
  timeNumbers.innerHTML = '00:00:00';
  seconds = 0;
}

function getTime() {

  const hours = document.querySelector('.hours');
  const minutes = document.querySelector('.minutes');
  const seconds = document.querySelector('.seconds');

  if(hours.value === '' ||
  minutes.value === '' ||
  seconds.value === '') return window.alert('please complete all fields');
  if(Number(hours.value) >= 24 ||
  Number(minutes.value) >= 60 ||
  Number(seconds.value) >= 60) return window.alert('please insert valids values');

  const time = formatTime(hours.value, minutes.value, seconds.value);

  closeForm();

  hours.value = '';
  minutes.value = '';
  seconds.value = '';

  return insertTime(time);
}

function insertTime(time) {
  const timeNumbers = document.querySelector('.time-number');
  timeNumbers.innerHTML = time;
}

function startPause() {

  if(seconds === 0) return

  if (playPause.textContent === 'Play') {

    setTimeout(() => {

      playPause.textContent = 'Pause';
      playPause.classList.remove('play');
      playPause.classList.add('pause');

      timeNumbers.classList.remove('paused');
      timeNumbers.classList.add('on');

      timer = setInterval(() => {
        if(seconds === 0) return timeout();
        seconds--;
        timeNumbers.innerHTML = formatSec(seconds);

      }, 1000);

    }, 600);

  } else {

    setTimeout(() => {

      playPause.textContent = 'Play';
      playPause.classList.remove('pause');
      playPause.classList.add('play');

      timeNumbers.classList.remove('on');
      timeNumbers.classList.add('paused');
      clearInterval(timer);

    }, 600);

  };

};

function formatTime(h, m, s) {
  seconds = (Number(h) * 3600) + (Number(m) * 60) + Number(s);

  let hs = Math.trunc(seconds / 3600);
  let ms = Math.trunc(((seconds % 3600)/ 60));
  let ss = Math.trunc((seconds % 3600) % 60);

  if(hs < 10) hs = '0' + hs;
  if(ms < 10) ms = '0' + ms;
  if(ss < 10) ss = '0' + ss;

  const formated = `${hs}:${ms}:${ss}`;

  console.log(seconds);
  console.log(formated);

  return formated;
}

function formatSec(seconds) {
  let hs = Math.trunc(seconds / 3600);
  let ms = Math.trunc(((seconds % 3600)/ 60));
  let ss = Math.trunc((seconds % 3600) % 60);

  if(hs < 10) hs = '0' + hs;
  if(ms < 10) ms = '0' + ms;
  if(ss < 10) ss = '0' + ss;

  const formated = `${hs}:${ms}:${ss}`;

  console.log(seconds);
  console.log(formated);

  return formated;
}

function timeout() {
  playPause.textContent = 'Play';
  playPause.classList.remove('pause');
  playPause.classList.add('play');

  timeNumbers.classList.remove('on');
  timeNumbers.classList.add('paused');
  clearInterval(timer);

}

document.addEventListener('click', (event) => {
  const clicked = event.target.classList;

  if (clicked.contains('add-timer'))
    return openForm();
  if (clicked.contains('cancel-button') || clicked.contains('cancel-div'))
    return closeForm();
  if (clicked.contains('save-form'))
    return getTime();
  if (clicked.contains('reset'))
    return resetTime();
  if (clicked.contains('play') || clicked.contains('pause')) return startPause();
});

document.addEventListener('keydown', (keyEvent) => {
  if (keyEvent.code === 'Space') return startPause();
});
