class Button2 {
    constructor() {
        this.imgNormal = null;
        this.imgHover = null;
        this.width = 1392;
        this.height = 1336;
        this.x = 0;
        this.y = 0;
        this.audio = new Audio('HooverSound.mp3'); // Create an audio object for hover sound
        this.hovered = false; // State to track if we've already played the sound
    }

    loadImages() {
        this.imgNormal = loadImage("Buttons/button2normal.png");
        this.imgHover = loadImage("Buttons/button2hoover.png");
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

        // Check the hover state to play the sound once
        if (currentlyHovered && !this.hovered) {
            this.audio.play(); // Play the hover sound
            this.hovered = true;
        } else if (!currentlyHovered) {
            this.hovered = false;
        }

        return currentlyHovered;
    }

    display() {
        // Display the correct image based on hover state
        if (this.isHovered()) {
            image(this.imgHover, this.x, this.y, this.scaledWidth(), this.scaledHeight());
        } else {
            image(this.imgNormal, this.x, this.y, this.scaledWidth(), this.scaledHeight());
        }
    }
}