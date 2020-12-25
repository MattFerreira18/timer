// import { playPause, reset, timeNumbers } from './stopWatch';

const form = document.querySelector('.form');
const content = document.querySelector('.content');
const openCfgTimerBtn = document.querySelector('.add-timer');
const saveTimerBtn = document.querySelector('.save-form');
const closeBtn = document.querySelector('.cancel-button');

const selectors = [
    document.querySelector('.name'),
    document.querySelector('.hours'),
    document.querySelector('.minutes'),
    document.querySelector('.seconds')
];

openCfgTimerBtn.addEventListener('click', openCfgTimer);
saveTimerBtn.addEventListener('click', saveTimeCfg);
closeBtn.addEventListener('click', closeForm);

function openCfgTimer() {

    form.style.display = 'block';
    content.style.filter = 'blur(6px)'

};

function saveTimeCfg() {

    for (let i = 0; i < selectors.length; i++) {
        if (selectors[i].value === '')
            return alert('please insert all informations on the timer configuration');
    }

    const timerName = selectors[0];
    const hours = toString(selectors[1]);
    const minutes = toString(selectors[2]);
    const seconds = toString(selectors[3]);

    const sampleTimerName = `
    <div class="timer-name">
        <p>${timerName}</p>
    </div>
    `;

    const fullTime = `${hours}:${minutes}:${seconds} `;
    console.log(fullTime, Date.parse(fullTime), new Date(fullTime).toISOString());


    // organize the date

    closeForm()

};

function closeForm() {

    for (let i = 0; i < selectors.length; i++) {
        selectors[i].value = '';
    };

    form.style.display = 'none';
    content.style.filter = `blur(0px)`;

};