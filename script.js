const reset = document.getElementById('reset');
const play = document.getElementById('play');
const timer = document.getElementById('timer');
const root = document.querySelector(':root');

const totaltime = 120;
let playing = false;
let current = totaltime;
timer.innerText = formatTime(totaltime);

function formatTime(a) {
  const min = Math.floor(a / 60);
  const newSec = a % 60;
  return `${min.toString().padStart(2, '0')}:${newSec.toString().padStart(2, '0')}`;
}

play.addEventListener('click', () => {
  playing = !playing;
  play.classList.toggle('play');
  play.classList.toggle('bg-green-600');
  const playIcon = play.querySelector('i');
  playIcon.classList.toggle('fa-play');
  playIcon.classList.toggle('fa-pause');
});

root.style.setProperty('--degrees', '90deg');

const updateTime = () => {
  if (playing && current > 0) {
    current--;
    timer.innerText = formatTime(current);
    root.style.setProperty('--degrees', `${(1 - current / totaltime) * 360}deg`);
  }
};

const timerInterval = setInterval(updateTime, 1000);


reset.addEventListener('click', () => {
  current = totaltime;
  timer.innerText = formatTime(current);
  clearInterval(timerInterval); 
  play.classList.remove('play');
  play.classList.remove('bg-green-600');
  const playIcon = play.querySelector('i');
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
  timerInterval = setInterval(updateTime, 1000); 
});