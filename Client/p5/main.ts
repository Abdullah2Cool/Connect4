let p: p5 = new p5(null);
let socket: any;

let board : Grid;
let nTileSize: number, W: number, H:number;

function setup() {
    socket = io();
    p.createCanvas(700, 700);
    W = 7;
    H = 6;
    nTileSize = p.width/W;
    board = new Grid(W, H, socket);
    p.ellipseMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);

    socket.on("serverState", function (data) {
        console.log("I got my id: " + data.id);
    });
}

function draw() {
    board.run(p);
}


