// GameFour.js

class GameFour {
  constructor() {
     this.restartButton = new RestartButton();
    this.scoreSound;
    this.boss; // Add this line
    this.gameFont;
    this.bgImage; // variable to store the background image
    this.bgX = 0; // background x position
    this.bgSpeed = 10; // speed at which the background moves
    this.bgScaledWidth;
    this.obstacles = [];
    this.player;
    this.gameover = false;
    this.score = 0;
    this.obstacleSpeed = 10; // Initial speed of obstacles
    this.obstacleRate = 60; // Starting frame rate for generating obstacles
    this.obstacleTimer = 0; // Timer for generating obstacles
  }

  preload() {
     this.scoreSound = loadSound('HooverSound.mp3');
    Boss.preload();
    this.bgImage = loadImage('BackgroundLast.png');
    Player.preload(); // Preload images for the player using the static method
    Obstacle.preload(); 
     this.restartButton.loadImages();
  }

  setup() {
    
  this.restartButton.setPosition(width / 2 - this.restartButton.scaledWidth() / 2, height / 2 + 50);
    this.boss = new Boss();
    this.boss.init();
    this.gameFont = "Pixelify Sans"; // Use the font name
    textFont(this.gameFont); // Set the font for the canvas text
    createCanvas(800, 600); // Set the font for the canvas text
      const scaleRatio = height / this.bgImage.height; // height of canvas / height of image
    this.bgScaledWidth = this.bgImage.width * 2200;
    this.player = new Player(); // Initialize player
    this.player.init(); // Initialize player with preloaded images
    this.obstacleTimer = this.obstacleRate; // Initialize timer for the first obstacle
  }

  draw() {
if (this.gameover && mouseIsPressed) {
  if (this.restartButton.isClicked(mouseX, mouseY)) {
    this.restartGame();
  }
}
        // Move and draw the background
    this.bgX -= this.bgSpeed; // move background
    if (this.bgX <= -this.bgScaledWidth) this.bgX = 0; // reset position for looping

    // Draw the background multiple times to cover canvas width
    for (let x = this.bgX; x < width; x += this.bgScaledWidth) {
      image(this.bgImage, x, 0, this.bgScaledWidth, height);
    }
    this.boss.update();
    this.boss.display();
    this.displayBossMessage();
    // Update the player
    if (keyIsDown(UP_ARROW)) {
      this.player.jump();
    }
    this.player.update();
    this.player.display();

    // Update and display obstacles
    if (this.obstacleTimer <= 0) {
      this.obstacles.push(new Obstacle(this.obstacleSpeed)); // Add new obstacle
      this.obstacleTimer = this.obstacleRate + floor(random(1, 4)) * 15; // Randomize next obstacle appearance
    } else {
      this.obstacleTimer--; // Decrease timer
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
  this.obstacles[i].update();
  this.obstacles[i].display();

  if (this.player.hits(this.obstacles[i])) {
    this.gameover = true;
  }

  // Only increase score if the game is not over
  if (!this.gameover && this.obstacles[i].isOffScreen()) {
    this.obstacles.splice(i, 1);
    this.score++;
    this.scoreSound.play();
    if (this.score % 10 === 0) {
      this.obstacleSpeed++;
    }
  }
}

    this.displayScore();

    // Display game over message
if (this.gameover) {
      this.displayGameOver();
      this.restartButton.display(); // Display the restart button
      console.log("Displaying Restart Button at", 
                  this.restartButton.x, 
                  this.restartButton.y, 
                  "with size", 
                  this.restartButton.scaledWidth(), 
                  this.restartButton.scaledHeight());
    }
  }
   
 restartGame() {
    // Reset game-specific states, if needed for internal logic
    this.gameover = false;
    this.score = 0;
    this.obstacles = [];
    this.player = new Player();
    this.player.init();
  }
  
mousePressed() {
  if (this.gameover && this.restartButton.isClicked(mouseX, mouseY)) {
    this.restartGame();
  }
}
  
  displayBossMessage() {
    textAlign(CENTER, TOP); // Center align text horizontally, anchor at the top
    textSize(20); // Set text size
    fill(255); // Set text color (white in this case)

    // Break the message into three lines
    text("Chase your boss for the payment", width / 2, 20);
    text("on the project you finished", width / 2, 50); // Adjust Y-coordinate for the second line
    text("3 months ago", width / 2, 80); // Adjust Y-coordinate for the third line
  }
  
  displayScore() {
    fill(0);
    textSize(20); // Apply the font
    text(`Score: ${this.score}`, 100, 30);
  }

  displayGameOver() {
    fill(250);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
  }

  keyPressed() {
    if (key === ' ') {
      this.player.jump();
    }
  }
 
}

class Player {
  constructor() {
    this.spriteWidth = 448 / 4; // Half the original width
    this.spriteHeight = 700 / 4; // Half the original height
    this.collisionMargin = 60; // Total of 20 pixels less for width to account for margin
    this.collisionBoxWidth = this.spriteWidth - this.collisionMargin; // Collision box width
    // Calculate collision box height if needed with margin, assuming margin is only horizontal for now
    this.collisionBoxHeight = this.spriteHeight; 
    this.y = height - this.spriteHeight;
    this.x = 50;
    this.velocityY = 10;
    this.gravity = 2;
    this.animation = []; // Animation frames will be loaded here
    this.frame = 0;
    this.animationSpeed = 1;
    this.currentFrame = 0;
  }

  static preload() {
    // Static method to load images
    Player.animationFrames = []; // Static array to hold images
    Player.animationFrames[0] = loadImage('CharacterSideIntro/sprite_1.png');
    Player.animationFrames[1] = loadImage('CharacterSideIntro/sprite_2.png');
    Player.animationFrames[2] = loadImage('CharacterSideIntro/sprite_3.png');
  }

  // Initialize player with preloaded frames
  init() {
    this.animation = Player.animationFrames;
  }

  jump() {
    if (this.y === height - this.spriteHeight) {
      this.velocityY = -25;
    }
  }

  hits(obstacle) {
    // The x position is increased by half the margin to center the collision box
    let collisionX = this.x + (this.collisionMargin / 2);
    // The y position for collision is the same as the y position for the sprite
    let collisionY = this.y; 
    // AABB collision detection using the collision box's position and size
    let hit = collideRectRect(collisionX, collisionY, 
                              this.collisionBoxWidth, this.collisionBoxHeight, 
                              obstacle.x, obstacle.y, obstacle.size, obstacle.size);
    return hit;
  }

  update() {
    this.velocityY += this.gravity; // Apply gravity
    this.y += this.velocityY; // Apply velocity
    this.y = constrain(this.y, 0, height - this.spriteHeight); // Constrain to ground

    // Animation frame update
    this.frame += this.animationSpeed;
    if (this.frame >= this.animation.length) {
      this.frame = 0; // Loop back to the first frame
    }
    this.currentFrame = floor(this.frame); // Current frame based on speed
  }
  display() {
    // Display the current animation frame at half the original size
    image(this.animation[this.currentFrame], this.x, this.y, this.spriteWidth, this.spriteHeight);
  }
}
class Obstacle {
  static preload() {
    Obstacle.image = loadImage('PC.png');
  }
  constructor(speed) {
    this.size = 50;
    this.x = width;
    this.y = height - this.size;
    this.speed = speed;
  }

  update() {
    this.x -= this.speed; // Move obstacle
  }

display() {
    image(Obstacle.image, this.x, this.y, this.size, this.size); // Adjust size if necessary
  }

  isOffScreen() {
    return this.x < -this.size; // Check if past left edge
  } 
}

function keyPressed() {
  // Delegate the keyPressed event to the GameFour instance when in the 'gameFour' state
  if (currentState === 'gameFour') {
    scene5.keyPressed();
  }
}
class Boss {
  constructor() {
this.spriteWidth = 256 / 2.4;
    this.spriteHeight = 400 / 2.4;
    this.x = width - this.spriteWidth - 30;
    this.y = height - this.spriteHeight; // Adjusted Y-coordinate
    this.animation = [];
    this.frame = 0;
    this.animationSpeed = 1;
  }

  static preload() {
    Boss.animationFrames = [];
    for (let i = 0; i < 4; i++) {
      Boss.animationFrames[i] = loadImage(`Boss/Boss2${i}.png`);
    }
  }

 init() {
  this.animation = Boss.animationFrames;
}
  update() {
    this.frame += this.animationSpeed;
    if (this.frame >= this.animation.length) {
      this.frame = 0;
    }
  }

  display() {
console.log("Displaying Boss at", this.x, this.y, "with size", this.spriteWidth, this.spriteHeight);
  // Rest of the code...
  image(this.animation[floor(this.frame)], this.x, this.y, this.spriteWidth, this.spriteHeight);
  }
}