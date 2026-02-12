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
  }
}

class Angler2 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("angler2");
    this.frameY = Math.floor(Math.random() * 3);
    this.lives = 3;
    this.score = this.lives;
  }
}

class LuckyFish extends Enemy {
  constructor(game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("lucky");
    this.frameY = Math.floor(Math.random() * 3);
    this.lives = 3;
    this.score = this.lives;
  }
}
export default { Angler1, Angler2, LuckyFish }