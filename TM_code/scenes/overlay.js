class Over extends Phaser.Scene {

    constructor(parent, width, height) {
        super('overlay');
        this.parent = parent
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
        this.buttonsCam = []

        this.camera = new CameraManager(this, this.simulation)
    }

    update() {
        this.camera.update(this.parent, this)
    }
}
