const diceLeft = document.getElementById("left-die");
const diceRight = document.getElementById("right-die");

const canvas1 = diceLeft.getContext("2d");
const canvas2 = diceRight.getContext("2d");

// Andy buttons
const rollDieBtn = document.getElementById("roll-die");
const holdDieBtn = document.getElementById("hold-die");
const newGameBtn = document.getElementById("new-game");

// scores elements
const leftScoreThisTurn = document.getElementById('left-points');
const leftScoreTotal = document.getElementById('left-player');
const rightScoreThisTurn = document.getElementById('right-points');
const rightScoreTotal = document.getElementById('right-player');

// // score vars (might not need)
// let leftScore = 0;
// let leftScoreAll = 0;
// let rightScore = 0;
// let rightScoreAll = 0;

// var to keep track of current player
let currentPlayer = canvas1;

let currentPlayerText = document.getElementById('current-player');

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

function checkScore() {
    if (currentPlayer === canvas1) {
        // logic for player 1 winning game

        console.log('checking score for canvas1 player')
        console.log(leftScoreTotal.innerText)
        console.log(typeof leftScoreTotal.innerText)
        console.log(Number(leftScoreTotal.innerText))

        // if user scores at or over 100 points, they win !
        if ((Number(leftScoreTotal.innerText) + Number(leftScoreThisTurn.innerText)) >= 10) {

            console.log('cavnas1 player has scored at or over 100')

            // Number(leftScoreThisTurn.innerText)

            // update main score

            leftScoreTotal.innerText = (Number(leftScoreThisTurn.innerText) + Number(leftScoreTotal.innerText))

            setTimeout(() => {

                
                alert(`piggy 1 wins the game!`);
            }, 500);
            // confetti here

            // can either window reload after like 20 seconds, or once user hits new game -> reset game and stop confetti
            
        }
        
    } else if (currentPlayer === canvas2) {
        // logic for player 2 winning game

        if (rightScoreTotal.innerText >= 100) {
            
            alert(`${currentPlayerText.innerText} wins the game!`);
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

setupDice();

// ROLL BUTTON
rollDieBtn.addEventListener("click", () => {
    console.log("Roll button clicked");

    const numRolled = Math.floor(Math.random() * 6) + 1;
    console.log(numRolled);

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

    // update score this turn (hold button updates total game score)
    if (currentPlayer === canvas1) {

        // if user hits 1 -> clear score for turn, and move to next person
        if (numRolled === 1) {
            leftScoreThisTurn.innerText = 0;
            currentPlayer = canvas2;
            updatePlayer();
            hasPlayerRolled = false;
            return;
        }
        
        let num = Number(leftScoreThisTurn.innerText)
        num += numRolled;
        leftScoreThisTurn.innerText = num;
        hasPlayerRolled = true;

        // check score after all this
        checkScore();

        
        // currentPlayer = canvas2;
    } else if (currentPlayer === canvas2) {
        
        // if user hits 1 -> clear score for turn, and move to next person
        if (numRolled === 1) {
            rightScoreThisTurn.innerText = 0;
            currentPlayer = canvas1;
            updatePlayer();
            hasPlayerRolled = false;
            return;
        }
        
        let num = Number(rightScoreThisTurn.innerText)
        num += numRolled;
        rightScoreThisTurn.innerText = num;
        hasPlayerRolled = true;
        
        // check score after all this
        checkScore();

        // currentPlayer = canvas1;
    }

});

//  NEW GAME BUTTON
newGameBtn.addEventListener("click", () => {
    console.log("New game button clicked");

    setupDice();

    // reset scores
    leftScoreThisTurn.innerText = 0;
    leftScoreTotal.innerText = 0;
    rightScoreThisTurn.innerText = 0;
    rightScoreTotal.innerText = 0;
    hasPlayerRolled = false;

    // set current player to player 1
    currentPlayer = canvas1;
    updatePlayer();

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
    
            currentPlayer = canvas2;
            hasPlayerRolled = false;
            updatePlayer();
        } else if (currentPlayer === canvas2) {
            let num = Number(rightScoreThisTurn.innerText);
            let numTotal = Number(rightScoreTotal.innerText);
            let newNum = num + numTotal;
            
            rightScoreTotal.innerText = newNum;
            rightScoreThisTurn.innerText = 0;
            
            currentPlayer = canvas1;
            hasPlayerRolled = false;
            updatePlayer();
        }
    } else {
        alert(`${currentPlayerText.innerText} needs to roll first before holding !`)
    }

});
