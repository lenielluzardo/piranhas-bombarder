import { Projectile } from "./index.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.speedY = 0;
    this.maxSpeed = 2;
    this.projectiles = [];
    this.image = document.getElementById("player");
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;
  }

  update(deltaTime) {
    if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;

    this.verticalBoundariesHandler();

    this.updateProjectileHandler();
    this.animateSprite();

    //power up
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) this.deactivatePowerUp();
      else this.activatePowerUp(deltaTime);
    }
  }

  draw(context) {
    // this.drawPlayerAsRectangle(context);
    
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
    
    this.drawPlayerAsSprite(context);
    
  }

  /*
private functions
*/

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30),
      );
      this.game.ammo--;

      if (this.powerUp) this.shootBottom();
    }
  }

  shootBottom() {
    if(this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y+ 175))
    }
  }

  enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;

    if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
  }
  deactivatePowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = false;
    this.frameY = 0;
  }

  activatePowerUp(deltaTime) {
    this.powerUpTimer += deltaTime;
    this.frameY = 1;
    this.game.ammo += 0.1;
  }

  drawPlayerAsSprite(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);

    context.drawImage(
      this.image,
      this.frameX * this.width, //sx
      this.frameY * this.height, //sy
      this.width, //sw
      this.height, //sh
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  drawPlayerAsRectangle(context) {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  animateSprite() {
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
  }

  updateProjectileHandler() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(
      (projectiles) => !projectiles.markedForDeletion,
    );
  }

  verticalBoundariesHandler() {
    //bottom boundary
    if (this.y > this.game.height - this.height * 0.5) {
      this.y = this.game.height - this.height * 0.5
    }

    //bottom boundary
    if (this.y < -this.height * 0.5) {
      this.y = -this.height * 0.5;
    }

  }
}
