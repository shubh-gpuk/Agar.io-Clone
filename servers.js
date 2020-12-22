//This file is not the entry point. It only creates express and socket servers.
const express = require('express');
const socketio = require('socket.io');
const helmet = require('helmet');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(helmet());

const expressServer = app.listen(8080);
const io = socketio(expressServer);
console.log('Express and Socket IO started on port 8080');

module.exports = {
    app,
    io
}