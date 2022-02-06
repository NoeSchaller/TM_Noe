class Over extends Phaser.Scene {

    constructor(width, height) {
        super('overlay');
        this.height = height
        this.width = width
    }

    init(data) {
        this.simulation = data
    }

    preload() {
        this.load.image('echelle', 'assets/scale.png')
    }

    create() {
        this.echelle = this.add.image(70, this.height - 30, 'echelle')
        this.buttons = []

        this.camera = new Camera(this, this.simulation)
    }

    update() {
        this.camera.update(this.simulation)
    }
}
