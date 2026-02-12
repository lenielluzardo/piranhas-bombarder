export class InputHandler {
  inputKeys = [
    "ArrowUp",
    "ArrowDown"
  ]

  constructor(game) {
    this.game = game;
    this.addEventListeners();
    
  }

  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      let keyIndex = this.game.keys.indexOf(e.key);

      if (( this.inputKeys.includes(e.key)) && keyIndex === -1) {
        this.game.keys.push(e.key);
      }
      if (e.key === "d")
      {
        this.game.debug = !this.game.debug;
      }
      else if (e.key === " ")
      {
        this.game.player.shootTop();
      }

      console.log(this.game.keys);
    });

    window.addEventListener("keyup", e => {
      let keyIndex = this.game.keys.indexOf(e.key);

      if (keyIndex > -1) {
        this.game.keys.splice(keyIndex, 1);
      }

      console.log(this.game.keys);

    });
  }
}
