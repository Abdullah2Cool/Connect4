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