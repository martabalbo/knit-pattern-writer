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
        const rows = document.querySelectorAll(".row");

        Array.from(rows).forEach((child) => {
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
    const patternBox = document.querySelector(".pattern");

    let rowNumber = 0;

    Array.from(rows).forEach((row) => {

        // read the grid
        const squares = row.children;
        
        let currentRow = [];
        rowNumber += 1;

        Array.from(squares).forEach((square) => {
            if (square.style.backgroundColor == chosenColor) {
                currentRow.push(3);
            } else {
                currentRow.push(2);
            }
        })
        if (rowNumber % 2 == 0 && chosenNeedles == "double-pointed") {
            currentRow.reverse();
        }

        // generate written pattern
        let mergedRow = []
        mergeArray(currentRow, mergedRow);
        let pattern = "Row " + rowNumber + ": "

        console.log(mergedRow)
        
        mergedRow.forEach((element) => {
            console.log(element)
            if(element % 2 == 0) {
                console.log(element/2)
                pattern += (element/2) + " white, "
            } else if(element % 3 == 0) {
                console.log(element/3)
                pattern += (element/3) + " color, "
            }
        }) //nope dovrei dividere per 2 o 3 n volte fino ad arrivare a 1 e poi usare n
        // prova a fare in modo che mergeArray produca un array ["1", "white", "2", "color"]
        const rowBox = document.createElement("div");
        patternBox.appendChild(rowBox);
        rowBox.textContent = pattern.slice(0, -2);

    })
}

// adds all adjacent and equal array elements 
// (ex: [3, 3, 3, 2, 2, 2, 3, 2] becomes [3 color, 3 white, 1 color, 1 white])
function mergeArray(arr, mergedArr) {
    //console.log(arr)
    //console.log(arr.length)
    if (arr.length == 0) {
        return;
    }
    
    let temp = [];
    let i = 0;
    
    do {
        temp.push(arr.shift());
        i++;
        //console.log("i=" + i + " temp: " + temp + " arr: " + arr)
    }
    while(temp[0]==arr[0]);

    mergedArr.push(temp.reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        0,
    ));
    mergeArray(arr, mergedArr);
};

// add option to use more than one color (up to 5/6?)
// choose each color (basic colors), name it and draw in the grid
// generate a pattern with the user's color names