"use strict";
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restart = document.getElementById('restart');
let currentPlayer;
let gameActive;
let board = ['', '', '', '', '', '', '', '', ''];
const turnMessage = document.getElementById('player-turn');
function resetGameState() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    if (turnMessage) {
        turnMessage.textContent = `${currentPlayer}'s turn`;
    }
    if (message) {
        message.textContent = '';
    }
}
resetGameState();
function cellClicked(cellIndex) {
    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        const cell = document.getElementsByClassName('cell')[cellIndex];
        cell.innerHTML = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (turnMessage) {
            turnMessage.textContent = `${currentPlayer}'s turn`;
        }
        checkWinner();
    }
}
function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            if (turnMessage) {
                turnMessage.textContent = '';
            }
            if (message) {
                message.textContent = `${board[a]} wins! 🎉`;
            }
            return;
        }
    }
    if (!board.includes('')) {
        gameActive = false;
        if (turnMessage) {
            turnMessage.textContent = '';
        }
        if (message) {
            message.textContent = "It's a tie!";
        }
    }
}
function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resetGameState();
}
if (restart) {
    restart.addEventListener('click', restartGame);
}
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => cellClicked(index));
});
