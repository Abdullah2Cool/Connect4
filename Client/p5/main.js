const scrWidth = 700;
const scrHeight = 710;
const Grid = [];
const scale = 20;
const nSize = 6;
const spacing = 4;
const padding = 50;

function setup() {
    createCanvas(scrWidth, scrHeight);
    for (var x = 0; x < nSize; x++) {
        Grid[x] = []; // create nested array
        for (var y = 0; y < nSize; y++) {
            Grid[x][y] = createVector(x * scale, y * scale);
        }
    }
    console.log(Grid);
    console.log(scale);

}

function draw() {
    background(0, 0, 51);
    // fill(255);
    for (var x = 0; x < nSize; x++) {
        for (var y = 0; y < nSize; y++) {
            ellipse(Grid[x][y].x * spacing + padding, Grid[x][y].y * spacing + padding, scale, scale);
        }
    }
    // ellipse(width/2, height/2, 20, 20);
}

function mousePressed() {

}

function windowResized() {
    resizeCanvas(scrWidth, scrHeight);
}