let squareSize = 30;
let spacing = 0;
let squares = [];
let lastBackgroundChange = 0; // Timestamp of the last background color change
let backgroundChangeInterval = 1000; // Interval between background color changes (in milliseconds)
let deletedSquares = [];
let offsetX;
let offsetY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateSquares();

  // Generate initial gradient background
  changeGradientBackground();
}

function draw() {
  // Check if it's time to change the background
  if (millis() - lastBackgroundChange >= backgroundChangeInterval) {
    changeGradientBackground();
  }

  // Draw gradient background
  setGradient(0, 0, width, height, color1, color2);

  // Draw squares
  for (let square of squares) {
    square.show();
  }

  
}

function generateSquares() {
  let cols = floor(width / (squareSize + spacing)); // Number of columns
  let rows = floor(height / (squareSize + spacing)); // Number of rows

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * (squareSize + spacing) + spacing / 2;
      let y = i * (squareSize + spacing) + spacing / 2;
      squares.push(new Square(x, y));
    }
  }
}

var k = 0;

function mousePressed() {
  //console.log("pressed")
  for (let i = squares.length - 1; i >= 0; i--) {
    if (squares[i].contains(mouseX, mouseY)) {
      // Remove the clicked square from the array
      squares.splice(i, 1);
      // console.log("x = " + squares[i].x + " y = " + squares[i].y)
      // deletedSquares[k] = squares[i].x;
      // deletedSquares[k+1] = squares[i].y;
      console.log(deletedSquares)
      k = k + 2;
      // Exit the loop after removing the square
      break;
    }
  }
}

function doubleClicked() {

  
  
console.log(mouseX + squareSize)

offsetX = mouseX % 30;
offsetY = mouseY % 30; 

squares.push(new Square(mouseX - offsetX, mouseY - offsetY));


/*
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * (squareSize + spacing) + spacing / 2;
      let y = i * (squareSize + spacing) + spacing / 2;
      squares.push(new Square(x, y));
    }
  }*/


} 

class Square {
  constructor(x, y, r = 0, g = 0, b = 0) {
    this.x = x;
    this.y = y;
    this.size = squareSize;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  show() {
    fill(this.r, this.g, this.b);
    stroke(50);
    rect(this.x, this.y, this.size, this.size);
  }

  contains(x, y) {
    return (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size);
  }
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  // Top to bottom gradient
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function changeGradientBackground() {
  lastBackgroundChange = millis(); // Update last background change timestamp
  color1 = color(random(255), random(255), random(255)); // Generate new random color
  color2 = color(random(255), random(255), random(255)); // Generate new random color
}
