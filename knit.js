//import {jsPDF} from "jspdf";

let grid = document.querySelector(".grid");

function toggleColor(chosenColor) {
    const squares = document.querySelectorAll(".square");

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

function colorIn(chosenColor) {
    toggleColor(chosenColor.value)
}

function createGridByColumn() {

    // remove previous grid, if any
    removeElement(grid);

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
    removeElement(grid);

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

function removeElement(element) {
    if (element.hasChildNodes()) {
        if (element == grid) {
            const children = document.querySelectorAll(".row");
        } else {
            console
            const children = document.querySelectorAll(".pattern-row");
        }

        Array.from(children).forEach((child) => {
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
    const chosenNeedles = document.getElementById("needles").value;
    const patternBox = document.querySelector(".pattern");

    const rowBox = document.createElement("div");
    patternBox.appendChild(rowBox);
    rowBox.style.fontWeight = 800;
    rowBox.style.fontSize = "20px";
    rowBox.style.marginBottom = "5px";
    rowBox.textContent = "Pattern";

    let rowNumber = 0;

    Array.from(rows).forEach((row) => {

        // read the grid
        const squares = row.children;
        
        let currentRow = [];
        rowNumber += 1;

        Array.from(squares).forEach((square) => {
            switch(square.style.backgroundColor) {
                case "rgb(0, 15, 137)":
                    currentRow.push("blue")
                    break
                case "rgb(228, 0, 124)":
                    currentRow.push("pink")
                    break
                case "rgb(139, 0, 139)":
                    currentRow.push("purple")
                    break
                case "rgb(248, 186, 1)":
                    currentRow.push("yellow")
                    break
                case "rgb(124, 220, 35)":
                    currentRow.push("green")
                    break
                default:
                    currentRow.push("white")
            }
        })
        if (rowNumber % 2 == 0 && chosenNeedles == "straight") {
            currentRow.reverse();
        }

        // remove previous pattern, if any
        removeElement(patternBox);

        // generate written pattern
        let mergedRow = []
        mergeArray(currentRow, mergedRow);
        let pattern = "Row " + rowNumber + ": "
        
        mergedRow.forEach((element) => {
            //console.log(element)
            if(isNaN(element)) {
                pattern += element + ", "
            } else {
                pattern += element + " "
            }
        })
        const rowBox = document.createElement("div");
        rowBox.className = ".pattern-row";
        patternBox.appendChild(rowBox);
        rowBox.textContent = pattern.slice(0, -2);
    })
    //add border
    pattern.style.border = "1px solid black";
}

// adds all adjacent and equal array elements, returns an array with quantites and colors in order
function mergeArray(arr, mergedArr) {
    if (arr.length == 0) {
        return;
    }
    
    let temp = [];
    let i = 0;
    
    do {
        temp.push(arr.shift());
        i++;
    }
    while(temp[0]==arr[0]);

    mergedArr.push(temp.length, temp[0]);
    /*mergedArr.push(temp.reduce( //older version with prime numbers to identify colors
        (accumulator, currentValue) => accumulator * currentValue,
        0,
    ));*/
    mergeArray(arr, mergedArr);
};

function printPattern() {
    const doc = new jsPDF();
    const pattern = document.querySelector("#pdf").value;
    console.log(pattern)
    doc.text()
}

// add option to use more than one color (up to 5/6?)
// choose each color (basic colors), name it and draw in the grid
// generate a pattern with the user's color names

//removeElement fa casino