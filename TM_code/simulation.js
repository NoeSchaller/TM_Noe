class Simul extends Phaser.Scene {

    constructor(that, mapLoad, mapCreate, mode) {
        super('simulation');
        this.mapLoad = mapLoad
        this.mapCreate = mapCreate
        this.parent = that
        this.mode = mode
    }

    preload() {


        this.load.json('ultraShape', 'assets/ultraShape.json')
        this.load.json('bodyShape', 'assets/bodyShape.json')

        this.load.spritesheet('bodyPic', 'assets/body.png', { frameWidth: 200, frameHeight: 200 })
        this.load.spritesheet('ultra', 'assets/ultra.png', { frameWidth: 200, frameHeight: 200 })

        this.load.image('back', 'assets/back.jpg')
        this.load.image('wheel', 'assets/wheel.png')
        this.load.image('wall', 'assets/wall.png')
        this.load.image('mark', 'assets/mark.png')
        this.load.image('echelle', 'assets/scale.png')

        this.mapLoad(this)
    };

    create() {
        this.frame = 0
        this.light = []
        this.parent.Light = this.light
        this.marks = []
        this.walls = []


        this.matter.add.mouseSpring().constraint.stiffness = 0.0005;

        this.mapCreate(this)


        if (this.mode) {
            this.scene.launch('setup', this)
        }
        this.scene.launch('overlay', this)
    };

    update() {
        for (let i = 0; i < this.light.length; i++) {
            this.light[i].robot.update(this)
        }
        this.frame++
    };
}