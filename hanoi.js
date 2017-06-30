const { Game, reader } = require("./game");

let game = new Game();
const gameOverCallback = () => {
  reader.question("Game Over. Play again?\n", (input) => {
    if (input === 'yes') {
      game = new Game();
      game.run(gameOverCallback);
    } else {
      reader.close();
    }
  });
};

game.run(gameOverCallback);
