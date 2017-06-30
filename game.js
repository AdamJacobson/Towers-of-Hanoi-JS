const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor () {
    this.stacks = [[3, 2, 1], [], []];
  }

  run (gameOverCallback) {
    this.promptMove(gameOverCallback);
  }

  gameOver() {
    return (this.stacks[1].length === 3 || this.stacks[2].length === 3);
  }

  promptMove (gameOverCallback) {
    console.log(this.stacks);
    if (this.gameOver()) {
      gameOverCallback();
    } else {
      reader.question("Enter start and end columns like 'x,y'\n", (input) => {
        let [first, last] = input.split(',');
        first = parseInt(first);
        last = parseInt(last);
        this.move(first, last);
        this.promptMove(gameOverCallback);
      });
    }
  }

  move(startIdx, endIdx) {
    if (this.isValidMove(startIdx, endIdx)) {
      let disc = this.stacks[startIdx].pop();
      this.stacks[endIdx].push(disc);
      return true;
    } else {
      return false;
    }
  }

  isValidMove(startIdx, endIdx) {
    if (startIdx > 2 || endIdx > 2 ) {
      return false;
    } else if (this.stacks[startIdx].length === 0) {
      return false;
    } else if (this.stacks[startIdx].last() > this.stacks[endIdx].last()) {
      return false;
    }
    return true;
  }
}

Array.prototype.last = function last() {
  return this[this.length - 1];
};

module.exports = {
  Game, reader
};
