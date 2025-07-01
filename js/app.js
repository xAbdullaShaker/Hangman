/*-------------- Constants -------------*/
const words = ['computer', 'programming', 'array', 'code']; // List of words to choose from
let selectedWord = words[Math.floor(Math.random() * words.length)]; // Pick a random word from the list

const maxWrong = 6 //number of wrong guesses allowed

/*---------- Variables (state) ---------*/
let correctLetters = [] // store correct guessed letters
let wrongLetters = []  // store wrong guessed letters

/*----- Cached Element References  -----*/
const wordContainerEl = document.getElementById('word-container') // Where the word (or underscores) will be displayed
const wrongLettersEl = document.getElementById('wrong-letters')   // Where wrong letters will be shown
const messageEl = document.getElementById('message')              // Message display area for win/lose/status
const playBtn = document.getElementById('play-button')            // Play button to start or restart the game
const retryBtn = document.getElementById('retry-button')          // Retry button for restarting the game
const hangmanContainer = document.getElementById('hangman-container') // Container for hangman parts

/*-------------- Functions -------------*/

function updateWordDisplay() {
  // Display the word with guessed letters and underscores for hidden ones
  wordContainerEl.innerHTML = selectedWord
    .split('') // males the words to letters
    .map(letter => correctLetters.includes(letter) ? letter : '_')
    .join(' ') // removes spaces

  checkWin() // checks if win
}
// Update the display of wrong letters and hangman parts
function updateWrongDisplay() {
  wrongLettersEl.textContent = wrongLetters.join(', ') // shows all the wrongly guessed letters
  updateHangman()
  checkLose()
}
// Show or hide hangman figure parts based on the number of wrong guesses
function updateHangman() {
  const parts = hangmanContainer.querySelectorAll('.hangman-part')
  parts.forEach((part, index) => {
    part.style.display = index < wrongLetters.length ? 'block' : 'none'
  })
}
// Show a temporary message to the player
function showMessage(msg) {
  messageEl.textContent = msg;
  setTimeout(() => {
    messageEl.textContent = ''
  }, 2000);
}

function handleGuess(letter) {
  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      updateWordDisplay();
    } else {
      showMessage("You already guessed that letter!");
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongDisplay();
    } else {
      showMessage("Wrong again! You already guessed that.");
    }
  }
}

function checkWin() {
  const won = selectedWord.split('').every(letter => correctLetters.includes(letter));
  if (won) {
    showMessage("🎉 You won!");
    disableInput();
  }
}

function checkLose() {
  if (wrongLetters.length >= maxWrong) {
    showMessage(`Game Over! The word was "${selectedWord}"`);
    disableInput();
  }
}

function disableInput() {
  document.removeEventListener('keyup', onKeyUp);
}

function enableInput() {
  document.addEventListener('keyup', onKeyUp);
}

function resetGame() {
  correctLetters = [];
  wrongLetters = [];
  selectedWord = words[Math.floor(Math.random() * words.length)];
  updateWordDisplay();
  updateWrongDisplay();
  messageEl.textContent = '';
  enableInput();
}

/*----------- Event Listeners ----------*/
// registers the keyboard input
function onKeyUp(event) {
  const letter = event.key.toLowerCase();
  if (letter.match(/^[a-z]$/)) {
    handleGuess(letter);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateWordDisplay();
  updateWrongDisplay();
  document.addEventListener('keyup', onKeyUp);
  playBtn.addEventListener('click', resetGame);
  retryBtn.addEventListener('click', resetGame);
});
