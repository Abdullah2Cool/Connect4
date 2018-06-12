"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./Util");
class Game {
    constructor(p1, p2) {
        this.grid = new Grid(7, 6);
        this.turn = Util_1.TileState.Red;
        this.redWins = 0;
        this.blueWins = 0;
        this.nRedTiles = 0;
        this.nBlueTiles = 0;
        this.Red = p1;
        this.Blue = p2;
        this.Red.color = Util_1.TileState.Red;
        this.Blue.color = Util_1.TileState.Blue;
        console.log(`${p1.id} is matched with ${p2.id}`);
    }
    update(tileColumn, playerColor) {
        if (this.turn != playerColor)
            return;
        for (let i = this.grid.board.length - 1; i >= 0; i--) {
            if (this.grid[i][tileColumn] == Util_1.TileState.Empty) {
                this.grid[i][tileColumn] = this.turn;
                if (this.turn == Util_1.TileState.Red)
                    this.nRedTiles++;
                else
                    this.nBlueTiles++;
                this.redTurn = !this.redTurn;
                break;
            }
        }
        this.turn = (this.turn == Util_1.TileState.Blue) ? Util_1.TileState.Red : Util_1.TileState.Blue;
    }
}
exports.Game = Game;
class Grid {
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
                this.board[i][j] = Util_1.TileState.Empty;
            }
        }
    }
    checkWin() {
        // console.log("CHECKWIN");
        let winColor = (!this.redTurn) ? Util_1.TileState.Red : Util_1.TileState.Blue; //!redTurn means red just went, so check for red win
        let nWinTiles = (!this.redTurn) ? this.nRedTiles : this.nBlueTiles, nTotal = nWinTiles, nConnected;
        if (nWinTiles < 4)
            return false;
        for (let y = this.board.length - 1; y >= 0; y--) { //HORIZONTAL
            if (nTotal < 4)
                break;
            nConnected = 0;
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                }
                else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        nTotal = nWinTiles;
        for (let x = 0; x < this.board[0].length; x++) { //VERTICAL
            if (nTotal < 4)
                break;
            nConnected = 0;
            for (let y = this.board.length - 1; y >= 0; y--) {
                if (this.board[y][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                }
                else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        nTotal = nWinTiles;
        for (let x = 0; x < this.board[0].length - 3; x++) { //NORTHEAST DIAGONAL
            if (nTotal < 4)
                break;
            nConnected = 0;
            for (let y = this.board.length - 1, x2 = x; y >= 0 && x2 < this.board[0].length; y--, x2++) {
                if (this.board[y][x2] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                }
                else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        for (let y = this.board.length - 2; y >= 3; y--) {
            if (nTotal < 4)
                break;
            nConnected = 0;
            for (let y2 = y, x = 0; y2 >= 0 && x < this.board[0].length; y2--, x++) {
                if (this.board[y2][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                }
                else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        nTotal = nWinTiles;
        for (let x = this.board[0].length - 1; x >= 3; x--) { //NORTHWEST DIAGONAL
            if (nTotal < 4)
                break;
            nConnected = 0;
            for (let y = this.board.length - 1, x2 = x; y >= 0 && x2 >= 0; y--, x2--) {
                if (this.board[y][x2] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                }
                else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        for (let y = this.board.length - 2; y >= 3; y--) {
            if (nTotal < 4)
                break;
            nConnected = 0;
            for (let y2 = y, x = this.board[0].length - 1; y2 >= 0 && x >= 0; y2--, x--) {
                if (this.board[y2][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
                        this.sWinner = (!this.redTurn) ? "RED" : "BLUE";
                        return true;
                    }
                }
                else {
                    nTotal -= nConnected;
                    nConnected = 0;
                }
            }
        }
        return false;
    }
}