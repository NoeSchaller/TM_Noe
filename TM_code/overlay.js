class Over extends Phaser.Scene {

    constructor () {
        super('overlay');
    }

    preload() {
        this.load.image('echelle','assets/scale.png')
    }

    create() {
        this.simulation = game.scene.keys.simulation
        this.echelle = this.add.image(100,770,'echelle')
        this.buttons = []

        this.camera = new Camera(this, this.simulation)
    }

    update() {
        this.camera.update(this.simulation)
    }
}
