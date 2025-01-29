const cells = document.querySelectorAll('.board__items');
const resetButton = document.querySelector('.board__reset-button');
const boardBody = document.querySelector('.board__body');
const innerInfo = document.querySelector('.board__info');
const winner = document.querySelector('.board__winner-content');

const players = {
  x: 'X',
  o: 'O',
};
let currentPlayer = '';
let runGame = false;
let boardArray = Array(9).fill('');
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

function listenersToElOnBoard() {
  cells.forEach((board__items) => {
    board__items.addEventListener('click', clickCell);
  });
  resetButton.addEventListener('click', restartGame);
}

function startGame() {
  runGame = true;
  winner.style.display = 'none';
  cells.forEach((board__items) => (board__items.textContent = ''));
  currentPlayer = players.x;
  boardBody.after(innerInfo);
  innerInfo.textContent = `${currentPlayer}, your move!`;
  boardArray = Array(9).fill('');
  // checkLine();
  winner.after(resetButton);
  resetButton.textContent = 'New game';
}

function clickCell() {
  if (!runGame) {
    return;
  }
  if (this.textContent) {
    return;
  }
  this.textContent = currentPlayer;
  const cellIndex = this.dataset.itemIndex;
  boardArray[cellIndex] = currentPlayer;
  currentPlayer = currentPlayer === players.x ? players.o : players.x;
  innerInfo.textContent = `${currentPlayer}, your move!`;
  if (checkGameOver()) {
    return finishGame(/*setTimeout(() => restartGame(), 1000)*/);
  }
}
//------------------------
function checkLine(line) {
  // winner.after(resetButton);
  // resetButton.textContent = 'New game';
  const [a, b, c] = line;

  const cellA = boardArray[a];
  const cellB = boardArray[b];
  const cellC = boardArray[c];

  if ([cellA, cellB, cellC].includes('')) {
    return false;
  }
  return cellA === cellB && cellB === cellC;
}

function checkGameOver() {
  for (const line of winCombinations) {
    if (checkLine(line)) {
      const winnigPlayer = boardArray[line[0]];

      winner.textContent = `${winnigPlayer} won ! Well done.`;
      winner.style.display = 'block';
      return true;
    }
  }
  if (!boardArray.includes('')) {
    winner.textContent = 'Friendship won!';
    winner.style.display = 'block';
    return true;
  }
}

function finishGame() {
  runGame = false;
  innerInfo.remove();
}

function restartGame() {
  startGame();
}

window.addEventListener('load', () => listenersToElOnBoard());
/**/
