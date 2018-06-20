import {Game} from "./Game";
import {TileState} from "./Util";

export class Player {
    id: any;
    partner: Player;
    socket: any;
    game: Game;
    color: TileState = null;
    wins: number;
    losses: number;
    constructor(id, socket) {
        this.id = id;
        this.partner = null;
        this.game = null;
        this.socket = socket;
        this.wins = 0;
        this.losses = 0;
    }

    assignPartner(p: Player) {
        this.partner = p;
    }

    assignGame(g: Game) {
        this.game = g;
    }
}