const playPause = document.querySelector('.play');
const timeNumbers = document.querySelector('.time-number');
let seconds = 0;
let timer;

function formatTime(seconds) {

  const date = new Date(seconds * 1000);
  return date.toLocaleTimeString('pt-br', { hour12: false, timeZone: 'UTC' });

};

function startPause() {

  if (playPause.textContent === 'Play') {

    setTimeout(() => {

      playPause.textContent = 'Pause';
      playPause.classList.remove('play');
      playPause.classList.add('pause');

      timeNumbers.classList.remove('paused');
      timeNumbers.classList.add('on');

      timer = setInterval(() => {
        seconds++;
        timeNumbers.innerHTML = formatTime(seconds);

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

function resetTime() {

  playPause.textContent = 'Play';
  playPause.classList.remove('pause');
  playPause.classList.add('play');

  timeNumbers.classList.remove('paused');
  timeNumbers.classList.add('on');

  clearInterval(timer);
  timeNumbers.innerHTML = '00:00:00';
  seconds = 0;

};


document.addEventListener('click', (e) => {

  const clicked = e.target.classList;

  if (clicked.contains('play') || clicked.contains('pause')) startPause();
  if (clicked.contains('reset')) resetTime();

});

document.addEventListener('keydown', (keyEvent) => {

  if (keyEvent.code === 'Space') return startPause();

});
