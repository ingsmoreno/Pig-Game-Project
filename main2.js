'use strict';
//Buttons;
const rollingBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

//Selecting elements;
const image = document.querySelector('.img-dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//Functions;

//Setting up the elements;
let playing, scores, currentScore, activePlayer;

function init(){
    //Setting up to 0;
    playing = true;
    scores = [0,0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    activePlayer = 0; 

    //Adding classes;
    image.classList.add('hidden');
    player0El.classList.add('player--active');

    //Removing classes;
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}

init();

function switching(){
    // Setting the score to 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    //Switching the player;
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Adding the active player classList;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling the dice;
rollingBtn.addEventListener('click', function(){
    if (playing) {
         //1. Rolling the dice
        let dice = Math.trunc(Math.random()*6)+1;
        // 2. remove the classList
        image.classList.remove('hidden');
        // 3. Switching the image 
        image.src = `src/images/dice-${dice}.png`;

        //Check if the dice is not 1. 
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else{
            //if it's 1, switch the player;
            switching();
        }
    }
});

holdBtn.addEventListener('click', function(){
    if (playing) {
        //1. Add current score to total score
        console.log(scores);
        scores[activePlayer] += currentScore;
        console.log(scores[activePlayer]);
        //scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if total score is >= 100;
        if (scores[activePlayer] >= 20) {
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            playing = false;

        }else{
            //3. Switch player
            switching();
        }
        
    }
});

newBtn.addEventListener('click', init);


