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

class Angler1 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("angler1");
    this.frameY = Math.floor(Math.random() * 3);
    this.lives = 2;
    this.score = this.lives;
    this.type = "angler1";
  }
}

class Angler2 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("angler2");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "angler2";
  }
}

class LuckyFish extends Enemy {
  constructor(game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("lucky");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "lucky";
  }
}

class HiveWhale extends Enemy {
  constructor(game) {
    super(game);
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("hivewhale");
    this.frameY = Math.floor(Math.random() * 0);
    this.lives = 15;
    this.score = this.lives;
    this.type = "hive";
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}

class BulbWhale extends Enemy {
  constructor(game) {
    super(game);
    this.width = 270;
    this.height = 219;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("bulbwhale");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 15;
    this.score = this.lives;
    this.type = "bulb";
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}

class Drone extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.width = 115;
    this.height = 95;
    this.x = x;
    this.y = y;
    this.image = document.getElementById("drone");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "drone";
    this.speedX = Math.random() * -4.2 - 0.5;
  }
}

class MoonFish extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.width = 227;
    this.height = 240;
    this.x = x;
    this.y = y;
    this.image = document.getElementById("moonfish");
    this.frameY = 0;
    this.lives = 10;
    this.score = this.lives;
    this.type = "moon";
    this.speedX = Math.random() * -1.2 - 2;
  }
}

export default { Angler1, Angler2, LuckyFish, HiveWhale, Drone, BulbWhale, MoonFish };

