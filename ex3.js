const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

let currentPlayer = 'x';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin(player) {
    return winConditions.some(condition => {
        return condition.every(index => {
            return cells[index].classList.contains(player);
        });
    });
}

function handleClick(event) {
    const cell = event.target;
    const index = [...cells].indexOf(cell);

    if (cell.classList.contains('x') || cell.classList.contains('o')) return;

    cell.classList.add(currentPlayer);
    boardState[index] = currentPlayer;

    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer.toUpperCase()} Wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (boardState.every(cell => cell)) {
        message.textContent = 'It\'s a Draw!';
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        message.textContent = `${currentPlayer.toUpperCase()}'s Turn`;
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick);
    });
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    message.textContent = 'X\'s Turn';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);


resetGame();
