'use strict';
//selecting elements
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const player1Cl = document.querySelector('.player--0');
const player2Cl = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// const currentEl0 = document.querySelector('#current--0');
// let currentScore1 = document.querySelector('#current--1');
let activePlayer, currentScore, scores, playing;

const init = function(){
    
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
    
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player1Cl.classList.remove('player--winner');
    player2Cl.classList.remove('player--winner');
    player1Cl.classList.add('player--active');
    player2Cl.classList.remove('player--active');

}

init();

// let hold = 0;
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1Cl.classList.toggle('player--active');
  player2Cl.classList.toggle('player--active');
};

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
// currentEl0.textContent = 0;

// currentScore1.textContent = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1: if true,
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active playre's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // console.log(scores[activePlayer]);
  }

  //2. check if player score is >= 100
  if (scores[activePlayer] >= 100) {
    // Finish the game.
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  } else {
    // switch to the next player.
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);


