// This data is not sent to the clients.
// It is used internally by the server.

class PlayerConfig{
    constructor(settings){
        this.speed = settings.defaultSpeed;
        this.xVector = 0;
        this.yVector = 0;
        this.zoom = settings.defaultZoom;
    }
}

module.exports = PlayerConfig;