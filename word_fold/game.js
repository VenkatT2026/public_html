const boards = [
    {
        cells: [
            ["E", "L", "W", "Y", "C"],
            ["Y", "L", "O", "A", "N"],
            ["U", "B", "L", "E", "E"],
            ["E", "L", "P", "M", "V"],
            ["P", "U", "R", "A", "U"]],
        words: ["CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE"]
    },
    {
        cells: [
            ["E", "K", "O", "A", "P"],
            ["A", "W", "L", "I", "R"],
            ["N", "S", "F", "A", "T"],
            ["L", "E", "E", "R", "A"],
            ["A", "G", "G", "U", "J"]],
        words: ["TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"]
    },
    {
        cells: [
            ["H", "C", "N", "A", "N"],
            ["Y", "R", "A", "A", "A"],
            ["R", "E", "A", "Y", "B"],
            ["F", "P", "P", "E", "R"],
            ["I", "G", "A", "P", "A"]],
        words: ["CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG"]
    },
]

function make_cell_list() {
    let cells = [...document.getElementById("cell-holder").children];
    let cell_board = [];
    for (let i = 0; i < 25; i += 5) {
        cell_board.push(cells.slice(i, i + 5))
    }
    return cell_board;
}

function updateCell(x, y, content) {
    const cell = CELLS[y][x];
    cell.innerHTML = content;
    if (content === "") {
        cell.classList.add("empty");
    } else {
        cell.classList.remove("empty");``
    }
}

function setup_game(starting_cells) {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            updateCell(x, y, starting_cells[y][x]);
        }
    }
}

const CELLS = make_cell_list();
let selected_x = -1;
let selected_y = -1;
let currentBoardIndex = 0;

setup_game(boards[currentBoardIndex].cells);
document.getElementById("words").innerHTML = "Words to spell: " + boards[currentBoardIndex].words.join(", ");


function move(x, y) {
    const newContent = CELLS[selected_y][selected_x].innerHTML + CELLS[y][x].innerHTML;
    updateCell(x, y, newContent);
    updateCell(selected_x, selected_y, "");
    select(x, y);
}

function unselect(x, y) {
    CELLS[y][x].classList.remove("selected");
    selected_x = -1;
    selected_y = -1;
}

function select(x, y) {
    if (CELLS[y][x].innerHTML.length > 0) {
        if (selected_x >= 0 && selected_y >= 0)
            CELLS[selected_y][selected_x].classList.remove("selected");
        CELLS[y][x].classList.add("selected");
        selected_y = y;
        selected_x = x;
    }
}

function is_close(a, b) {
    return Math.abs(a - b) <= 1
}

function can_move(x, y) {
    let can_move = is_close(selected_x, x) && selected_y == y || is_close(selected_y, y) && selected_x == x;

    return selected_x >= 0 && selected_y >= 0 && can_move && CELLS[y][x].innerHTML.length > 0
}

function on_click(x, y) {
    if (selected_x == x && selected_y == y) {
        unselect(x, y)
    }
    else if (can_move(x, y)) {
        move(x, y)
    } else {
        select(x, y)
    }
}

function nextboard () {
    const nextButton = document.getElementById("next");
    nextButton.addEventListener("click", function () {
        currentBoardIndex = (currentBoardIndex + 1) % boards.length;
        const newBoard = boards[currentBoardIndex];

        setup_game(newBoard.cells);
        document.getElementById("words").innerHTML = "Words to spell: " + newBoard.words.join(", ");

        // Reset any active selection
        if (selected_x !== -1 && selected_y !== -1) {
            unselect(selected_x, selected_y);
        }
    });
}

function reset () {
    const reset = document.getElementById("reset");
    reset.addEventListener("click", function () {
        setup_game(boards[currentBoardIndex].cells);
    });
}



reset();
nextboard();