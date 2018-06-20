import {Player} from "./Player";
import {TileState} from "./Util";

export class Game {
    board: TileState[][];
    turn: TileState;
    nWidth: number = 7;
    nHeight: number = 6;
    redTiles: number = 0;
    blueTiles: number = 0;
    gameOver: boolean = false;
    players = {};


    constructor(p1: Player, p2: Player) {
        this.turn = TileState.Red;

        p1.color = TileState.Red;
        p2.color = TileState.Blue;

        this.players[p1.color] = p1;
        this.players[p2.color] = p2;

        this.board = [];
        for (let i = 0; i < this.nHeight; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.nWidth; j++) {
                this.board[i][j] = TileState.Empty;
            }
        }

        p1.socket.emit("startGame", {
            turn: true,
            color: p1.color
        });

        p2.socket.emit("startGame", {
            turn: false,
            color: p2.color
        });

        console.log(`${p1.id} is matched with ${p2.id}`);
    }

    update(tileColumn: number, player: Player) {
        if (this.turn != player.color || this.gameOver) return;
        console.log(`Turn: ${this.turn} , Player: ${player.color}`);

        let bValid = false;
        for (let i = this.board.length - 1; i >= 0; i--) {
            if (this.board[i][tileColumn] == TileState.Empty) {
                bValid = true;
                this.board[i][tileColumn] = this.turn;
                player.socket.emit("applyMove", {
                    row: i,
                    col: tileColumn,
                    color: player.color,
                    turn: false
                });
                player.partner.socket.emit("applyMove", {
                    row: i,
                    col: tileColumn,
                    color: player.color,
                    turn: true
                });
                if (this.turn == TileState.Red) this.redTiles++;
                else this.blueTiles++;
                break;
            }
        }
        if (bValid) {
            if (this.checkWin()) {
                let winner: Player = this.players[this.turn];
                let loser: Player = winner.partner;
                winner.wins++;
                loser.losses++;
                console.log("Somebody Won");

                winner.socket.emit("gameOver", {
                    wins: winner.wins,
                    losses: winner.losses,
                    isWinner: true
                });
                loser.socket.emit("gameOver", {
                    wins: loser.wins,
                    losses: loser.losses,
                    isWinner: false
                });
                this.gameOver = true;
            }
            this.turn = (this.turn == TileState.Blue) ? TileState.Red : TileState.Blue;

            for (let y = 0; y < this.nHeight; y++) {
                for (let x = 0; x < this.nWidth; x++) {
                    switch (this.board[y][x]) {
                        case TileState.Blue:
                            process.stdout.write("B ");
                            break;
                        case TileState.Red:
                            process.stdout.write("R ");
                            break;
                        default:
                            process.stdout.write("- ");
                            break
                    }
                }
                console.log();
            }
        }
    }

    reset() {
        this.players[this.turn].socket.emit("startGame", {
            turn: true,
            color: this.players[this.turn].color
        });

        this.players[this.turn].partner.socket.emit("startGame", {
            turn: false,
            color: this.players[this.turn].partner.color
        });
        this.gameOver = false;
        this.redTiles = 0;
        this.blueTiles = 0;



        this.board = [];
        for (let i = 0; i < this.nHeight; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.nWidth; j++) {
                this.board[i][j] = TileState.Empty;
            }
        }
    }

    checkWin() {
        // console.log("CHECKWIN");
        let winColor: TileState = this.turn;
        let nWinTiles = (this.turn == TileState.Blue) ? this.blueTiles : this.redTiles;
        let nTotal = nWinTiles;
        let nConnected = 0;

        if (nWinTiles < 4) return false;

        for (let y = this.board.length - 1; y >= 0; y--) {  //HORIZONTAL
            if (nTotal < 4) break;
            nConnected = 0;
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] == winColor) {
                    nConnected++;
                    if (nConnected == 4) {
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

}

