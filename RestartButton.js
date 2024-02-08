class RestartButton {
    constructor() {
        this.imgNormal = null;
        this.width = 1517; // Original width
        this.height = 337; // Original height
        this.x = 0;
        this.y = 0;
        this.audio = new Audio('HooverSound.mp3'); // Create an audio object for hover sound
        this.hovered = false; // State to track if we've already played the sound
    }

    loadImages() {
        this.imgNormal = loadImage("RestartButton.png");
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    scaledWidth() {
        return this.width / 10;
    }

    scaledHeight() {
        return this.height / 10;
    }

    isHovered() {
        const currentlyHovered = mouseX >= this.x && mouseX <= this.x + this.scaledWidth() &&
                                 mouseY >= this.y && mouseY <= this.y + this.scaledHeight();
        
        // Check the hover state to play the sound once
        if (currentlyHovered && !this.hovered) {
            this.audio.play(); // Play the hover sound
            this.hovered = true;
        } else if (!currentlyHovered) {
            this.hovered = false;
        }

        return currentlyHovered;
    }

    isClicked() {
        // The button is considered clicked if the mouse coordinates are within its area when the mouse button is pressed
        return this.isHovered() && mouseIsPressed;
    }

    display() {
        // Display the image
        if (this.imgNormal) {
            image(this.imgNormal, this.x, this.y, this.scaledWidth(), this.scaledHeight());
        }
    }
}