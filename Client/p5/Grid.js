var TileState;
(function (TileState) {
    TileState[TileState["Blue"] = 0] = "Blue";
    TileState[TileState["Red"] = 1] = "Red";
    TileState[TileState["Empty"] = 2] = "Empty";
})(TileState || (TileState = {}));
class testBoard {
    constructor(nWidth, nHeight, color, turn) {
        this.winner = false;
        this.nWidth = nWidth;
        this.nHeight = nHeight;
        this.myColor = color == TileState.Red ? "#FF0000" : "#0000FF";
        this.opponentColor = color == TileState.Blue ? "#FF0000" : "#0000FF";
        this.myName = (color == TileState.Red ? "RED" : "BLUE");
        this.opponentName = (color == TileState.Blue ? "RED" : "BLUE");
        this.isTurn = turn;
        this.init();
    }
    init() {
        this.board = [];
        for (let i = 0; i < this.nHeight; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.nWidth; j++) {
                this.board[i][j] = TileState.Empty;
            }
        }
        this.winner = false;
    }
    applyMove(nRow, nColumn, color, turn) {
        this.board[nRow][nColumn] = color;
        this.isTurn = turn;
        // console.log("After: " + this.isTurn);
    }
    draw(p) {
        // console.log("DRAW");
        p.background("#ffffff");
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                p.fill("#CCCCCC");
                p.rect(x * nTileSize, y * nTileSize, nTileSize, nTileSize);
                switch (this.board[y][x]) {
                    case TileState.Blue:
                        p.fill("#1c54f5");
                        break;
                    case TileState.Red:
                        p.fill("#f0261f");
                        break;
                    case TileState.Empty:
                        p.fill("#ffffff");
                        break;
                }
                p.ellipse(x * nTileSize + nTileSize / 2, y * nTileSize + nTileSize / 2, nTileSize * 7 / 8, nTileSize * 7 / 8);
            }
        }
        p.textSize(p.width / 12);
        p.fill(this.myColor);
        p.text(this.myName + " : " + wins, p.width * 1 / 4, p.height - 100 / 2 - 20);
        p.fill(this.opponentColor);
        p.text(this.opponentName + " : " + losses, p.width * 3 / 4, p.height - 100 / 2 - 20);
        p.textSize(p.width / 16);
        // console.log(this.isTurn);
        if (this.isTurn) {
            p.fill(this.myColor);
            p.text("YOUR TURN", p.width / 2, p.height - 20);
        }
        else {
            p.fill(this.opponentColor);
            p.text("OPPONENTS TURN", p.width / 2, p.height - 20);
        }
        if (gameOver) {
            p.textSize(p.width / 8);
            let sWinner = this.winner ? this.myName : this.opponentName;
            p.fill(this.winner ? this.myColor : this.opponentColor);
            p.text(sWinner + " WINS", p.width / 2, p.height / 2 - 100 / 2);
            p.textSize(p.width / 16);
            p.text("Press 'R' to Restart", p.width / 2, p.height / 2 + p.height / 10 - 100 / 2);
        }
    }
}
