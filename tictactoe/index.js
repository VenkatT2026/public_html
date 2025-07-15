let container = document.getElementById("container")
let cells = container.children;
let message = document.getElementById("message");
let gameActive = true;

message.innerHTML = "Your turn (X)";

function checkWinner() {
    const winningCombinations = [
        // Horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonal
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const cellA = cells[a].firstElementChild.innerHTML;
        const cellB = cells[b].firstElementChild.innerHTML;
        const cellC = cells[c].firstElementChild.innerHTML;

        if (cellA && cellA === cellB && cellA === cellC) {
            return cellA; // Returns 'X' or 'O'
        }
    }

    // Check for a draw
    if ([...cells].every(cell => cell.firstElementChild.innerHTML !== "")) {
        return 'draw';
    }
    return null; // No winner yet
}

function onmouseclick(index) {
    if (!gameActive) return;

    let clicked_inner_cell = cells[index].firstElementChild;
    if (clicked_inner_cell.innerHTML != "") {
        return;
    }

    // Player's move
    clicked_inner_cell.innerHTML = "X";

    // Check for winner after player's move
    let winner = checkWinner();
    if (winner) return endGame(winner);

    // AI's turn
    const available_cells = [...cells].filter(cell => cell.firstElementChild.innerHTML === "");
    if (available_cells.length > 0) {
        const random_cell = available_cells[Math.floor(Math.random() * available_cells.length)];
        random_cell.firstElementChild.innerHTML = "O";
    }

    // Check for winner after AI's move
    winner = checkWinner();
    if (winner) return endGame(winner);
}

function endGame(winner) {
    gameActive = false;
    if (winner === 'X') alert("YOU WON!");
    else if (winner === 'O') alert("YOU LOST!");
    else if (winner === 'draw') alert("IT'S A DRAW!");
}