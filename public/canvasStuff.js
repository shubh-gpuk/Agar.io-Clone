
// ============DRAWING===========

function draw(){

    //since translate is cumulative, reset it to default
    context.setTransform(1,0,0,1,0,0)

    //clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //clamp the camera
    const camX = canvas.width/2 - player.locX
    const camY = canvas.height/2 - player.locY
    context.translate(camX, camY);

    playersData.forEach((p) => {
        //Draw a player
        context.beginPath();
        context.fillStyle = p.color;
        context.arc(p.locX, p.locY, p.radius, 0, 2*Math.PI);
        //context.arc(200, 200, 10, 0, 2*Math.PI);
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = "rgb(0, 250, 0)";
        context.stroke();
    })

    
    orbs.forEach((orb) => {
        context.beginPath();
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, 2*Math.PI);
        context.fill();
    });

    requestAnimationFrame(draw);
};


canvas.addEventListener('mousemove',(event)=>{
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        //console.log("lower-right");
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        //console.log("lower-left");
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        //console.log("upper-left");
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        //console.log("upper-right");
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    player.xVector = xVector;
    player.yVector = yVector;

})