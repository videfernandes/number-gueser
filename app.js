/*
Funções do jogo
- o jogador deve adivinhar um número entre min e max
- o jogador tem um número fixo de tentativas
- notitifar o jogador das tentativas que faltam
- notificar o jogador da alternativa correta, caso ele perca.
- deixar o jogador escolher jogar novamente.
*/

//game values

let min = 0,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;


//UI Elements 
const gameUI = document.querySelector('#game');
const minNumUI = document.querySelector('.min-num');
const maxNumUI = document.querySelector('.max-num');
const guessBtnUI = document.querySelector('#guess-btn');
const guessInputUI = document.querySelector('#guess-input');
const messageUI = document.querySelector('.message');

//Assign UI min and max
minNumUI.textContent = min;
maxNumUI.textContent = max;

//Pay again event listener
gameUI.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//listen for guess
guessBtnUI.addEventListener('click', function () {
  let guess = parseInt(guessInputUI.value);
  //console.log(guess);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`, 'green');

  } else {
    //wrong number 
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}!`);
    } else {
      // game continue - answer wrong

      //change input color
      guessInputUI.style.bordercolor = 'red';

      //clear input 
      guessInputUI.value = '';

      //tell user its the worng number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }

});

//Game Over 

function gameOver(won, msg) {

  let color;
  won === true ? color = 'green' : color = 'red';

  //disable input
  guessInputUI.disabled = true;
  //change border color
  guessInputUI.style.borderColor = color;
  //change text color
  messageUI.style.color = color;
  //set message
  setMessage(msg);

  //Play Again? 

  guessBtnUI.value = 'Play Again';
  guessBtnUI.className += 'play-again';

}

//Set message
function setMessage(msg, color) {
  messageUI.textContent = msg;
  messageUI.style.color = color;
}

//getting a random number
function getWinningNum(min, max) {
  let num = Math.floor(Math.random() * ((max - min + 1) + min));
  //console.log(num);
  return num;
}