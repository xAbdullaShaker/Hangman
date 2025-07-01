/*-------------- Constants -------------*/
const words = ['computer', 'programming', 'array', 'code'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const maxWrong = 6

let currentLetters = []


/*---------- Variables (state) ---------*/

let correctGuesses = [];       // Letters the player guessed correctly
let wrongGuesses = [];         // Letters the player guessed wrong


/*----- Cached Element References  -----*/

// HTML elements to update using JS
const wordContainerEl = document.getElementById('word-container');
const wrongLettersEl = document.getElementById('wrong-letters');
const messageEl = document.getElementById('message');
const playBtn = document.getElementById('play-button');
const retryBtn = document.getElementById('retry-button');


/*-------------- Functions -------------*/
// 
function updateWordDisplay() {
  wordContainerEl.innerHTML = selectedWord
    .split('') // converts the word to letters 
    .map(letter => correctLetters.includes(letter) ? letter : '_') // makes the unguessed letters to '_'
    .join(' '); //removes the spaces 
  
  checkWin(); // check if the player won
}

  // sees if the letter a-z in english only
  if (letter.match(/^[a-z]$/)) {
    handleGuess(letter);
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

/*----------- Event Listeners ----------*/

// register the keyboard input
document.addEventListener('keyup', (event) => {
  const letter = event.key.toLowerCase();
})
playBtn.addEventListener('click', resetGame); // Restart the game on play button click
retryBtn.addEventListener('click', resetGame); // Restart the game on retry button click
