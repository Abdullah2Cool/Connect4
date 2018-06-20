let p = new p5(null);
let socket;
let myBoard;
let nTileSize, W, H;
let wins = 0;
let losses = 0;
let gameOver = false;
function setup() {
    socket = io();
    p.createCanvas(700, 700);
    p.ellipseMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    socket.on("serverState", this.onServerState.bind(this));
    socket.on("startGame", this.onStartGame.bind(this));
    socket.on("applyMove", this.onApplyMove.bind(this));
    socket.on("gameOver", this.onGameOver.bind(this));
}
function draw() {
    p.background(0);
    if (myBoard)
        myBoard.draw(p);
}
function mouseClicked() {
    if (p.mouseY < p.height - 100) {
        let nColumn = Math.floor(p.mouseX / nTileSize);
        socket.emit("sendMove", {
            move: nColumn
        });
        console.log(nColumn);
    }
}
function keyTyped() {
    if (gameOver) {
        if (p.key === 'r' || p.key === 'R') {
            socket.emit("requestReset");
        }
    }
}
function onServerState(data) {
    console.log("I got my id: " + data.id);
}
function onStartGame(data) {
    wins = 0;
    losses = 0;
    gameOver = false;
    W = 7;
    H = 6;
    nTileSize = p.width / W;
    if (!myBoard)
        myBoard = new testBoard(W, H, data.color, data.turn);
    else
        myBoard.init();
    console.log(data);
}
function onApplyMove(data) {
    console.log(data);
    myBoard.applyMove(data.row, data.col, data.color, data.turn);
}
function onGameOver(data) {
    console.log(data);
    wins = data.wins;
    losses = data.losses;
    myBoard.winner = data.isWinner;
    gameOver = true;
}
