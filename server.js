"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
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
io.on("connect", function (socket) {
    console.log(`Socket Connected: ${socket.id}`);
    All_SOCKETS[socket.id] = socket;
    let currentPlayer = new Player_1.Player(socket.id);
    ALL_PLAYERS[socket.id] = currentPlayer;
    socket.emit("serverState", {
        id: socket.id
    });
    socket.on("disconnect", function () {
        delete ALL_PLAYERS[socket.id];
        delete All_SOCKETS[socket.id];
        console.log(`Socket disconnected: ${socket.id}`);
    });
});
