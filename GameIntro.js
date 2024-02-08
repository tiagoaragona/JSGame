// Define the Game class
class Game {
  constructor() {
    this.gameMusic
    this.character;
    this.bgImg;
    this.button1;
    this.button2;
    this.introTextImg;
    this.bgX1 = 0;
    this.bgX2;
    this.bgSpeed = 10;
  }

  preload() {
    this.character = new Character();
    this.character.loadImages();
    this.bgImg = loadImage("backg.png");
    this.button1 = new Button1();
    this.button1.loadImages();
    this.gameMusic = loadSound('FX30.mp3');
    this.gameMusic.setVolume(0.2);
    this.button2 = new Button2();
    this.button2.loadImages();

    this.introTextImg = loadImage("introtext.png");
  }

  setup() {
    createCanvas(800, 600);
    background(0);
    frameRate(10);
   this.gameMusic.loop();
    // Center the character
    this.character.x = (width - this.character.width) / 2 - 275;
    this.character.y = (height - this.character.height) / 2 + 90;

    // Initialize the second background's position to the right edge of the first one
    this.bgX2 = this.bgImg.width * (height / this.bgImg.height);

    // Positioning the buttons
    this.button2.setPosition(width - this.button2.scaledWidth() - 50, height - this.button2.scaledHeight() - 50);
    this.button1.setPosition(this.button2.x - this.button1.scaledWidth() - 20, height - this.button1.scaledHeight() - 50);
  }

  draw() {
    
    console.log('Game Scene is being drawn');
    // Scrolling background logic:
    image(this.bgImg, this.bgX1, 0, this.bgImg.width * (height / this.bgImg.height), height);
    image(this.bgImg, this.bgX2, 0, this.bgImg.width * (height / this.bgImg.height), height);

    this.bgX1 -= this.bgSpeed;
    this.bgX2 -= this.bgSpeed;

    if (this.bgX1 < -this.bgImg.width * (height / this.bgImg.height)) {
      this.bgX1 = this.bgX2 + this.bgImg.width * (height / this.bgImg.height);
    }

    if (this.bgX2 < -this.bgImg.width * (height / this.bgImg.height)) {
      this.bgX2 = this.bgX1 + this.bgImg.width * (height / this.bgImg.height);
    }

    // Display character
    this.character.display();

    // Display buttons
    this.button1.display();
    this.button2.display();

    // Display intro text, taking into account the specified image dimensions
    image(this.introTextImg, width - 367 - 50, 50, 367, 103);
  }
}

// Create an instance of the Game class
let game;

// Preload function for p5.js
function preload() {
  game = new Game();
  game.preload();
}

// Setup function for p5.js
function setup() {
  game.setup();
}

// Draw function for p5.js
function draw() {
  game.draw();
}