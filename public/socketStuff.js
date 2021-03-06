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
})

socket.on('camLock', (data) => {
    player.locX = data.locX;     //update location of player
    player.locY = data.locY;     //update location of player
})

socket.on('orbSwitch', (data) => {
    //console.log(data);
    orbs.splice(data.orbIndex, 1, data.orbAdded);
})

socket.on('updateLeaderboard', (leaders) => {
    //console.log(data);
    document.querySelector('.leader-board').innerHTML = ''
    leaders.forEach((leader) => {
        document.querySelector('.leader-board').innerHTML += `<li class="leaderboard-player">${leader.name} - ${leader.score}</li>`
    })
})

socket.on('enemyKilled', (data) => {
    //died killedBy
    console.log(data);
    $('#game-message').html(`${data.died.playerName} eaten by ${data.killedBy.playerName}`)
    //document.querySelector('#game-message').innerHTML = `${data.died} eaten by ${data.killedBy}`
    $('#game-message').css({
        'background-color': '#00e6e6',
        'opacity': 1 
    })
    $('#game-message').show()
    $('#game-message').fadeOut(5000)
})