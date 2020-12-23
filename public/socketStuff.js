const socket = io.connect('http://localhost:8080');

//Execute "init" after player clicks on "Play Solo!" button
function init(){
    draw();
    //console.log(orbs);

    socket.emit('init', {playerName: player.name});
}

socket.on('initReturn', (data) => {
    orbs = data.orbs;
})