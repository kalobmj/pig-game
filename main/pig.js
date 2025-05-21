const diceLeft = document.getElementById("left-die");
const diceRight = document.getElementById("right-die");

const canvas1 = diceLeft.getContext("2d");
const canvas2 = diceRight.getContext("2d");

// Andy buttons
const rollDieBtn = document.getElementById("roll-die");
const holdDieBtn = document.getElementById("hold-die");
const newGameBtn = document.getElementById("new-game");

// var to keep track of current player
let currentPLayer;

// object of logic for coloring die dots
let actions = {
  // is dice rolls a 1, actions[0] === 1; -> call actions[numRolled - 1]
  // args being used in the functions will come inside the loops scope
  1: () => {
    //
    canvas1.beginPath();
    canvas1.arc(dotX, dotY, radius, 0, 2 * Math.PI);
    canvas1.strokeStyle = "black";
    canvas1.stroke();
    canvas1.fillStyle = "#2A2B2D";
    canvas1.fill();
  },
};

// possibly ditch object functions
// trade them out for hardcoded list of 9 cell locations? idk
// could possibly have the x, y locations and loop through them

// console.log({rollDieBtn})
// console.log({holdDieBtn})
// console.log({newGameBtn})

let rows = 3;
let cols = 3;

// console.log(diceLeft.height);
let cellsize = diceLeft.height / 3;
// console.log({ cellsize });

// can just have main dice color as one rect
// then can draw dots using loops and arc

// but idk because it might be easier to loop rect by rect and detrmine if cell needs to be filled with dot (idk)

// logic here for determining dot placement

// color die (test)
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    // const isEven = (i + j) % 2 === 0; // commented this code line, because it's not used nowhere, delete if later mby?

    // dice body color
    const color = "#00637C";

    // Refactored some repeating code in to function
    function drawDice(canvas, x, y, cellsize, color) {
      canvas.fillStyle = color;
      canvas.fillRect(x * cellsize, y * cellsize, cellsize, cellsize);
      canvas.strokeStyle = "rgb(0, 99, 124)";
      canvas.strokeRect(x * cellsize, y * cellsize, cellsize, cellsize);
    }

    // left dice, calling funcion for canvas1
    drawDice(canvas1, j, i, cellsize, color);
    // right dice, calling funcion for canvas2
    drawDice(canvas2, j, i, cellsize, color);

    // left dice   <------ old code below up to 103 line, if you reviewed it you can delete it,
    // canvas1.fillStyle = color;
    // canvas1.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);
    // canvas1.strokeStyle = "rgb(0, 99, 124)";
    // canvas1.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize);

    // right dice
    // canvas2.fillStyle = color;
    // canvas2.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);
    // canvas2.strokeStyle = "rgb(0, 99, 124)";
    // canvas2.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize);

    // used cell dimensions, to find radius (middle of cell)
    // j = x; cols
    // i = y; rows
    const dotX = j * cellsize + cellsize / 2;
    const dotY = i * cellsize + cellsize / 2;

    // circle size
    const radius = 22;

    // calling object functions will come after here:

    // start drawing circle
    canvas1.beginPath();
    canvas2.beginPath();

    canvas1.arc(dotX, dotY, radius, 0, 2 * Math.PI);
    canvas2.arc(dotX, dotY, radius, 0, 2 * Math.PI);

    // cirlce color
    // canvas1.strokeStyle = "black"; // commented it out, because it doing nothing
    // canvas2.strokeStyle = "black";

    // draw circle line
    canvas1.stroke();
    canvas2.stroke();

    // circle fill color
    canvas1.fillStyle = "#2A2B2D";
    canvas2.fillStyle = "#2A2B2D";

    // fill middle of circle (maybe)
    canvas1.fill();
    canvas2.fill();

    // take this logic and apply to each cell
    // have logic to determine if cell needs dot (comes later)
  }
}

// ROLL BUTTON
rollDieBtn.addEventListener("click", () => {
  console.log("Roll button clicked");
  // 1 - 6; add 1 because we will always need at least 1 dice (roll a 1)
  const numRolled = Math.floor(Math.random() * 6) + 1;
  // for (let i = 0; i < 10; i++) {
  //   console.log(numRolled);
  // }
  console.log(numRolled);

  // info we need:
  // current player (we know which die to roll)

  // logic for after rolling:
  // based on roll & rules, appropriately move on to next stage of game
});

//  NEW GAME BUTTON
newGameBtn.addEventListener("click", () => {
  console.log("New game button clicked");
  // clearing everything :D
  canvas1.clearRect(0, 0, diceLeft.width, diceLeft.height);
  // getting back color after clearing
  canvas1.fillStyle = "rgb(0, 99, 124)";
  canvas1.fillRect(0, 0, 250, 250);
});

// HOLD BUTTON
holdDieBtn.addEventListener("click", () => {
  console.log("Hold button clicked");
});
