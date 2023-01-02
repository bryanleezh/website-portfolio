class Map{
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    //gameloop that constantly loops through all the states of everything in the game
    startGameLoop() {
        const step = () => {

            //clear all drawings in canvas so that drawn game objects will not overlap each other
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

            

            //Draw lower layer
            this.map.drawLowerImage(this.ctx);

            //Draw Game Objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction, // returns the direction that is being held down by the certain key, if nothing is held down, arrow will just be undefined
                });
                object.sprite.draw(this.ctx);
            });
            
            //Draw upper layer
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame( () => { //mad loop that works better than setInterval, which will call this function again whenever a new frame starts
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        
    }
}