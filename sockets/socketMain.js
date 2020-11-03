//All socket logic of server

const io = require('../servers').io;

const Orb = require('./classes/Orb')
let orbs = []

initGame();

io.on('connect', (socket) => {
    socket.emit('init', {orbs});
})

//Run at game start
function initGame(){
    for(i = 0; i < 500; i++){
        orbs.push(new Orb());
    }
}

module.exports = io;