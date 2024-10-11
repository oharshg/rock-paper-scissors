let compMove = '';
let result = '';

const autoPlayBtn = document.querySelector('.js-autoplay');
const resetBtn = document.querySelector('.js-reset-btn');

autoPlayBtn.addEventListener('click', () => {
    autoPlay();
})

resetBtn.addEventListener('click', () => {
    resetScore();
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        autoPlay();
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        resetScore();
    }
})

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

displayScore();
function calculateComputerMove() {
    let randNum = Math.random();
    if (randNum >= 0 && randNum < 1 / 3) {
        compMove = 'rock';
    }
    else if (randNum >= 1 / 3 && randNum < 2 / 3) {
        compMove = 'paper';
    } else {
        compMove = 'scissors';
    }
}

//Plays the Game
function calculateOutcome(playerMove) {

    calculateComputerMove();

    if (playerMove === 'rock') {
        if (compMove === 'rock') {
            result = 'Tie';
        }
        else if (compMove === 'paper') {
            result = 'You lose';
        }
        else {
            result = 'You win';
        }
    }

    if (playerMove === 'paper') {
        if (compMove === 'rock') {
            result = 'You win';
        }
        else if (compMove === 'paper') {
            result = 'Tie';
        }
        else {
            result = 'You lose';
        }
    }

    if (playerMove === 'scissors') {
        if (compMove === 'rock') {
            result = 'You lose';
        }
        else if (compMove === 'paper') {
            result = 'You win';
        }
        else {
            result = 'Tie';
        }
    }
    updateScore();
    displayResult(playerMove);
}

function displayResult(playerMove) {
    const resultElement = document.querySelector('.js-result');
    const movesElement = document.querySelector('.js-moves-display');
    resultElement.innerHTML = `${result}`;
    movesElement.innerHTML = `You <img class="move-icon" src="Images/${playerMove}-emoji.png"> <img class="move-icon" src="Images/${compMove}-emoji.png"> Computer`;
    displayScore();
}

function displayScore() {
    const scoreElement = document.querySelector('.js-score');
    scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateScore() {
    if (result === 'You win') {
        score.wins += 1;
    }
    else if (result === 'You lose') {
        score.losses += 1;
    }
    else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
}

function resetScore() {

    const confirmationElement = document.querySelector('.js-reset-confirmation');

    confirmationElement.innerHTML = `Are you sure you want to reset the score? 
    <button class="js-reset-yes-btn reset-confirmation-btns">Yes</button>
    <button class="js-reset-no-btn reset-confirmation-btns">No</button>`;

    const resetYes = document.querySelector('.js-reset-yes-btn');
    const resetNo = document.querySelector('.js-reset-no-btn');
    
    resetYes.addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        displayScore();
        localStorage.removeItem('score');
        confirmationElement.innerHTML = `Score was Reset`
        setTimeout(() => {
            confirmationElement.innerHTML = '';
        }, 1000)
    });
    resetNo.addEventListener('click', () => {
        confirmationElement.innerHTML = `Score was Not Reset`
        setTimeout(() => {
            confirmationElement.innerHTML = '';
        }, 1000)

    });
}

let intervalIdAutoPlay;
let isAutoPlaying = false;
function autoPlay() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        autoPlayBtn.innerHTML = "Stop Playing";
        intervalIdAutoPlay = setInterval(() => {
            calculateComputerMove();
            calculateOutcome(compMove);
        }, 1000);
    }
    else {
        clearInterval(intervalIdAutoPlay);
        isAutoPlaying = false;
        autoPlayBtn.innerHTML = "Autoplay";
    }
}



