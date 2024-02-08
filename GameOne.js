class GameOne {
  constructor() {
    // Initialize the images as empty initially
    this.SuccessSound;
    this.mateImage = null;
    this.yerbaImage = null;
    this.waterImage = null;
    this.bombillaImage = null;
    this.textImage = null; // Add text image

    // Set initial positions for each image
    this.mateX = 250;
    this.mateY = 120;
    this.yerbaX = 200;
    this.yerbaY = 480;
    this.waterX = 320;
    this.waterY = 480;
    this.bombillaX = 470;
    this.bombillaY = 460;

    // Dragging state for each image
    this.isDraggingMate = false;
    this.isDraggingYerba = false;
    this.isDraggingWater = false;
    this.isDraggingBombilla = false;
    this.offsetX = 0;
    this.offsetY = 0;

    // Flag to track the current state
    this.currentState = 0;
    
    this.button3;
    this.rotatingImage = null;
  }

  preload() {
    this.SuccessSound = loadSound('HooverSound.mp3');
    // Load the images
    this.mateImage = loadImage('Mate.png');
    this.yerbaImage = loadImage('Yerba.png');
    this.waterImage = loadImage('Water.png');
    this.bombillaImage = loadImage('Bombilla.png');
    this.textImage = loadImage('Text2.png'); // Load the text image
    this.button3 = new Button3();
    this.button3.loadImages();
    this.rotatingImage = loadImage('Rotating.png');
  }

  setup() {
    // Set up any initial configuration for your scene here
    createCanvas(800, 600);
  }

  draw() {
     console.log("Drawing scene1");
    // Clear the background
    background(0);
    
    // Calculate the position for the top-center alignment with a 20px margin
    const centerX = width / 2;
    const topMargin = 20;

    // Draw the "Text2.png" image at the top-center position and scale it to half size
    if (this.textImage) {
      image(this.textImage, centerX - this.textImage.width * 0.25, topMargin, this.textImage.width * 0.5, this.textImage.height * 0.5);
    }

    // Check if the images are loaded before drawing
    if (
      this.mateImage &&
      this.yerbaImage &&
      this.waterImage &&
      this.bombillaImage
    ) {
      // Draw each image at its current position with scaling
      image(this.mateImage, this.mateX, this.mateY, this.mateImage.width, this.mateImage.height);
      image(this.yerbaImage, this.yerbaX, this.yerbaY, this.yerbaImage.width * 0.5, this.yerbaImage.height * 0.5); // Scale to half size
      image(this.waterImage, this.waterX, this.waterY, this.waterImage.width * 0.5, this.waterImage.height * 0.5); // Scale to half size
      image(this.bombillaImage, this.bombillaX, this.bombillaY, this.bombillaImage.width * 0.3, this.bombillaImage.height * 0.3); // Scale to half size
    }

    // Check for collision between "mate" and "yerba" (State 1)
    if (
      this.currentState === 0 &&
      this.mateX + this.mateImage.width > this.yerbaX &&
      this.mateX < this.yerbaX + this.yerbaImage.width * 0.5 &&
      this.mateY + this.mateImage.height > this.yerbaY &&
      this.mateY < this.yerbaY + this.yerbaImage.height * 0.5
    ) {
      // Change "mate" image to Mate2.png
      this.SuccessSound.play();
      this.mateImage = loadImage('Mate2.png');
      this.currentState = 1;
    }

    // Check for collision between "mate" and "bombilla" (State 2)
    if (
      this.currentState === 1 &&
      this.mateX + this.mateImage.width > this.bombillaX &&
      this.mateX < this.bombillaX + this.bombillaImage.width * 0.5 &&
      this.mateY + this.mateImage.height > this.bombillaY &&
      this.mateY < this.bombillaY + this.bombillaImage.height * 0.5
    ) {
      // Change "mate" image to Mate3.png
      this.SuccessSound.play();
      this.mateImage = loadImage('Mate3.png');
      this.currentState = 2;
    }

    // Check for collision between "mate" and "water" (State 3)
    if (
      this.currentState === 2 &&
      this.mateX + this.mateImage.width > this.waterX &&
      this.mateX < this.waterX + this.waterImage.width * 0.5 &&
      this.mateY + this.mateImage.height > this.waterY &&
      this.mateY < this.waterY + this.waterImage.height * 0.5
    ) {
      // Change "mate" image to Mate4.png
      this.SuccessSound.play();
      this.mateImage = loadImage('Mate4.png');
      this.currentState = 3;
    }
  if (
      this.currentState === 3
    ) {
  this.button3.display();
      
    }
    if (this.currentState === 3 && this.rotatingImage) {
      // The rotating image should be drawn first so it appears behind the mate image
      image(this.rotatingImage, this.mateX, this.mateY, this.rotatingImage.width, this.rotatingImage.height);
    }

    // Then draw the mate image and other images as before
    if (this.mateImage) {
      image(this.mateImage, this.mateX, this.mateY, this.mateImage.width, this.mateImage.height);
    }
  }

  // Mouse Pressed Event
  mousePressed() {
    // Check if the mouse is pressed on the "yerba" image
    if (
      mouseX > this.yerbaX &&
      mouseX < this.yerbaX + this.yerbaImage.width * 0.5 &&
      mouseY > this.yerbaY &&
      mouseY < this.yerbaY + this.yerbaImage.height * 0.5
    ) {
      // Enable dragging for the "yerba" image
      this.isDraggingYerba = true;
      this.offsetX = mouseX - this.yerbaX;
      this.offsetY = mouseY - this.yerbaY;
    }

    // Check if the mouse is pressed on the "bombilla" image
    if (
      mouseX > this.bombillaX &&
      mouseX < this.bombillaX + this.bombillaImage.width * 0.5 &&
      mouseY > this.bombillaY &&
      mouseY < this.bombillaY + this.bombillaImage.height * 0.5
    ) {
      // Enable dragging for the "bombilla" image
      this.isDraggingBombilla = true;
      this.offsetX = mouseX - this.bombillaX;
      this.offsetY = mouseY - this.bombillaY;
    }

    // Check if the mouse is pressed on the "water" image
    if (
      mouseX > this.waterX &&
      mouseX < this.waterX + this.waterImage.width * 0.5 &&
      mouseY > this.waterY &&
      mouseY < this.waterY + this.waterImage.height * 0.5
    ) {
      // Enable dragging for the "water" image
      this.isDraggingWater = true;
      this.offsetX = mouseX - this.waterX;
      this.offsetY = mouseY - this.waterY;
    }
    if (this.currentState === 3 && this.button3.isHovered()) {
    // Assuming isHovered() is a method of button3 that checks if the mouse is over button3
    this.nextState(); // Call a method to handle transitioning to gameTwo
  }
  }
  nextState() {
  currentState = 'gameTwo'; // Update the global currentState to 'gameTwo'
  // Perform other state transition related tasks if necessary
}

  // Mouse Dragged Event
  mouseDragged() {
    // If the "yerba" image is being dragged, update its position
    if (this.isDraggingYerba) {
      this.yerbaX = mouseX - this.offsetX;
      this.yerbaY = mouseY - this.offsetY;
    }

    // If the "bombilla" image is being dragged, update its position
    if (this.isDraggingBombilla) {
      this.bombillaX = mouseX - this.offsetX;
      this.bombillaY = mouseY - this.offsetY;
    }

    // If the "water" image is being dragged, update its position
    if (this.isDraggingWater) {
      this.waterX = mouseX - this.offsetX;
      this.waterY = mouseY - this.offsetY;
    }
  }

  // Mouse Released Event
mouseReleased() {
  // Check if any of these elements were being dragged
  if (this.isDraggingYerba) {
    // Reset the position to its original
    this.yerbaX = 200; // Original X position
    this.yerbaY = 480; // Original Y position
  }
  if (this.isDraggingBombilla) {
    // Reset the position to its original
    this.bombillaX = 470; // Original X position
    this.bombillaY = 460; // Original Y position
  }
  if (this.isDraggingWater) {
    // Reset the position to its original
    this.waterX = 320; // Original X position
    this.waterY = 480; // Original Y position
  }

  // Stop dragging for all images
  this.isDraggingYerba = false;
  this.isDraggingWater = false;
  this.isDraggingBombilla = false;
}
}