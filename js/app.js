
/*-------------- Constants -------------*/
const words = ['computer', 'array', 'code', 'algorithm', 'variable']; // List of words to choose from
let selectedWord = words[Math.floor(Math.random() * words.length)]; // Pick a random word from the list

const maxWrong = 6 //number of wrong guesses allowed

// mid pic (not working yet)
// const remainingLetters = selectedWord.split('').filter(l => !correctLetters.includes(l))

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
    .split('') // makes the words to letters
    .map(letter => correctLetters.includes(letter) ? letter : '_')//if true reuturn letter else '_'
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

  //  loop over each part and its position 
  parts.forEach(function(part, index) {
    
    if (index < wrongLetters.length) { 
      part.style.display = 'block' // Show the part
    } else {
      // Otherwise hide the part completely
      part.style.display = 'none'
    }
  });
}

// Show a temporary message to the player
function showMessage(msg) {
  messageEl.textContent = msg
  setTimeout(() => {
    messageEl.textContent = ''
  }, 2000 ) // shows for 2sec
}

// Show image temporarily when 1 try is left :)
function showWarningImage() {
  const img = document.createElement('img')
  img.src = '../assets/dosomething.jpg'
  img.alt = '1 try left warning'
  img.style.position = 'fixed'
  img.style.left = '500px'
  img.style.top = '80px'
  img.style.width = '150px'
  img.style.height = 'auto'
  img.style.zIndex = '9999'

  document.body.appendChild(img);

  setTimeout(() => {
    document.body.removeChild(img);
  }, 5000); // remove after 5 seconds
}

/*
// in progreess: Show image temporarily when theres 3 letter try is left :)
function showMidImage() {
  const img = document.createElement('img')
  img.src = '../assets/midpic.jpg'
  img.alt = '3 letter left'
  img.style.position = 'fixed'
  img.style.left = '500px'
  img.style.top = '100px'
  img.style.width = '150px'
  img.style.height = 'auto'
  img.style.zIndex = '9999'

  document.body.appendChild(img);

  setTimeout(() => {
    document.body.removeChild(img);
  }, 5000); // remove after 5 seconds
}
*/



function handleGuess(letter) {
  if (selectedWord.includes(letter)) 
     { showMessage ("Correct!( ദ്ദി ˙ᗜ˙ )")
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
      updateWordDisplay()
    } else {
      showMessage("You already guessed that letter!(¬_¬)");
    }
  }
   else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter)
      updateWrongDisplay()
            // Show warning image if only 1 try left
      if ((maxWrong - wrongLetters.length) === 1) {
        showWarningImage();
      }

    } else {
      showMessage("Wrong again! You already guessed that. ( ˶°ㅁ°) !!")
    }
  }
}

/* let won = true;

for (const letter of selectedWord) {
  if (!correctLetters.includes(letter)) {
    won = false;
    break;
  }
} */ 

function checkWin() {
  const won = selectedWord.split('').every(letter => correctLetters.includes(letter))
  if (won) {
    showMessage("ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧ You won!")
    //setTimeout( () => 5000 

   // )
   // disableInput()
  }
}


// 6 tries 
function checkLose() {
  if (wrongLetters.length >= maxWrong) {
    showMessage(`Game Over! The word was 💥💀 "${selectedWord}"`)
    setTimeout(() => {
    
  showMessage
  }, 6000); // remove after 6 seconds but not working yet
    disableInput();
  }
} 





function disableInput() {
  document.removeEventListener('keyup', onKeyUp) // plyer cant type
}

function enableInput() {
  document.addEventListener('keyup', onKeyUp); // adds the keyup again
}

function resetGame() {
  correctLetters = [] //rests the correct letters
  wrongLetters = [] // restes the wrong letters 
  selectedWord = words[Math.floor(Math.random() * words.length)] // chooses another random word 
  updateWordDisplay() // updates the _ _ 
  updateWrongDisplay()
  messageEl.textContent = ''
  enableInput()
}

// registers the keyboard input 
function onKeyUp(event) {
  const letter = event.key.toLowerCase() // convert to lowercase
  if (letter.match(/^[a-z]$/)) {
    handleGuess(letter);
  }
}

/*----------- Event Listeners ----------*/


// makes the game starts after the page fully loaded ;)
document.addEventListener('DOMContentLoaded', () => {
  updateWordDisplay()
  updateWrongDisplay()


 
  document.addEventListener('keyup', onKeyUp)
  playBtn.addEventListener('click', resetGame)
  retryBtn.addEventListener('click', resetGame)
})
