export class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
    this.lives = 5;
    this.score = this.lives;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
  }

  update() {
    this.x += this.speedX;
    if (this.x + this.width < 0) this.markedForDeletion = true;

    //sprite animation
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
  }

  draw(context) {
    context.fillStyle = "red";
    // context.fillStyle = "black";
    // context.fillRect(this.x, this.y, this.width, this.height);
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);

    context.drawImage(
      this.image,
      this.frameX * this.width, //source x
      this.frameY * this.height, //source y
      this.width, //source width
      this.height, //source height
      this.x,
      this.y,
      this.width,
      this.height,
    );

    // enemy lives
    if (this.game.debug) {
      context.font = "15px Helvetica";
      context.fillText(this.lives, this.x, this.y);
    }
  }
}
