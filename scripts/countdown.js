const form = document.querySelector('.form');
const content = document.querySelector('.content');
const timeNumbers = document.querySelector('.time-number');

const selectors = [
  document.querySelector('.hours'),
  document.querySelector('.minutes'),
  document.querySelector('.seconds')
];

window.addEventListener('click', (event) => {

  const clicked = event.target.classList;
  console.log(clicked)

  if (clicked.contains('add-timer')) return openCfgTimer();
  if (clicked.contains('save-form')) return controller();
  if (clicked.contains('cancel-button' || 'cancel-div')) return closeForm();
  if (clicked.contains('')) return initCountDown();

})

function openCfgTimer() {

  form.style.display = 'block';
  content.style.filter = 'blur(6px)'

};

function controller() {

  const [hours, minutes, seconds] = saveAndVerifyTimeCfg();
  const [hourInSeconds, minutesInSeconds] = convertInSeconds(hours, minutes);

  const fulltimeInSeconds = hourInSeconds + minutesInSeconds + seconds;

  const fullTime = formatTime(fulltimeInSeconds);

  sendTimeToUser(fullTime);
  closeForm();

}

function saveAndVerifyTimeCfg() {

  for (let i = 0; i < selectors.length; i++) {
    if (selectors[i].value === '')
      return alert('please insert all informations on the timer configuration');
  };

  const hours = Number(selectors[0].value);
  const minutes = Number(selectors[1].value);
  const seconds = Number(selectors[2].value);

  return [hours, minutes, seconds];

};

function closeForm() {

  for (let i = 0; i < selectors.length; i++) {
    selectors[i].value = '';
  };

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
  return timeNumbers.innerHTML = fullTime;
}
