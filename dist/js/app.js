window.addEventListener('load', gameInit);

let currentLevel = 5;

// Globals
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const message = document.querySelector('#message');
const timeDisplay = document.querySelector('#time');
const scoreDisplay = document.querySelector('#score');
const seconds = document.querySelector('#seconds');
const easy = document.querySelector('#easy');
const medium = document.querySelector('#medium');
const hard = document.querySelector('#hard');
const progressBar = document.querySelector('.progress-bar');

const words = ['ablak', 'kalapács', 'kefe', 'autó', 'pók', 'keret', 'labda', 'ecset', 'telefon', 'korcsolya', 'szánkó', 'labda', 'pulóver', 'kabát', 'szemüveg', 'vasaló', 'elem', 'bor', 'furulya', 'villa', 'kanál', 'lakókocsi', 'motor', 'szánkó', 'felhő', 'tavasz', 'kutya', 'macska', 'madár', 'kelkáposzta', 'téliszalámi', 'piros', 'fehér', 'zöld', 'telefon', 'asztal', 'programozás', 'emancipáció', 'keresztény', 'boglya', 'gereblye', 'kertkapu', 'füstgyertya', 'technikus', 'osztályvezető', 'határozat', 'tanusítvány', 'lakberendező', 'jegyzőkönyv', 'nyaralás', 'jégkrém', 'önindító', 'berendezés', 'csomagolás', 'vakablak', 'túlóra', 'fizetésemelés'];

// Initialize Game
function gameInit() {
  seconds.textContent = time;
  timeDisplay.textContent = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 10);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel +1;
    showWord(words);
    wordInput.value = '';
    score += plusScore;
  }
  
  // If score is -1, display 0
  if (score === -1) { 
    scoreDisplay.textContent = 0;
  } else {
    scoreDisplay.textContent = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value.toUpperCase() === currentWord.textContent.toUpperCase()) {
    message.textContent = 'Helyes!';
    plusScore = currentWord.textContent.length;
    return true;
  } else {
    message.textContent = 'Írd utánam!';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  let rndWord = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.textContent = words[rndWord];
}

// Countdown timer
function countdown() {
  // MAke sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is Over
    isPlaying = false;
  }
  // Show time
  timeDisplay.textContent = time;
}

// Check Game Status
function checkStatus() {
  if(!isPlaying && time === 0) {
    message.textContent = 'GAME OVER!';
    score = -1;
    progressBar.classList.add('bg-success');
    progressBar.classList.remove('bg-danger');
    // Chose difficulty 
      // Easy
      easy.addEventListener('click', function () {
        currentLevel = 5;
        easy.classList.add('active');
        medium.classList.remove('active');
        hard.classList.remove('active');
      })

      // Medium
      medium.addEventListener('click', function () {
        currentLevel = 3;
        easy.classList.remove('active');
        medium.classList.add('active');
        hard.classList.remove('active');
      })

      // Hard
      hard.addEventListener('click', function () {
        currentLevel = 2;
        easy.classList.remove('active');
        medium.classList.remove('active');
        hard.classList.add('active');
      })
  }
  progress();
  seconds.textContent = currentLevel;
}

// increase progress bar from 0% to words length, 100%
function progress() {
  var wordLength = currentWord.textContent.length;
  var step = 100 / wordLength;
  var ch = wordInput.value.length;
  progressBar.style.width = step*wordInput.value.length + '%';
  if (wordInput.value.substring(0, ch) !== currentWord.textContent.substring(0, ch)) {
    progressBar.classList.remove('bg-success');
    progressBar.classList.add('bg-danger');
  } else {
    progressBar.classList.add('bg-success');
    progressBar.classList.remove('bg-danger');
  }
}


