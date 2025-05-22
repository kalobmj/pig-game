const diceLeft = document.getElementById("left-die");
const diceRight = document.getElementById("right-die");

const canvas1 = diceLeft.getContext("2d");
const canvas2 = diceRight.getContext("2d");

// bottom buttons
const rollDieBtn = document.getElementById("roll-die");
const holdDieBtn = document.getElementById("hold-die");
const newGameBtn = document.getElementById("new-game");
const rulesBtn = document.getElementById('rules');

// scores elements
const leftScoreThisTurn = document.getElementById('left-points');
const leftScoreTotal = document.getElementById('left-player');
const rightScoreThisTurn = document.getElementById('right-points');
const rightScoreTotal = document.getElementById('right-player');

// var to keep track of current player
let currentPlayer = canvas1;

let currentPlayerText = document.getElementById('current-player');

// fire elements
const fireElementLeft = document.getElementById('fire-left');
const fireElementRight = document.getElementById('fire-right');

// player points that round
const rightPoints = document.getElementById('right-points');
const leftPoints = document.getElementById('left-points');

// radius of circle (remains constant)
let radius = 22;

let rows = 3;
let cols = 3;

let cellsize = diceLeft.height / 3;

// var to determine if user has rolled yet
let hasPlayerRolled = false;

// function to update current player display
function updatePlayer() {
    if (currentPlayer === canvas1) {
        currentPlayerText.innerText = 'piggy 1';
    } else if (currentPlayer === canvas2) {
        currentPlayerText.innerText = 'piggy 2';
    }
}

rulesBtn.addEventListener('click', () => {
    // if you want to rewrite the rules better you can
    alert(`
            Rules:
                - Two players take turns rolling their dice. (player 1 = left dice, player 2 = right dice)
                - On a player's turn, they repeatedly roll the dice until they decide to "hold" or until they roll a 1.
                - If a player rolls a 1, they score nothing for that turn, and the turn ends, passing to the next player.
                - If a player rolls a 2, 3, 4, 5, or 6, the value of the dice is added to their current turn's total.
                -  A player can choose to "hold" at any time during their turn. This means they stop rolling and add their current turn's total to their overall score.

                - The first player to reach 100 points wins the game ~!
                🐷🐷🐽🐽🐖🐖
        `)
})

// function to check if current player has a high score that turn. If they do put un-hide a flame behind their score. Check for a high score on every roll
function checkForHighScore() {

    if (currentPlayer === canvas1) {
        if (Number(leftScoreThisTurn.innerText) >= 10) {
            fireElementLeft.classList.remove('hidden');
            leftPoints.style.color = '#007bff';
        } else {
            fireElementLeft.classList.add('hidden');
            leftPoints.style.color = 'unset';
        }
    } else if (currentPlayer === canvas2) {
        if (Number(rightScoreThisTurn.innerText) >= 10) {
            fireElementRight.classList.remove('hidden')
            rightPoints.style.color = '#007bff';
        } else {
            fireElementRight.classList.add('hidden')
            rightPoints.style.color = 'unset';
        }
    }

}

function checkScore() {
    if (currentPlayer === canvas1) {
        // if user scores at or over 100 points, they win !
        if ((Number(leftScoreTotal.innerText) + Number(leftScoreThisTurn.innerText)) >= 100) {
            console.log('cavnas1 player has scored at or over 100')

            leftScoreTotal.innerText = (Number(leftScoreThisTurn.innerText) + Number(leftScoreTotal.innerText))

            setTimeout(() => {

                // hide other btns besides new game
                rollDieBtn.classList.add('hidden');
                holdDieBtn.classList.add('hidden');

                // window alert
                alert(`piggy 1 wins the game! 🐷🐷`);
            }, 500);
            // confetti here

            // can either window reload after like 20 seconds, or once user hits new game -> reset game and stop confetti
        }

    } else if (currentPlayer === canvas2) {
        if ((Number(rightScoreTotal.innerText) + Number(rightScoreThisTurn.innerText)) >= 100) {
            console.log('cavnas2 player has scored at or over 100')

            rightScoreTotal.innerText = (Number(rightScoreThisTurn.innerText) + Number(rightScoreTotal.innerText))

            setTimeout(() => {

                // hide other btns besides new game
                rollDieBtn.classList.add('hidden');
                holdDieBtn.classList.add('hidden');

                // alert
                alert(`piggy 2 wins the game! 🐷🐷`);
            }, 500);

            // confetti here

            // can either window reload after like 20 seconds, or once user hits new game -> reset game and stop confetti
        }
    }
}

function colorDice(canvas) {
    // fill dice with blue color
    canvas.fillStyle = "rgb(0, 99, 124)";
    canvas.fillRect(0, 0, 250, 250);
};

const dotLocations = {
    1: [{ x: 1, y: 1 }],
    2: [{ x: 0, y: 2 }, { x: 2, y: 0 }],
    3: [{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }],
    4: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 2 }],
    5: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 2 }],
    6: [{ x: 0, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 2 }]
};

function drawCircle(canvas, x, y, radius, color) {
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI);
    canvas.stroke();
    canvas.fillStyle = color;
    canvas.fill();
};

// function to set up dice at beginning
function setupDice() {
    colorDice(canvas1);
    colorDice(canvas2);

    const randomRoll1 = Math.floor(Math.random() * 6) + 1;
    const randomRoll2 = Math.floor(Math.random() * 6) + 1;

    // left dice
    for (let i = 0; i < dotLocations[randomRoll1].length; i++) {
        let x = dotLocations[randomRoll1][i].x * cellsize + (cellsize / 2);
        let y = dotLocations[randomRoll1][i].y * cellsize + (cellsize / 2);
        let dotColor = "#2A2B2D";

        // drawing circle
        drawCircle(canvas1, x, y, radius, dotColor);
    }

    // right dice
    for (let i = 0; i < dotLocations[randomRoll2].length; i++) {
        let x = dotLocations[randomRoll2][i].x * cellsize + (cellsize / 2);
        let y = dotLocations[randomRoll2][i].y * cellsize + (cellsize / 2);
        let dotColor = "#2A2B2D";

        // drawing circle
        drawCircle(canvas2, x, y, radius, dotColor);
    }
};

// set up dice on first window load
setupDice();

// ROLL BUTTON
rollDieBtn.addEventListener("click", () => {
    console.log("Roll button clicked");

    let finalNum = 0;

    // put dice rolling into a function, so that we can run it 3 times in a second, the 3rd roll is the final roll

    function rollDice() {
        const numRolled = Math.floor(Math.random() * 6) + 1;
        console.log(numRolled);

        finalNum = numRolled;
    
        // re-color dice so dots can be drawn over top
        colorDice(currentPlayer)
    
        // loop thru dot locations to color in dots
        for (let i = 0; i < dotLocations[numRolled].length; i++) {
            let x = dotLocations[numRolled][i].x * cellsize + (cellsize / 2);
            let y = dotLocations[numRolled][i].y * cellsize + (cellsize / 2);
            let dotColor = "#2A2B2D";
    
            // drawing circle
            drawCircle(currentPlayer, x, y, radius, dotColor);
        }
    }

    // set interval to run every 1/3 second (3 times in a second)
    let rollingDiceInterval = setInterval(rollDice, 333);

    // stops function from running after a second
    setTimeout(() => {
        clearInterval(rollingDiceInterval)
    }, 1100);

    function updateScore() {
        // update score this turn (hold button updates total game score)
        if (currentPlayer === canvas1) {
    
            // if user hits 1 -> clear score for turn, and move to next person
            if (finalNum === 1) {
                leftScoreThisTurn.innerText = 0;
                leftPoints.style.color = 'red';
                fireElementLeft.classList.add('hidden');
                currentPlayer = canvas2;
                updatePlayer();
                hasPlayerRolled = false;
                return;
            }
    
            let num = Number(leftScoreThisTurn.innerText)
            num += finalNum;
            leftScoreThisTurn.innerText = num;
            hasPlayerRolled = true;
    
            // check score after all this
            checkForHighScore();
            checkScore();
        } else if (currentPlayer === canvas2) {
    
            // if user hits 1 -> clear score for turn, and move to next person
            if (finalNum === 1) {
                rightScoreThisTurn.innerText = 0;
                rightPoints.style.color = 'red';
                fireElementRight.classList.add('hidden');
                currentPlayer = canvas1;
                updatePlayer();
                hasPlayerRolled = false;
                return;
            }
    
            let num = Number(rightScoreThisTurn.innerText)
            num += finalNum;
            rightScoreThisTurn.innerText = num;
            hasPlayerRolled = true;
    
            // check score after all this
            checkForHighScore();
            checkScore();
        }

    }

    setTimeout(() => {
        updateScore();
    }, 1300);

    console.log('test')

});

//  NEW GAME BUTTON
newGameBtn.addEventListener("click", () => {
    console.log("New game button clicked");

    // setup fresh dice
    setupDice();

    // reset scores
    leftScoreThisTurn.innerText = 0;
    leftScoreTotal.innerText = 0;
    rightScoreThisTurn.innerText = 0;
    rightScoreTotal.innerText = 0;
    hasPlayerRolled = false;

    // change score colors back to default
    leftPoints.style.color = 'unset';
    rightPoints.style.color = 'unset';

    // set current player to player 1
    currentPlayer = canvas1;
    updatePlayer();

    // get rid of flames if applicable
    fireElementLeft.classList.add('hidden');
    fireElementRight.classList.add('hidden');

    // remove hidden classList if applicable
    rollDieBtn.classList.remove('hidden')
    holdDieBtn.classList.remove('hidden')

});

// HOLD BUTTON
holdDieBtn.addEventListener("click", () => {
    console.log("Hold button clicked");

    // user must roll before holding, if not have an alert

    // if user has rolled in their turn already, they have the option to hold their points and move on to the next persons turn
    if (hasPlayerRolled) {
        if (currentPlayer === canvas1) {
            let num = Number(leftScoreThisTurn.innerText);
            let numTotal = Number(leftScoreTotal.innerText);
            let newNum = num + numTotal;

            leftScoreTotal.innerText = newNum;
            leftScoreThisTurn.innerText = 0;

            checkForHighScore();

            currentPlayer = canvas2;
            hasPlayerRolled = false;
            fireElementLeft.classList.add('hiden');
            updatePlayer();
        } else if (currentPlayer === canvas2) {
            let num = Number(rightScoreThisTurn.innerText);
            let numTotal = Number(rightScoreTotal.innerText);
            let newNum = num + numTotal;

            rightScoreTotal.innerText = newNum;
            rightScoreThisTurn.innerText = 0;

            checkForHighScore();

            currentPlayer = canvas1;
            hasPlayerRolled = false;
            fireElementRight.classList.add('hiden');
            updatePlayer();
        }
    } else {
        alert(`${currentPlayerText.innerText} needs to roll first before holding !`)
    }

});
