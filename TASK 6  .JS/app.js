const gameCard = document.getElementById('game-card');
const guessInput = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const resetBtn = document.getElementById('reset-btn');
const messageArea = document.getElementById('message-area');
const attemptsDisplay = document.getElementById('attempts-display');

const helpBtn = document.getElementById('help-btn');
const helpModal = document.getElementById('help-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');


let secretNumber;
let attempts;


function createSecretNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function showMessage(message) {
  messageArea.textContent = message;
}

function checkGuess() {
  const inputValue = guessInput.value.trim();

  if (inputValue === '') {
    showMessage('Enter a number');
    return;
  }

  const guess = Number(inputValue);

  if (guess < 1 || guess > 10 || isNaN(guess)) {
    showMessage('Choose a number from 1 to 10');
    return;
  }

  if (guess === secretNumber) {
    showMessage('Correct!');
    gameCard.classList.add('win');
    checkBtn.disabled = true;
    return;
  }

  attempts--;
  attemptsDisplay.textContent = attempts;

  if (attempts === 0) {
    showMessage('Game over');
    gameCard.classList.add('lose');
    checkBtn.disabled = true;
  } else {
    if (guess > secretNumber) {
      showMessage('Too high');
    } else {
      showMessage('Too low');
    }
  }
}
function resetGame() {
  attempts = 5;
  secretNumber = createSecretNumber(); 
  attemptsDisplay.textContent = attempts;
  guessInput.value = '';
  showMessage('');
  checkBtn.disabled = false;
  gameCard.classList.remove('win', 'lose');
}

function openModal() {
  helpModal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}

function closeModal() {
  helpModal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

checkBtn.addEventListener('click', checkGuess);


guessInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !checkBtn.disabled) {
    checkGuess();
  }
});

resetBtn.addEventListener('click', resetGame);


helpBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !helpModal.classList.contains('hidden')) {
    closeModal();
  }
});

resetGame();