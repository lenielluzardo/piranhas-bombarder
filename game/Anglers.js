import { Enemy } from "./Enemy.js";

class Angler1 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
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
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("angler2");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "angler2"
  }
}

class LuckyFish extends Enemy {
  constructor(game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("lucky");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "lucky";
  }
}
export default { Angler1, Angler2, LuckyFish }