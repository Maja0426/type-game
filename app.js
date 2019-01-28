window.addEventListener('load', gameInit);

const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

const currentLevel = levels.easy;

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

const words = ['ablak', 'kalapács', 'kefe', 'autó', 'pók', 'keret', 'labda', 'ecset', 'telefon', 'korcsolya', 'szánkó', 'labda', 'pulóver', 'kabát', 'szemüveg', 'vasaló', 'elem', 'bor', 'furulya', 'villa', 'kanál', 'lakókocsi', 'motor', 'szánkó', 'felhő', 'tavasz', 'kutya', 'macska', 'madár', 'kelkáposzta', 'téliszalámi', 'piros', 'fehér', 'zöld', 'telefon', 'asztal', 'programozás', 'emancipáció', 'keresztény', 'boglya', 'gereblye', 'kertkapu', 'füstgyertya', 'technikus', 'osztályvezető', 'határozat', 'tanusítvány', 'lakberendező', 'jegyzőkönyv', 'nyaralás', 'jégkrém', 'önindító', 'berendezés', 'csomagolás', 'vakablak', 'túlóra', 'fizetésemelés'];


// Initialize Game
function gameInit() {
  seconds.textContent = time;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
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
  if (wordInput.value === currentWord.textContent) {
    message.textContent = 'Helyes!';
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
    message.textContent = 'Lassú voltál, vége!!';
    score = -1;
  }
}
