//All socket logic of server

const io = require('../servers').io;

const Orb = require('./classes/Orb')
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Player = require('./classes/Player');

let orbs = []

const settings = {
    defaultOrbs : 500,
    defaultSpeed : 10,
    defaultSize : 6,
    defaultZoom : 1.5,      //Zoom goes down as size of player increases
    worldWidth : 500,
    worldHeight : 500
}

initGame();

io.on('connect', (socket) => {
    socket.emit('init', {orbs});

    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(null, settings);
    const player = new Player(socket.id, playerConfig, playerData);
})

//Run at game start
function initGame(){
    for(i = 0; i < settings.defaultOrbs; i++){
        orbs.push(new Orb(settings));
    }
}

module.exports = io;