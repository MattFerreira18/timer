export const playPause = document.querySelector('.play') || document.querySelector('.pause');
export const reset = document.querySelector('.reset');
export const timeNumbers = document.querySelector('.time-number');
let seconds = 0;
let timer;

playPause.addEventListener('click', initOrPause);
reset.addEventListener('click', resetTime);

function formatTime(seconds) {

    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString('pt-br', { hour12: false, timeZone: 'UTC' });

};

export function initOrPause() {

    if (playPause.textContent === 'Play') {


        playPause.textContent = 'Pause';
        playPause.classList.remove('play');
        playPause.classList.add('pause');

        timeNumbers.classList.remove('paused');
        timeNumbers.classList.add('on');

        timer = setInterval(() => {
            seconds++;
            timeNumbers.innerHTML = formatTime(seconds);

        }, 1000);


    } else {

        playPause.textContent = 'Play';
        playPause.classList.remove('pause');
        playPause.classList.add('play');

        timeNumbers.classList.remove('on');
        timeNumbers.classList.add('paused');

        clearInterval(timer);

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
