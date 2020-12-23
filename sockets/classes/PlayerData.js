//This data is sent to the clients.

const uuidv4 = require('uuid').v4;

class PlayerData{
    constructor(playerName, settings){
        this.playerName = playerName;
        this.locX = Math.floor(settings.worldWidth*Math.random() + 100);
        this.locY = Math.floor(settings.worldHeight*Math.random() + 100);
        this.color = this.getRandomColor();
        this.radius = settings.defaultSize;
        this.score = 0;
        this.orbsAbsorbed = 0;
        this.uid = uuidv4();
    }

    getRandomColor(){
        const r = Math.floor(Math.random()*200 + 30);
        const g = Math.floor(Math.random()*200 + 30);
        const b = Math.floor(Math.random()*200 + 30);
        return `rgb(${r}, ${g}, ${b})`;
    }
}

module.exports = PlayerData;