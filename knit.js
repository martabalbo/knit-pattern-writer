let grid = document.querySelector(".grid");

function createGrid() {

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
};