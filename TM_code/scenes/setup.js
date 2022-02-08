class Setup extends Phaser.Scene {

    constructor(width, height) {
        super('setup');
        this.width = width
        this.height = height
    }

    init(data) {
        this.simulation = data
    }

    preload() {
        this.load.image('echelle', 'assets/scale.png')
    }

    create() {
        this.echelle = this.add.image(70, this.height - 30, 'echelle')

        this.mapjs = ''
        this.mouse = this.input.mousePointer
        this.lastForm
        this.print = false
        this.cancel = false
        this.now = 0

        this.buttons = []

        this.add.rectangle(this.width - 40, this.height / 2, 80, this.height, 0x999999)

        this.cursor = this.add.circle(this.width - 40, 40, 5, 0xffffff).setDepth(1)

        for (let i = 0; i < 4; i++) {
            let color
            if (i < 2) {
                color = 0xff0000
            } else {
                color = 0x000000
            }

            if (i % 2 == 0) {
                this.buttons.push(
                    this.add.rectangle(this.width - 40, 40 + 60 * (i), 40, 40, color)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.now = i
                            this.cursor.setPosition(this.width - 40, 40 + 60 * (i))
                        }))
            } else {
                this.buttons.push(
                    this.add.circle(this.width - 40, 40 + 60 * (i), 20, color)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.now = i
                            this.cursor.setPosition(this.width - 40, 40 + 60 * (i))
                        }))
            }
        }

        for (let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];
            button.isStroked = 1
            button.strokeColor = 0x000000
            button.lineWidth = 2
        }
    }

    update() {
        let inputs = this.input.keyboard.addKeys({
            space: 'space'
        });

        if (inputs.space.isDown) { this.cancel = true }

        if (this.mouse.isDown && this.mouse.downX < this.width - 80) {
            if (this.lastForm !== undefined) {
                this.lastForm.destroy()
            }
            if (!this.cancel) {
                if (this.print == false) {
                    this.mouse.worldDownX = this.mouse.worldX
                    this.mouse.worldDownY = this.mouse.worldY
                }

                this.deltaX = this.mouse.worldX - this.mouse.worldDownX
                this.deltaY = this.mouse.worldY - this.mouse.worldDownY

                if (this.now == 0) {
                    this.centerX = this.mouse.worldDownX + this.deltaX / 2
                    this.centerY = this.mouse.worldDownY + this.deltaY / 2

                    this.lastForm = this.simulation.add.rectangle(this.centerX, this.centerY, this.deltaX, this.deltaY, 0xff0000, 0.2)

                    this.toPrint = "new wallRect(this.simulation, this.centerX, this.centerY, this.deltaX, this.deltaY)"

                    this.toAdd = "new wallRect(scene, "+ String(this.centerX) +"," + String(this.centerY) +"," + String(this.deltaX) + "," + String(this.deltaY) +")"
                }

                if (this.now == 1) {
                    this.radius = Math.sqrt(this.deltaX ** 2 + this.deltaY ** 2)

                    this.lastForm = this.simulation.add.circle(this.mouse.worldDownX, this.mouse.worldDownY, this.radius, 0xff0000, 0.2)

                    this.toPrint = "new wallCircle(this.simulation, this.mouse.worldDownX, this.mouse.worldDownY, this.radius)"

                    this.toAdd = "new wallCircle(scene, " + String(this.mouse.worldDownX) + "," + String(this.mouse.worldDownY) + "," + String(this.radius) + ")"
                }

                if (this.now == 2) {
                    this.centerX = this.mouse.worldDownX + this.deltaX / 2
                    this.centerY = this.mouse.worldDownY + this.deltaY / 2

                    this.lastForm = this.simulation.add.rectangle(this.centerX, this.centerY, this.deltaX, this.deltaY, 0x000000, 0.5)

                    this.toPrint = "new markRect(this.simulation, this.centerX, this.centerY, this.deltaX, this.deltaY)"

                    this.toAdd = "new markRect(scene, " + String(this.centerX) + "," + String(this.centerY) + "," + String(this.deltaX) + "," + String(this.deltaY) + ")"
                }


                if (this.now == 3) {
                    this.radius = Math.sqrt(this.deltaX ** 2 + this.deltaY ** 2)

                    this.lastForm = this.simulation.add.circle(this.mouse.worldDownX, this.mouse.worldDownY, this.radius, 0x555555, 0.5)

                    this.toPrint = "new markCircle(this.simulation, this.mouse.worldDownX, this.mouse.worldDownY, this.radius)"
                    this.toAdd = "new markCircle(scene, " + String(this.mouse.worldDownX) + "," + String(this.mouse.worldDownY) + "," + String(this.radius) + ")"
                }
                this.print = true
            } else {
                this.print = false
            }
        } else {
            this.cancel = false
        }
        
        if (this.print && !this.mouse.isDown && !this.cancel) {
            eval(this.toPrint)
            this.mapjs += this.toAdd
            this.mapjs += "\n"
            console.log(this.mapjs)
            this.print = false
        }


        if (this.now == 0) {

        }
    }
}