class Character {
    constructor() {
        this.spriteIndex = 0;
        this.characterSprites = [];
        this.totalSprites = 4;

        // The original sprite dimensions
        this.originalWidth = 448;
        this.originalHeight = 700;

        // Resize to 1/3
        this.width = this.originalWidth / 2;
        this.height = this.originalHeight / 2;

        // These x and y values should be updated in the setup method of the sketch
        this.x = 0;
        this.y = 0;
    }

    loadImages() {
        for (let i = 0; i < this.totalSprites; i++) {
            let img = loadImage(`CharacterSideIntro/sprite_${i}.png`);
            this.characterSprites.push(img);
        }
    }

    display() {
        // Drawing the image with size adjustments
        image(this.characterSprites[this.spriteIndex], this.x, this.y, this.width, this.height);
        this.spriteIndex = (this.spriteIndex + 1) % this.totalSprites; // This ensures the sprite index loops back to 0 after reaching the last sprite.
    }
}