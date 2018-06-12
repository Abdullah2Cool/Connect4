let p = new p5(null);
let socket;
let board;
let nTileSize, W, H;
function setup() {
    p.createCanvas(700, 700);
    W = 7;
    H = 6;
    nTileSize = p.width / W;
    board = new Grid(W, H);
    p.ellipseMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    socket = io();
    socket.on("serverState", function (data) {
        console.log("I got my id: " + data.id);
    });
}
function draw() {
    board.run(p);
}
