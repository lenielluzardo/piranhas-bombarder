import { UI, Player, InputHandler, Background, Enemy, Particle, Effects, SoundController } from "./index.js";
const { Angler1, Angler2, LuckyFish, HiveWhale, Drone, BulbWhale, MoonFish } = Enemy;
const { SmokeExplosion, FireExplosion, Shield} = Effects;
export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.background = new Background(this);
    this.inputHandler = new InputHandler(this);
    this.ui = new UI(this);
    this.sound = new SoundController();
    this.shield = new Shield(this);
    this.keys = [];
    this.enemies = [];
    this.particles = [];
    this.explosions = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 10;
    this.gameTime = 0;
    this.timeLimit = 99000;
    this.speed = 1;
    this.debug = false;
  }

  update(deltaTime) {
    this.checkGameTimeLimit(deltaTime);

    this.player.update(deltaTime);
    this.background.update();
    this.background.layer4.update();

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.shield.update(deltaTime);

    //Particles
    this.particles.forEach(particle => particle.update());
    this.particles = this.particles.filter(particle => !particle.markedForDeletion)

    //Explosions
    this.explosions.forEach(explosion => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion)

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;

        this.addExplosion(enemy);
        this.sound.hit();
        this.shield.reset();
        this.sound.shield();

        // Show 10 particles when enemy is destroyed.
        for (let i = 0; i < enemy.lives; i++){
            this.particles.push(new Particle(this,
                                            enemy.x + enemy.width * 0.5,
                                            enemy.y + enemy.height * 0.5))
        }

        if (enemy.type === "lucky") this.player.enterPowerUp();
        else if (!this.gameOver) this.score--;
      }

      // Checks collision with projectiles
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;

          // Show one particle only when enemy get hit by projectile
          this.particles.push(new Particle(this,
                                            enemy.x + enemy.width * 0.5,
                                            enemy.y + enemy.height * 0.5))
          
          if (enemy.lives <= 0) this.destroyEnemy(enemy);
            
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw(context) {
    this.background.draw(context);
    this.ui.draw(context);
    this.player.draw(context);
    this.shield.draw(context);
    this.particles.forEach(particle => particle.draw(context));

    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });

    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });
    this.background.layer4.draw(context);
  }

  addEnemy() {
    let enemy = {};
    const randomize = Math.random();
    if (randomize < 0.3) enemy = new Angler1(this);
    else if (randomize < 0.6) enemy = new Angler2(this);
    else if (randomize < 0.7) enemy = new HiveWhale(this);
    else if (randomize < 0.8) enemy = new BulbWhale(this);
    else if (randomize < 0.9) enemy = new MoonFish(this);
    else enemy = new LuckyFish(this);

    this.enemies.push(enemy);
  }

  addExplosion(enemy) {
    const randomize = Math.random();
    if (randomize < 0.5 ) {
      this.explosions.push(
        new SmokeExplosion(this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5));
    }
    else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5,
        ),
      );
    }
  }

  destroyEnemy(enemy)
  {
    enemy.markedForDeletion = true;

    this.addExplosion(enemy);
    this.sound.explosion();

    if (enemy.type === "moon") this.player.enterPowerUp();

    if (enemy.type === "hive") {
      for (let i = 0; i < 5; i++)
      {
        this.enemies.push(new Drone(this,
          enemy.x + Math.random() * enemy.width,
          enemy.y + Math.random() * enemy.height * 0.5));
      }
    }

    // Increases score when enemy is killed.
    if (!this.gameOver) this.score += enemy.score;

    // Checks if player has won. By comparing scored points.
    // if (this.score >= this.winningScore) this.gameOver = true;
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  checkGameTimeLimit(deltaTime) {
    if (!this.gameOver) this.gameTime += deltaTime;

    if (this.gameTime > this.timeLimit) this.gameOver = true;
  }
}
