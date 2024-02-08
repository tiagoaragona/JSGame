class GameTwo {
  constructor() {
    this.filterWidth = 45; // 15% of totalCigaretteWidth as filter
    this.tobaccoWidth = 240; // Initial tobacco width (assuming it starts full minus cherry and filter width)
    this.cherryWidth = 15; // Set cherry width
    this.totalCigaretteWidth = 300; // Set the total width for the cigarette
    this.ashWidth = 0; // Ash width starts at 0
    this.cherryColor = color(255, 0, 0); // initial red color for the cherry
    this.sprites = [];
    this.currentSpriteIndex = 0; // starting index for the sprites
    this.spriteChangeDelay = 0; // delay for sprite change, can be adjusted
    this.spriteChangeTimer = 0; // timer for sprite change
    this.button3Displayed = false; // flag for button3 display state
    this.button3 = null; // Placeholder for the button3 object
  }

  preload() {
    this.backgroundImage = loadImage('BackgroundGameTwo.png');
    for (let i = 0; i < 4; i++) {
      this.sprites.push(loadImage(`CharacterGameTwo/sprite_${i}.png`));
    }
    // Ensure Button3 class is defined in another file and that file is included before this one in your HTML
    this.button3 = new Button3(); // Create a Button3 instance
    this.button3.loadImages(); // Preload button images
  }

  setup() {
    createCanvas(800, 600);
    this.filterWidth = this.totalCigaretteWidth * 0.15; // Calculate the filter's width
    this.tobaccoWidth = this.totalCigaretteWidth - this.filterWidth - this.cherryWidth; // Calculate the initial tobacco width
  }

  draw() {
    if (this.backgroundImage) {
      background(this.backgroundImage);
    } else {
      background(220); // Default grey background
    }

    let startX = (width - this.totalCigaretteWidth) / 2;
    const cigaretteY = 40; // Fixed y for the cigarette

    // Drawing the cigarette sections
    this.drawFilter(startX, cigaretteY);
    this.drawTobacco(startX + this.filterWidth, cigaretteY);
    this.drawAsh(startX + this.filterWidth + this.tobaccoWidth, cigaretteY);

    // Always draw the cherry to ensure it remains visible
    this.drawCherry(startX + this.filterWidth + this.tobaccoWidth, cigaretteY);

    this.updateSprites();
    // Display button3 continuously once it has been flagged to display
    if (this.button3Displayed) {
      this.button3.display();
    }
  }

  updateSprites() {
    if (keyIsDown(32)) { // If space bar is pressed
      this.spriteChangeTimer++;
      if (this.spriteChangeTimer >= this.spriteChangeDelay) {
        this.currentSpriteIndex = (this.currentSpriteIndex === 3) ? 1 : this.currentSpriteIndex + 1; // Cycle between 1, 2, 3
        this.spriteChangeTimer = 0; // Reset timer
      }
      this.updateCigarette();
    } else {
      this.currentSpriteIndex = 0; // Default sprite when space bar is not pressed
      this.spriteChangeTimer = 0; // Reset timer
    }

    image(this.sprites[this.currentSpriteIndex], width / 2 - this.sprites[this.currentSpriteIndex].width / 2, 150);
  }

  updateCigarette() {
    if (this.tobaccoWidth > 0 && keyIsDown(32)) {
      this.tobaccoWidth -= 4; // Double the rate of consumption
      this.ashWidth += 4;
      this.cherryColor = color(255, 50, 20);

      // Update the cherry's position as the tobacco burns
      const startX = (width - this.totalCigaretteWidth) / 2;
      const cigaretteY = 40;
      this.drawCherry(startX + this.filterWidth + this.tobaccoWidth, cigaretteY);
    }

    this.tobaccoWidth = max(this.tobaccoWidth, 0);
    this.ashWidth = min(this.ashWidth, this.totalCigaretteWidth - this.filterWidth - this.cherryWidth);

    if (this.tobaccoWidth === 0 && !this.button3Displayed) {
      this.displayButton3();
    }
  }

  displayButton3() {
    const buttonX = 300; // Adjust the X-coordinate (30px to the right)
    const buttonY = 540; // Adjust the Y-coordinate (70px lower)

    this.button3.setPosition(buttonX, buttonY); // Update the button's position
    this.button3.display(); // Display button using Button3 class's method
    this.button3Displayed = true; // Set the flag to keep the button on the screen
  }

  drawFilter(x, y) {
    fill(255, 140, 0); // Orange for filter
    rect(x, y, this.filterWidth, 20); // Draw filter
  }

  drawTobacco(x, y) {
    noStroke();
    fill(255); // White for tobacco
    rect(x, y, this.tobaccoWidth, 20); // Draw tobacco
  }

  drawAsh(x, y) {
    noStroke();
    fill(128); // Grey for ash
    rect(x, y, this.ashWidth, 20); // Draw ash
  }

  drawCherry(x, y) {
    noStroke();
    fill(this.cherryColor); // Red for cherry
    rect(x, y, this.cherryWidth, 20); // Draw cherry
  }
}