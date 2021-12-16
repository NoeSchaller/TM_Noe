class Over extends Phaser.Scene {

    constructor() {
        super('overlay');
    }

    init(data) {
        this.simulation = data
    }

    preload() {
        this.load.image('echelle', 'assets/scale.png')
    }

    create() {
        this.echelle = this.add.image(100, 770, 'echelle')
        this.buttons = []

        this.camera = new Camera(this, this.simulation)
    }

    update() {
        this.camera.update(this.simulation)
    }
}
