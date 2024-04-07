function create_canvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    return [canvas, ctx];
}

function generate_grid(nRows, nCols) {
    let grid = Array(nRows).fill()
                            .map(() => 
               Array(nCols).fill()
                            .map(() => Math.round(Math.random())));
    return grid;
}

function draw_grid(ctx, grid, cell_size, cellColor) {
    ctx.fillStyle = cellColor;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 1) {
                ctx.fillRect(j * cell_size, i * cell_size, cell_size, cell_size);
            }
        }
    }
}

function count_neighbors(grid, i, j) {
    let n_neighbors = 0;
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            if (k == 0 && l == 0) continue;
            let new_i = i + k;
            let new_j = j + l;
            if (new_i >= 0 && new_i < grid.length && new_j >= 0 && new_j < grid[i].length) {
                n_neighbors += grid[new_i][new_j];
            }
        }
    }
    return n_neighbors;
}

function update_grid(grid) {
    // update grid using Conway's Game of Life rules
    let new_grid = grid.map(row => row.slice());
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let n_neighbors = count_neighbors(grid, i, j);
            if (grid[i][j] == 1) {
                if (n_neighbors < 2 || n_neighbors > 3) {
                    new_grid[i][j] = 0;
                }
            } else {
                if (n_neighbors == 3) {
                    new_grid[i][j] = 1;
                }
            }
        }
    }
    return new_grid;
}

async function draw_background() {
    console.log("Drawing grid");
    const [canvas, ctx] = create_canvas("background");
    
    const CELL_COLOR = "white";
    const CELL_SIZE = 20;
    
    const GRID_WIDTH = canvas.width;
    const GRID_HEIGHT = canvas.height;
    
    const nRows = Math.floor(GRID_HEIGHT / CELL_SIZE);
    const nCols = Math.floor(GRID_WIDTH / CELL_SIZE);
    
    console.log("Generating grid");
    console.log("Window width (px): " + GRID_WIDTH);
    console.log("Window height (px): " + GRID_HEIGHT);
    console.log("Cell size (px): " + CELL_SIZE);
    console.log("Number of rows: " + nRows);
    console.log("Number of columns: " + nCols);
    
    let grid = generate_grid(nRows, nCols);

    while (true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        draw_grid(ctx, grid, CELL_SIZE, CELL_COLOR);
        grid = update_grid(grid);
        await new Promise(r => setTimeout(r, 50));
    }
}

draw_background();