const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const formView = document.getElementById("form-view");
const gameView = document.getElementById("game-view");
const board = document.getElementById("board");
const message = document.querySelector(".message");
const resetBtn = document.getElementById("reset");
let players = {};
let currentPlayer;
let gameOver = false;
const winCombos = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();
  if (!p1 || !p2) {
    alert('Please enter both player names!');
    return;
  }
  players = { X: p1, O: p2 };
  currentPlayer = "X";
  formView.classList.add("hidden");
  gameView.classList.remove("hidden");
  startGame();
});

resetBtn.addEventListener('click', () => {
  gameOver = false;
  currentPlayer = "X";
  message.textContent = `${players[currentPlayer]}, you're up!`;
  createBoard();
});

function startGame() {
  gameOver = false;
  message.textContent = `${players[currentPlayer]}, you're up!`;
  createBoard();
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", i);
    cell.addEventListener("click", handlerMove, { once: true });
    board.appendChild(cell);
  }
}

function handlerMove(e) {
  if (gameOver) return;
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    message.textContent = `${players[currentPlayer]} congratulations you won!`;
    gameOver = true;
    return;
  }
  if (isDraw()) {
    message.textContent = "It's a draw!";
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `${players[currentPlayer]}, you're up!`;
}

function checkWin() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < winCombos.length; i++) {
    const combo = winCombos[i];
    let win = true;
    for (let j = 0; j < combo.length; j++) {
      const idx = combo[j] - 1;
      if (cells[idx].textContent !== currentPlayer) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  return !checkWin();
}

