enum TileState {
    Blue, Red, Empty
}

class Grid {
    nWidth: number;
    nHeight: number;
    nRedTiles: number = 0;
    nBlueTiles: number = 0;
    nRedWins: number = 0;
    nBlueWins: number = 0;
    board: TileState[][];
    isPressed: boolean;
    win: boolean;
    sWinner: String;
    redTurn: boolean = true;


    constructor(nWidth, nHeight) {
        this.nWidth = nWidth;
        this.nHeight = nHeight;
        this.init();
    }

    init() {
        // console.log("INIT");
        this.win = false;
        this.isPressed = false;
        this.sWinner = "";
        this.nRedTiles = 0;
        this.nBlueTiles = 0;
        this.board = [];
        for (let i = 0; i < this.nHeight; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.nWidth; j++) {
                this.board[i][j] = TileState.Empty;
            }
        }
    }

    run(p: p5) {
        // console.log("RUN");
        if (this.win) {
            if (p.keyIsPressed && p.key == 'r' || p.key == 'R') this.init();
            return;
        }
        this.update(p);
        this.win = this.checkWin();
        this.draw(p);
    }

    update(p: p5) {
        // console.log("UPDATE");
        if (p.mouseIsPressed && !this.isPressed) {
            this.isPressed = true;
            try {
                if (p.mouseY < p.height - 100) {
                    let nRow = Math.floor(p.mouseX / nTileSize);
                    for (let i = this.board.length - 1; i >= 0; i--) {
                        if (this.board[i][nRow] == TileState.Empty) {
                            this.board[i][nRow] = (this.redTurn) ? TileState.Red : TileState.Blue;
                            if (this.redTurn) this.nRedTiles++;
                            else this.nBlueTiles++;
                            this.redTurn = !this.redTurn;
                            break;
                        }
                    }
                }
            }
            catch (e) {
            }
        } else if (!p.mouseIsPressed) {
            this.isPressed = false;
        }
    }

    checkWin() {
        // console.log("CHECKWIN");
        let winColor: TileState = (!this.redTurn) ? TileState.Red : TileState.Blue; //!redTurn means red just went, so check for red win
        let nWinTiles = (!this.redTurn) ? this.nRedTiles : this.nBlueTiles, nTotal = nWinTiles, nConnected;
        if (nWinTiles < 4) return false;

        for (let y = this.board.length - 1; y >= 0; y--) {  //HORIZONTAL
            if (nTotal < 4) break;
            nConnected = 0;
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                } else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }

        nTotal = nWinTiles;
        for (let x = 0; x < this.board[0].length; x++) {  //VERTICAL
            if (nTotal < 4) break;
            nConnected = 0;
            for (let y = this.board.length - 1; y >= 0; y--) {
                if (this.board[y][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                } else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }

        nTotal = nWinTiles;
        for (let x = 0; x < this.board[0].length - 3; x++) {  //NORTHEAST DIAGONAL
            if (nTotal < 4) break;
            nConnected = 0;
            for (let y = this.board.length - 1, x2 = x; y >= 0 && x2 < this.board[0].length; y--, x2++) {
                if (this.board[y][x2] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                } else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        for (let y = this.board.length - 2; y >= 3; y--) {
            if (nTotal < 4) break;
            nConnected = 0;
            for (let y2 = y, x = 0; y2 >= 0 && x < this.board[0].length; y2--, x++) {
                if (this.board[y2][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                } else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }

        nTotal = nWinTiles;
        for (let x = this.board[0].length - 1; x >= 3; x--) {  //NORTHWEST DIAGONAL
            if (nTotal < 4) break;
            nConnected = 0;
            for (let y = this.board.length - 1, x2 = x; y >= 0 && x2 >= 0; y--, x2--) {
                if (this.board[y][x2] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                } else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        for (let y = this.board.length - 2; y >= 3; y--) {
            if (nTotal < 4) break;
            nConnected = 0;
            for (let y2 = y, x = this.board[0].length - 1; y2 >= 0 && x >= 0; y2--, x--) {
                if (this.board[y2][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                } else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }

        return false;
    }

    draw(p: p5) {
        // console.log("DRAW");
        p.background("#ffffff");
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                p.fill("#CCCCCC");
                p.rect(x * nTileSize, y * nTileSize, nTileSize, nTileSize);

                switch (this.board[y][x]) {
                    case TileState.Blue :
                        p.fill("#1c54f5");
                        break;
                    case TileState.Red :
                        p.fill("#f0261f");
                        break;
                    case TileState.Empty :
                        p.fill("#ffffff");
                        break;
                }
                p.ellipse(x * nTileSize + nTileSize / 2, y * nTileSize + nTileSize / 2, nTileSize * 7 / 8, nTileSize * 7 / 8);
            }
        }

        if (this.sWinner == "RED") {
            this.nRedWins++;
        } else if (this.sWinner == "BLUE") {
            this.nBlueWins++;
        }

        p.textSize(p.width / 8);
        p.fill("#FF0000");
        p.text("RED:" + this.nRedWins, p.width * 1 / 4, p.height - 100 / 2 - 10);
        p.fill("#0000FF");
        p.text("BLUE:" + this.nBlueWins, p.width * 3 / 4, p.height - 100 / 2 - 10);


        if (this.win) {
            p.textSize(p.width / 8);
            if (this.sWinner == "RED") {
                p.fill("#FF0000");
                p.text("RED WINS", p.width / 2, p.height / 2 - 100 / 2);
            } else if (this.sWinner == "BLUE") {
                p.fill("#0000FF");
                p.text("BLUE WINS", p.width / 2, p.height / 2 - 100 / 2);
            }
            p.textSize(p.width / 16);
            p.text("Press 'R' to Restart", p.width / 2, p.height / 2 + p.height / 10 - 100 / 2);
        }
    }
}

