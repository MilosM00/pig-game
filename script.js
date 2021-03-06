'use strict';

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);

const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

let scores, currentScore, activePlayer, playing;

const init = function(){
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);

    diceEl.classList.add(`hidden`);

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
};

init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
};

btnRoll.addEventListener(`click`, function(){
    if(playing){
        let dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove(`hidden`);
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1){
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener(`click`, function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add(`hidden`);

            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        }
        else{
            switchPlayer();
        }
    }   

});

btnNew.addEventListener(`click`, init);

//  Pig Game

//  About the game:

// This game is very fun and simple. Also, what is so good about this game is that you can play it with your friend.
// Two players race to reach 100 points.
// A player repeatedly rolls dice until either a 1 is rolled or the player holds.
// If a player rolls 1 every roll before that is meaningless.
// But if the player holds, every sum roll before that is inserted in results.

// There is maybe more to explain, but you will figure it out within the game.
