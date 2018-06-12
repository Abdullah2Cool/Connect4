"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id, socket) {
        this.color = null;
        this.id = id;
        this.partner = null;
        this.game = null;
        this.socket = socket;
    }
    assignPartner(p) {
        this.partner = p;
    }
    assignGame(g) {
        this.game = g;
    }
}
exports.Player = Player;
