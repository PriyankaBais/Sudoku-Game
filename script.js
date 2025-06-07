document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("sudoku-board");
    const validateButton = document.getElementById("validate");
    const resetButton = document.getElementById("reset");
    const message = document.getElementById("message");
    
    let sudokuGrid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    let solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    function createBoard() {
        board.innerHTML = "";
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let cell = document.createElement("input");
                cell.type = "text";
                cell.classList.add("cell");
                
                if (sudokuGrid[row][col] !== 0) {
                    cell.value = sudokuGrid[row][col];
                    cell.readOnly = true;
                    cell.style.backgroundColor = "#d3d3d3";
                }
                
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener("input", () => validateCell(cell));
                board.appendChild(cell);
            }
        }
    }
    
    function validateCell(cell) {
        let row = cell.dataset.row;
        let col = cell.dataset.col;
        let value = parseInt(cell.value);
        
        if (isNaN(value) || value < 1 || value > 9) {
            cell.style.backgroundColor = "#ffcccc";
        } else if (value === solution[row][col]) {
            cell.style.backgroundColor = "#ccffcc";
        } else {
            cell.style.backgroundColor = "#ffcccc";
        }
    }

   function checkSolution() {
    const inputs = document.querySelectorAll(".cell");
    let isValid = true;

    inputs.forEach(input => {
        let row = input.dataset.row;
        let col = input.dataset.col;
        let value = parseInt(input.value);

        if (isNaN(value) || value !== solution[row][col]) {
            isValid = false;
            input.value = solution[row][col]; // Fill the correct value
            input.style.backgroundColor = "#ccffcc"; // Highlight correct values
        }
    });

    message.textContent = isValid ? "🎉 Congratulations! You solved the Sudoku!" : "✅ Solution filled automatically!";
    message.style.color = "green";
}
    
    function resetBoard() {
        createBoard();
        message.textContent = "";
    }
    
    validateButton.addEventListener("click", checkSolution);
    resetButton.addEventListener("click", resetBoard);
    createBoard();
});
