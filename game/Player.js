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
  }

  update()
  {
    if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    this.y += this.speedY;

    this.updateProjectileHandler();
    this.animateSprite();
  }

  draw(context)
  {
    // this.drawPlayerAsRectangle(context);
    this.drawPlayerAsSprite(context)

    this.projectiles.forEach(projectile => {
      projectile.draw(context);
    })
  }

  shootTop()
  {
    if (this.game.ammo > 0)
    {
      this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
      this.game.ammo--;
      console.log(this.projectiles);
    }
  }

/*
private functions
*/
  drawPlayerAsSprite(context)
  {
    if (this.game.debug) context.drawStroke(this.x, this.y.this.width, this.height);

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
  drawPlayerAsRectangle(context)
  {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  animateSprite()
  {
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
    
  }
  
  updateProjectileHandler()
  {
    this.projectiles.forEach(projectile =>
    {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter(projectiles => !projectiles.markedForDeletion);
  }
}