const diceLeft = document.getElementById("left-die");
const diceRight = document.getElementById("right-die");

const canvas1 = diceLeft.getContext("2d");
const canvas2 = diceRight.getContext("2d");

// Andy buttons
const rollDieBtn = document.getElementById("roll-die");
const holdDieBtn = document.getElementById("hold-die");
const newGameBtn = document.getElementById("new-game");

// scores
const leftScoreThisTurn = document.getElementById('left-points');
const leftScoreTotal = document.getElementById('left-player');

const rightScoreThisTurn = document.getElementById('right-points');
const rightScoreTotal = document.getElementById('right-player');

// var to keep track of current player
let currentPlayer = canvas1;

// radius of circle (remains constant)
let radius = 22;

let rows = 3;
let cols = 3;

let cellsize = diceLeft.height / 3;

function colorDice(canvas) {
  // fill dice with blue color
  canvas.fillStyle = "rgb(0, 99, 124)";
  canvas.fillRect(0, 0, 250, 250);
};

const dotLocations = {
  1: [{x: 1, y: 1}],
  2: [{x: 0, y: 2}, {x: 2, y: 0}],
  3: [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}],
  4: [{x: 0, y: 0}, {x: 2, y: 0}, {x: 0, y: 2}, {x: 2, y: 2}],
  5: [{x: 0, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 2, y: 2}],
  6: [{x: 0, y: 0}, {x: 2, y: 1}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 2, y: 2}]
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
    let num = Number(leftScoreThisTurn.innerText)
    num += numRolled;
    leftScoreThisTurn.innerText = num;
    currentPlayer = canvas2;
  } else if (currentPlayer === canvas2) {
    let num = Number(rightScoreThisTurn.innerText)
    num += numRolled;
    rightScoreThisTurn.innerText = num;
    currentPlayer = canvas1;
  }

});

//  NEW GAME BUTTON
newGameBtn.addEventListener("click", () => {
  console.log("New game button clicked");
  // // clearing everything :D
  // canvas1.clearRect(0, 0, diceLeft.width, diceLeft.height);
  // // getting back color after clearing
  // canvas1.fillStyle = "rgb(0, 99, 124)";
  // canvas1.fillRect(0, 0, 250, 250);

  setupDice();


});

// HOLD BUTTON
holdDieBtn.addEventListener("click", () => {
  console.log("Hold button clicked");

  // update current player's total score
  // change points this turn to 0 for current player
  // change current player

  if (currentPlayer === canvas1) {
    let num = Number(leftScoreThisTurn.innerText);
    let numTotal = Number(leftScoreTotal.innerText);

    leftScoreTotal.innnerText = (num + numTotal);
    leftScoreThisTurn.innerText = 0;
    currentPlayer = canvas2
  } else if (currentPlayer === canvas2) {
    let num = Number(rightScoreThisTurn.innerText);
    let numTotal = Number(rightScoreTotal.innerText);

    rightScoreTotal.innnerText = (num + numTotal);
    rightScoreThisTurn.innerText = 0;
    currentPlayer = canvas1;
  }

});
