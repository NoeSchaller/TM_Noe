class Simul extends Phaser.Scene {

    constructor () {
        super('simulation');
    }

    preload(){
        this.load.spritesheet('bodyPic', 'assets/body.png', {frameWidth: 200, frameHeight: 200})
        this.load.json('bodyShape', 'assets/bodyShape.json')
    
        this.load.spritesheet('ultra', 'assets/ultra.png', {frameWidth: 200, frameHeight: 200})
        this.load.json('ultraShape', 'assets/ultraShape.json')
    
        this.load.image('back','assets/back.jpg')
        this.load.image('wheel','assets/wheel.png')
        this.load.image('wall','assets/wall.png')
        this.load.image('mark','assets/mark.png')
        this.load.image('echelle','assets/scale.png')
        this.load.image('test','assets/irTest.png')
        this.load.image('test2','assets/irTest2.png')
    };
    
    create(){
        this.frame = 0
        this.robots = []
        this.marks = []
        this.walls = []
        

        //this.add.image(0,0,'back').setScale(2)
        
        this.matter.add.mouseSpring();

        new markPic(this,200,100, 'test2')
        new markPic(this,400,100, 'test')
        new wallRect(this, 600,0,800,200)
        this.rb = new robot(this, 'nb1', 400, 300, 0, 0.4)

        
        this.scene.launch('overlay')
        this.scene.launch('demo')
    };
    
    update(){
        this.rb.update(this)
        this.frame++
    };
}
