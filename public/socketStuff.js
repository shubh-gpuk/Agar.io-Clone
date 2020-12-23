const socket = io.connect('http://localhost:8080');

//Execute "init" after player clicks on "Play Solo!" button
function init(){
    draw();
    //console.log(orbs);

    socket.emit('init', {playerName: player.name});
}

socket.on('initReturn', (data) => {
    orbs = data.orbs;

    setInterval(() => {
        socket.emit('tick', {
            xVector: player.xVector,
            yVector: player.yVector
        })
    }, 33);

})

socket.on('tock', (data) => {
    //console.log(data.playersData);
    playersData = data.playersData;     //data.playersData is an array of objects
    player.locX = data.locX;     //update location of player
    player.locY = data.locY;     //update location of player
})