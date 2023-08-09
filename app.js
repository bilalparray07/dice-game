"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // stat getting elements from dom and assign varibles
  const rollDice = document.querySelector(".btn--roll");
  const diceImg = document.querySelector(".dice");
  const currentScoreElm0 = document.querySelector("#current--0");
  const currentScoreElm1 = document.querySelector("#current--1");
  const player0 = document.querySelector(".player--0");
  const player1 = document.querySelector(".player--1");
  const holdBtn = document.querySelector(".btn--hold");
  const newBtn = document.querySelector(".btn--new");
  // hide the dice first
  diceImg.classList.add("hidden");
  // variables for score
  let scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;

  // init function which restarts the game
  const init = () => {
    scores = [0, 0];
    currentScore = 0;

    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    console.log(`.player--${activePlayer}`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
    document.querySelector(`.player--0`).classList.add("player--active");
    activePlayer = 0;
    diceImg.classList.remove("hidden");
    rollDice.disabled = false;
    holdBtn.disabled = false;
  };

  // player switch function using activeplayer variables
  const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  };
  // disable buttons after a player wins function
  const disableButtons = () => {
    rollDice.disabled = true;
    holdBtn.disabled = true;
  };
  // start rolling dice
  rollDice.addEventListener("click", () => {
    // display dice now
    diceImg.classList.remove("hidden");
    //generate a random number
    const dice = Math.floor(Math.random() * 6) + 1;
    //inerst image
    diceImg.src = `dice-${dice}.png`;
    //check if dice ==1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  });

  // hold button score
  holdBtn.addEventListener("click", () => {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      disableButtons();
      diceImg.classList.add("hidden");
    } else {
      switchPlayer();
    }
  });
  // new bnt or restart the game
  newBtn.addEventListener("click", () => {
    if (
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.contains("player--winner")
    ) {
      init();
    }
  });
});
