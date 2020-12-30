const form = document.querySelector('.form');
const content = document.querySelector('.content');
const playPauseBtn = document.querySelector('.play') || document.querySelector('.pause');
const timerNumbers = document.querySelector('.time-number');
let countdown;

const selectors = [

  document.querySelector('.hours'),
  document.querySelector('.minutes'),
  document.querySelector('.seconds')

];

window.addEventListener('click', (event) => {

  const clicked = event.target.classList;

  if (clicked.contains('add-timer')) return openCfgTimer();
  if (clicked.contains('save-form')) return controller();
  if (clicked.contains('cancel-button' || 'cancel-div')) return closeForm();
  if (clicked.contains('play') || clicked.contains('pause')) return initOrPauseCountdown();
  if (clicked.contains('reset')) return resetTime();

});

window.addEventListener('keypress', (event) => {

  const keyType = event.code;
  if (keyType === 'Space') { initOrPauseCountdown() };
  if (keyType === 'Enter') { closeForm() };

});

function openCfgTimer() {

  form.style.display = 'block';
  content.style.filter = 'blur(6px)';

};

function controller() {

  const [hours, minutes, seconds] = saveAndVerifyTimeCfg();
  const [hourInSeconds, minutesInSeconds] = convertInSeconds(hours, minutes);
  const fulltimeInSeconds = hourInSeconds + minutesInSeconds + seconds;
  const fullTime = formatTime(fulltimeInSeconds);
  sendTimeToUser(fullTime);
  closeForm();

};

function saveAndVerifyTimeCfg() {

  for (let i = 0; i < selectors.length; i++) { if (selectors[i].value === '') { return alert('please insert all informations on the timer configuration') } };

  const hours = Number(selectors[0].value);
  const minutes = Number(selectors[1].value);
  const seconds = Number(selectors[2].value);
  return [hours, minutes, seconds];

};

function closeForm() {

  for (let i = 0; i < selectors.length; i++) { selectors[i].value = '' };
  form.style.display = 'none';
  content.style.filter = `blur(0px)`;

};

function formatTime(fulltimeInSeconds) {

  const date = new Date(fulltimeInSeconds * 1000);
  return date.toLocaleTimeString('pt-br', { hour12: false, timeZone: 'UTC' });

};

function convertInSeconds(hours, minutes) {

  const hourInSeconds = hours * 3600;
  const minutesInSeconds = minutes * 60;
  return [hourInSeconds, minutesInSeconds];

};

function sendTimeToUser(fullTime) {
  return timerNumbers.innerHTML = fullTime;
}

function initOrPauseCountdown() {

  if (playPauseBtn.textContent === 'Play') {

    const getTime = document.querySelector('.time-number').textContent;
    const separateTime = getTime.split(':');

    const hoursNotConverted = separateTime[0]
    const minutesNotConverted = separateTime[1]
    const seconds = separateTime[2];
    const [hourInSeconds, minutesInSeconds] = convertInSeconds(hoursNotConverted, minutesNotConverted);
    let fulltimeInSeconds = hourInSeconds + minutesInSeconds + seconds;

    setTimeout(() => {

      playPauseBtn.textContent = 'Pause';
      playPauseBtn.classList.remove('play');
      playPauseBtn.classList.add('pause');

      timerNumbers.classList.remove('paused');
      timerNumbers.classList.add('on');

      countdown = setInterval(() => {

        if (fulltimeInSeconds !== 0) {

          fulltimeInSeconds--
          const timeFormated = formatTime(fulltimeInSeconds);
          console.log(timeFormated);
          sendTimeToUser(timeFormated);

        } else {

          clearInterval(countdown);
          timerNumbers.classList.remove('on');
          timerNumbers.classList.add('paused');

        };

      }, 1000);

    }, 600);


  } else {

    playPauseBtn.textContent = 'Play';
    playPauseBtn.classList.remove('pause');
    playPauseBtn.classList.add('play');

    timerNumbers.classList.remove('on');
    timerNumbers.classList.add('paused');
    clearInterval(countdown);

  };

};

function resetTime() {

  playPauseBtn.textContent = 'Play';
  playPauseBtn.classList.remove('pause');
  playPauseBtn.classList.add('play');

  timerNumbers.classList.remove('paused');
  timerNumbers.classList.add('on');

  clearInterval(countdown);
  timerNumbers.innerHTML = '00:00:00';

};
