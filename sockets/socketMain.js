//All socket logic of server

const io = require('../servers').io;

const Orb = require('./classes/Orb')
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Player = require('./classes/Player');

let orbs = []
let playersData = []

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

    let player = {};

    socket.on('init', ({playerName}) => {

        socket.join('game');

        let playerConfig = new PlayerConfig(settings);
        let playerData = new PlayerData(playerName, settings);
        player = new Player(socket.id, playerConfig, playerData);

        setInterval(() => {
            if(playersData.length > 0){
                io.to('game').emit('tock', {
                    playersData,
                    locX : player.playerData.locX,
                    locY : player.playerData.locY
                });
            }
        }, 33)  //FPS = 30. Every 33ms send all players data and location of current player

        socket.emit('initReturn', {orbs});

        playersData.push(playerData);

    })

    //Getting player direction on this event, every 33ms.
    socket.on('tick', ({xVector, yVector}) => {
        
        let speed = player.playerConfig.speed;
        let xV = player.playerConfig.xVector = xVector;
        let yV = player.playerConfig.yVector = yVector;

        if((player.playerData.locX < 5 && xV < 0) || (player.playerData.locX > 500) && (xV > 0)){
            player.playerData.locY -= speed * yV;
        }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)){
            player.playerData.locX += speed * xV;
        }else{
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })
})

//Run at game start
function initGame(){
    for(i = 0; i < settings.defaultOrbs; i++){
        orbs.push(new Orb(settings));
    }
}

module.exports = io;