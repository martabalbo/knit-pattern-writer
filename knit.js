let grid = document.querySelector(".grid");

function toggleColor() {
    const squares = document.querySelectorAll(".square");
    const chosenColor = document.getElementById("colors").value;

    Array.from(squares).forEach((square) => {
        square.addEventListener('click', (event) => {
            if (square.style.backgroundColor == chosenColor) {
                square.style.backgroundColor = "white";
            } else {
                square.style.backgroundColor = chosenColor;
            };
        });
    });
};

function createGridByColumn() {

    // remove previous grid, if any
    removeGrid();

    // get user choice for the grid dimensions
    const gridWidth = document.getElementById("gridWidth").value;
    const gridHeight = document.getElementById("gridHeight").value;

    // create grid with the chosen dimensions
    for(let i=0; i<gridWidth; i++) {
        const column = document.createElement("div");
        column.className = "column";
        for(let j=0; j<gridHeight; j++) {
            const square = document.createElement("div");
            square.className = "square";
            column.appendChild(square);
        }
        grid.appendChild(column);
    };

    // add border
    //grid.style.border = "1px solid black";

    // add toggle function to color the squares
    toggleColor();
};

function createGridByRow() {

    // remove previous grid, if any
    removeGrid();

    // get user choice for the grid dimensions
    const gridWidth = document.getElementById("gridWidth").value;
    const gridHeight = document.getElementById("gridHeight").value;

    // create grid with the chosen dimensions
    for(let i=0; i<gridHeight; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for(let j=0; j<gridWidth; j++) {
            const square = document.createElement("div");
            square.className = "square";
            row.appendChild(square);
        }
        grid.appendChild(row);
    };

    // add border
    //grid.style.border = "1px solid black";

    // add toggle function to color the squares
    toggleColor();
};

function removeGrid() {
    if (grid.hasChildNodes()) {
        const columns = document.querySelectorAll(".column");

        Array.from(columns).forEach((child) => {
            child.parentNode.removeChild(child);
        });
    };
};

function clearGrid() {
    const squares = document.querySelectorAll(".square");
    Array.from(squares).forEach((square) => {
        square.style.backgroundColor = "white";
    })
};

function generatePattern() {
    const rows = document.querySelectorAll(".row");
    const chosenColor = document.getElementById("colors").value;
    const chosenNeedles = document.getElementById("needles").value;

    let pattern = "";
    let rowNumber = 0;

    Array.from(rows).forEach((row) => {
        const squares = row.children;
        
        let currentRow = [];
        rowNumber += 1;

        Array.from(squares).forEach((square) => {
            if (square.style.backgroundColor == chosenColor) {
                currentRow.push("B");
            } else {
                currentRow.push("A");
            }
        })
        if (rowNumber % 2 == 0 && chosenNeedles == "double-pointed") {
            currentRow.reverse();
        }
        console.log(currentRow)
    })
}