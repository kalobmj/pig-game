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
    // const color = isEven ? "#00637C" : "#2A2B2D";
    const color = '#00637C'

    console.log({ isEven });
    console.log({ color });

    canvas1.fillStyle = color;
    canvas1.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);

    canvas1.strokeStyle = "rgba(0, 0, 0, 0)";
    canvas1.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize)
    
    // making circle (dot in dice)
    // canvas1.beginPath();
    // canvas1.arc(100, 75, 50, 0, 2 * Math.PI);
    // ctx.stroke();
    
    canvas2.fillStyle = color;
    canvas2.fillRect(j * cellsize, i * cellsize, cellsize, cellsize);
    
    canvas2.strokeStyle = "rgba(1, 1, 1, 0)";
    canvas2.strokeRect(j * cellsize, i * cellsize, cellsize, cellsize)

  }
}
