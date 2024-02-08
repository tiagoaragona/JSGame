// sketch.js

// Declare global variables for the scenes and the current state
let scene1, scene2, scene3, scene4, scene5;
let currentState = "game"; // Set the initiate as 'gameThree'
let gameThreeInitialized = false;
let gameFourInitialized = false;

function preload() {
  // Preload assets for each scene
  scene1 = new Game(); // Ensure this class is defined
  scene1.preload();

  scene2 = new GameOne(); // Ensure this class is defined
  scene2.preload();

  scene3 = new GameTwo(); // Ensure this class is defined
  scene3.preload();

  // Create an instance of GameThree (scene4)
  scene4 = new GameThree(); // This class should be defined in GameThree.js
  // Preloading for GameThree will be done in the draw function

  // GameFour instance will be created when needed
}

function setup() {
  createCanvas(800, 600); // Adjust the canvas size as needed

  // Call setup for each scene except GameThree and GameFour
  scene1.setup();
  scene2.setup();
  scene3.setup();
  // Setup for GameThree and GameFour will be called based on the state
}

function draw() {
   console.log("Current State: ", currentState);
  background(220); // Clear the background

  // Check the current state and call the draw method of the corresponding scene
  switch (currentState) {
    case "game":
      scene1.draw();
      break;
    case "gameOne":
      scene2.draw();
      break;
    case "gameTwo":
      scene3.draw();
      break;
    case "gameThree":
      if (!gameThreeInitialized) {
        scene4.preload();
        gameThreeInitialized = true;
      }
      scene4.draw();
      break;
    case "gameFour":
      if (!gameFourInitialized) {
        scene4.removeChatInterface();
        scene5 = new GameFour();
        scene5.preload();
        scene5.setup();
        gameFourInitialized = true;
      }
      scene5.draw();
      break;
  }
}

function mousePressed() {
  // Delegate the mousePressed event to the appropriate scene based on the current state
  switch (currentState) {
    case "game":
      if (scene1.button1 && scene1.button1.isHovered()) {
        // Ensure this method exists on the button
        currentState = "gameOne";
      }
      break;
    case "gameOne":
      if (scene2 && scene2.mousePressed) {
        // Check if the method exists before calling
        scene2.mousePressed();
      }
      break;
    case "gameTwo":
      // Update the condition to ensure button3 is both visible and clicked
      if (scene3.button3Displayed && scene3.button3.isClicked()) {
        currentState = "gameThree";
        console.log("Game3 Scene is being drawn");
      }
      break;
    case "gameThree":
      if (scene4.button3 && scene4.button3.isClicked()) {
        scene4.removeChatInterface(); // Remove chat interface
        currentState = "gameFour"; // Change state
      }
      break;
      
    case "gameFour":
      // Check if the game is over and the restart button is clicked
      if (scene5.gameover && scene5.restartButton.isClicked(mouseX, mouseY)) {
        restartToScene1();
      }
      break;
  }
}

function mouseDragged() {
  // Delegate mouseDragged event to the current scene based on currentState
  if (currentState === "gameOne" && scene2.mouseDragged) {
    scene2.mouseDragged();
  }
  // Add cases for other states if they have mouseDragged events
}

function mouseReleased() {
  // Delegate mouseReleased event to the current scene based on currentState
  if (currentState === "gameOne" && scene2.mouseReleased) {
    scene2.mouseReleased();
  }
  // Add cases for other states if they have mouseReleased events
}
function restartToScene1() {
  currentState = "game";
  gameThreeInitialized = false;
  gameFourInitialized = false;

  // Reset GameOne (scene2)
  if (scene2) {
    scene2.currentState = 0;
    scene2.mateImage = loadImage('Mate.png'); // Reset the mate image
    // Reset positions and dragging states
    scene2.mateX = 250;
    scene2.mateY = 120;
    scene2.yerbaX = 200;
    scene2.yerbaY = 480;
    scene2.waterX = 320;
    scene2.waterY = 480;
    scene2.bombillaX = 470;
    scene2.bombillaY = 460;
    scene2.isDraggingMate = false;
    scene2.isDraggingYerba = false;
    scene2.isDraggingWater = false;
    scene2.isDraggingBombilla = false;
    // Add any additional resets needed for GameOne
  }

  // Reset GameTwo (scene3)
  if (scene3) {
    scene3.totalCigaretteWidth = 300; 
    scene3.ashWidth = 0;
    scene3.tobaccoWidth = scene3.totalCigaretteWidth - scene3.filterWidth - scene3.cherryWidth; // Reset the tobacco width
    scene3.button3Displayed = false; // Reset the button display state
    // Add any additional resets needed for GameTwo
  }

  // Reset GameThree (scene4)
  if (scene4) {
    scene4.conversationState = "client"; // Reset the conversation state
    scene4.removeChatInterface(); // Remove chat interface
    // Reset any other variables or states in GameThree
  }

  // Reset GameFour (scene5)
  if (scene5) {
    scene5.gameover = false;
    scene5.score = 0;
    scene5.obstacles = [];
    scene5.player = new Player();
    scene5.player.init();
    // Reset other relevant state variables in GameFour
  }
}