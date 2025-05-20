const diceLeft = document.getElementById("left-die");
const diceRight = document.getElementById("right-die");

const canvas1 = diceLeft.getContext("2d");
const canvas2 = diceRight.getContext("2d");

let rows = 3;
let cols = 3;

console.log(diceLeft.height);

let cellsize = diceLeft.height / 3;

console.log({ cellsize });

// can just have main dice color as one rect
// then can draw dots using loops and arc

// but idk because it might be easier to loop rect by rect and detrmine if cell needs to be filled with dot (idk)

// color die (test)
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const isEven = (i + j) % 2 === 0;

    // colors are placeholder, just testing colors
    const color = '#00637C'

    // left dice
    canvas1.fillStyle = color;
    canvas1.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);
    canvas1.strokeStyle = "rgb(0, 99, 124)";
    canvas1.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize)

    
    // right dice
    canvas2.fillStyle = color;
    canvas2.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);
    canvas2.strokeStyle = "rgb(0, 99, 124)";
    canvas2.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize)
    
    // making circle (dot in dice)
    // canvas1.beginPath();
    // canvas1.arc(100, 75, 50, 0, 2 * Math.PI);
    // ctx.stroke();

    // const dotX = diceLeft.width / 2;
    // const dotY = diceLeft.height / 2;

    // might need to take coords, add half of cellsize to x and y, to determine radius

    // used cell dimensions, to find radius (middle of cell)
    const dotX = (i * cellsize) + (cellsize / 2);
    const dotY = (j * cellsize) + (cellsize / 2);

    // circle size 
    const radius = 20;

    // start drawing circle
    canvas1.beginPath();

    // draw circle based on coords
    canvas1.arc(dotX, dotY, radius, 0, 2 * Math.PI);

    // cirlce color
    canvas1.strokeStyle = 'red';

    // draw circle line
    canvas1.stroke();

    // fill middle of circle (maybe)
    canvas1.fill();

    // take this logic and apply to each cell
    // have logic to determine if cell needs dot (comes later)

  }
}
