"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Server/Player");
const Game_1 = require("./Server/Game");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mode = "p5";
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Client/' + mode + '/index.html');
});
app.get('/*', function (req, res) {
    let file = req.params[0];
    // console.log('\t :: Express :: file requested : ' + file);
    res.sendFile(__dirname + "/Client/" + mode + "/" + file);
});
server.listen(process.env.PORT || 3000);
console.log("Server started on localhost:3000");
const io = require('socket.io')(server, {});
const All_SOCKETS = {};
const ALL_PLAYERS = {};
const ALL_GAMES = {};
io.on("connect", function (socket) {
    console.log(`Socket Connected: ${socket.id}`);
    All_SOCKETS[socket.id] = socket;
    let currentPlayer = new Player_1.Player(socket.id, socket);
    ALL_PLAYERS[socket.id] = currentPlayer;
    for (let i in ALL_PLAYERS) {
        if (i != currentPlayer.id) {
            let match = ALL_PLAYERS[i];
            if (match.partner == null) {
                currentPlayer.assignPartner(match);
                match.assignPartner(currentPlayer);
                let game = new Game_1.Game(currentPlayer, match);
                ALL_GAMES[currentPlayer.id + match.id] = game;
                currentPlayer.assignGame(game);
                match.assignGame(game);
                break;
            }
        }
    }
    socket.emit("serverState", {
        id: socket.id
    });
    socket.on("sendMove", function (data) {
        if (currentPlayer.game != null) {
            currentPlayer.game.update(data.move, currentPlayer);
            currentPlayer.partner.socket.emit("partnerMove", {
                move: data.move
            });
        }
        else {
            console.log("Not in a game yet.");
        }
    });
    socket.on("requestReset", function (data) {
        currentPlayer.game.reset();
    });
    socket.on("disconnect", function () {
        delete ALL_PLAYERS[socket.id];
        delete All_SOCKETS[socket.id];
        console.log(`Socket disconnected: ${socket.id}`);
    });
});
