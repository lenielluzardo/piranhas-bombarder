export class Background
{
  constructor(game)
  {
    this.game = game;
  }

  update()
  {

  }

  draw(context)
  {
    context.font = "30px Arial";
    context.fillText(this.game.ammo, 15, 30);
  }
}
