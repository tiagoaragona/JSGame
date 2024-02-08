class gameButton {
    constructor(imgNormal, imgHover, xPosition, scaleFactor) {
        this.normalImg = loadImage(imgNormal);
        this.hoverImg = loadImage(imgHover);
        this.currentImg = this.normalImg;
        this.scaleFactor = scaleFactor;
        this.width = this.normalImg.width * this.scaleFactor;
        this.height = this.normalImg.height * this.scaleFactor;
        this.x = xPosition;
        this.y = height - this.height - 10;
    }

    update() {
        if (mouseIsPressed && mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
            window.location.href = "#";  // Add your desired link here
        } else if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
            this.currentImg = this.hoverImg;
        } else {
            this.currentImg = this.normalImg;
        }
    }

    display() {
        image(this.currentImg, this.x, this.y, this.width, this.height);
    }
}