const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll('.cell');
const message: HTMLElement | null = document.getElementById('message');
const restart: HTMLElement | null = document.getElementById('restart');
let currentPlayer: string;
let gameActive: boolean;
let board: string[] = ['', '', '', '', '', '', '', '', ''];
const turnMessage: HTMLElement | null = document.getElementById('player-turn');


// Function to reset game state variables
function resetGameState(): void {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    if (turnMessage) {
        turnMessage.textContent = `${currentPlayer}'s turn`;
    }
    // Clear messages
    if (message) {
        message.textContent = '';
    }
}


resetGameState();

function cellClicked(cellIndex: number): void {
    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        const cell = document.getElementsByClassName('cell')[cellIndex] as HTMLDivElement;
        cell.innerHTML = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (turnMessage) {
            turnMessage.textContent = `${currentPlayer}'s turn`;
        }
        checkWinner();
    }
}

function checkWinner(): void {
    const winningConditions: number[][] = [
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

function restartGame(): void {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Reset game state variables using the resetGameState function
    resetGameState();
    
}

if (restart) {
    restart.addEventListener('click', restartGame);
}

cells.forEach((cell :HTMLElement, index :number) :void => {
    cell.addEventListener('click', () => cellClicked(index));
});
