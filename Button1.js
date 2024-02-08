class Button1 {
    constructor() {
        this.imgNormal = null;
        this.imgHover = null;
        this.width = 3244;
        this.height = 1348;
        this.x = 0;
        this.y = 0;
        this.clicked = false; // Track if the button was clicked
        this.audio = new Audio('HooverSound.mp3'); // Adding an audio element
        this.hovered = false; // Track the hover state to prevent continuous play
    }

    loadImages() {
        this.imgNormal = loadImage("Buttons/button1normal.png");
        this.imgHover = loadImage("Buttons/button1hoover.png");
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    scaledWidth() {
        return this.width / 20;
    }

    scaledHeight() {
        return this.height / 20;
    }

    isHovered() {
        const currentlyHovered = mouseX >= this.x && mouseX <= this.x + this.scaledWidth() &&
            mouseY >= this.y && mouseY <= this.y + this.scaledHeight();

        // Play sound when hovered
        if (currentlyHovered && !this.hovered) {
            this.audio.play();
            this.hovered = true; // Set the hovered state to true to avoid multiple plays
        } else if (!currentlyHovered) {
            this.hovered = false; // Reset the hovered state when not hovered
        }

        return currentlyHovered;
    }

    // Check if the button was clicked
    wasClicked() {
        if (this.isHovered() && mouseIsPressed) {
            this.clicked = true;
            console.log('Button of start was clicked.');
        } else {
            this.clicked = false; // Reset the click state
        }

        return this.clicked;
    }

    // Reset the button click state
    resetClickState() {
        this.clicked = false;
    }

    display() {
        if (this.isHovered()) {
            image(this.imgHover, this.x, this.y, this.scaledWidth(), this.scaledHeight());
        } else {
            image(this.imgNormal, this.x, this.y, this.scaledWidth(), this.scaledHeight());
        }
    }
}

// Export the Button1 class for use in other modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Button1;
}