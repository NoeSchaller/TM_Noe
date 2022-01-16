class Simul extends Phaser.Scene {

    constructor(that, map) {
        super('simulation');
        this.map = map
        this.parent = that
    }

    preload() {
        let me = this

        /* Le code suivant (jusqu'à xhr.send, ligne 42) provient en grande partie d'ici:
        https://webmasters.stackexchange.com/questions/83344/getting-error-uncaught-syntaxerror-unexpected-token-on-json-file */

        function processJSON(event) {
            var json = this.responseText;
            var pic = JSON.parse(json).pictures;
            for (let i = 0; i < pic.length; i++) {
                let isKey = false
                let path = ''
                for (let ii = 0; ii < pic[i].length; ii++) {
                    const element = pic[i][ii];
                    if (element == '\'') {
                        if (isKey) {
                            isKey = false
                        } else {
                            isKey = true
                        }
                    } else {
                        if (isKey) {
                            path += element
                        }
                    }
                }
                me.load.image(String(i), path)
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.map);
        xhr.addEventListener('load', processJSON);
        xhr.send();

        this.load.json('ultraShape', 'assets/ultraShape.json')
        this.load.json('bodyShape', 'assets/bodyShape.json')
        this.load.json('map', this.map)

        this.load.spritesheet('bodyPic', 'assets/body.png', { frameWidth: 200, frameHeight: 200 })
        this.load.spritesheet('ultra', 'assets/ultra.png', { frameWidth: 200, frameHeight: 200 })

        this.load.image('back', 'assets/back.jpg')
        this.load.image('wheel', 'assets/wheel.png')
        this.load.image('wall', 'assets/wall.png')
        this.load.image('mark', 'assets/mark.png')
        this.load.image('echelle', 'assets/scale.png')
    };

    create() {
        this.setup = this.cache.json.get('map')
        this.frame = 0
        this.light = []
        this.parent.Light = this.light
        this.marks = []
        this.walls = []


        this.matter.add.mouseSpring(this.light);

        for (let i = 0; i < this.cache.json.get('map').pictures.length; i++) {
            let commande = this.cache.json.get('map').pictures[i]
            let key = "(this, ".concat(String(i)).concat(", ")
            eval(commande.replace("(", key))
        }

        for (let i = 0; i < this.cache.json.get('map').marks.length; i++) {
            let commande = this.cache.json.get('map').marks[i]
            let key = "(this, "
            eval(commande.replace("(", key))
        }

        for (let i = 0; i < this.cache.json.get('map').walls.length; i++) {
            let commande = this.cache.json.get('map').walls[i]
            let key = "(this, "
            eval(commande.replace("(", key))
        }

        for (let i = 0; i < this.cache.json.get('map').bots.length; i++) {
            let commande = this.cache.json.get('map').bots[i]
            let key = "(this, "
            eval(commande.replace("(", key))
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