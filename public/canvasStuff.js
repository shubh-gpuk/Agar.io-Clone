function init(){
    draw();
}

// ============DRAWING===========

//random position of the player
let randomX = Math.floor(500*Math.random() + 10);
let randomY = Math.floor(500*Math.random() + 10);

function draw(){
    context.beginPath();
    context.fillStyle = "rgb(250, 0, 0)";
    context.arc(randomX, randomY, 10, 0, 2*Math.PI);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "rgb(0, 250, 0)";
    context.stroke();
    requestAnimationFrame(draw);
};

canvas.addEventListener("mousemove", (event) => {
    //console.log(event);
})