import { Game } from "./game/Game.js"

window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  // game instatiation
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;


  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    
    // console.log(deltaTime);
    
    lastTime = timeStamp;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    window.requestAnimationFrame(animate);
    
  }
  
  animate(0);

});