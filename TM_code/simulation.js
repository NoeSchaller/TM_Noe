class Simul extends Phaser.Scene {

    constructor(that, map) {
        super('simulation');
        this.map = map
        this.parent = that
    }

    preload() {
        this.load.spritesheet('bodyPic', 'assets/body.png', { frameWidth: 200, frameHeight: 200 })
        this.load.spritesheet('ultra', 'assets/ultra.png', { frameWidth: 200, frameHeight: 200 })

        this.load.json('ultraShape', 'assets/ultraShape.json')
        this.load.json('bodyShape', 'assets/bodyShape.json')
        this.load.json('map', this.map)



        this.load.image('back', 'assets/back.jpg')
        this.load.image('wheel', 'assets/wheel.png')
        this.load.image('wall', 'assets/wall.png')
        this.load.image('mark', 'assets/mark.png')
        this.load.image('echelle', 'assets/scale.png')
        this.load.image('test', 'assets/irTest.png')
        this.load.image('test2', 'assets/irTest2.png')
    };

    create() {
        this.setup = this.cache.json.get('map')
        this.frame = 0
        this.light = []
        this.parent.Light = this.light
        this.marks = []
        this.walls = []


        this.matter.add.mouseSpring(this.light);

        for (let i = 0; i < this.cache.json.get('map').marks.length; i++) {
            eval(this.cache.json.get('map').marks[i])
        }

        for (let i = 0; i < this.cache.json.get('map').walls.length; i++) {
            eval(this.cache.json.get('map').walls[i])
        }

        for (let i = 0; i < this.cache.json.get('map').bots.length; i++) {
            eval(this.cache.json.get('map').bots[i])

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