class Demo extends Phaser.Scene {

    constructor() {
        super('demo');
    }

    preload() {
    }

    create() {
        this.simulation = game.scene.keys.simulation

        this.add.text(520, 10, 'Lwheel', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                if (this.simulation.robots[0].state.wheel.left.on) {
                    this.simulation.robots[0].state.wheel.left.on = false
                } else {
                    this.simulation.robots[0].state.wheel.left.on = true
                }
            })

        this.add.text(520, 35, '+', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                this.simulation.robots[0].state.wheel.left.speed += 1
            })

        this.add.text(560, 35, '-', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                this.simulation.robots[0].state.wheel.left.speed -= 1
            })



        this.add.text(520, 60, 'Rwheel', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                if (this.simulation.robots[0].state.wheel.right.on) {
                    this.simulation.robots[0].state.wheel.right.on = false
                } else {
                    this.simulation.robots[0].state.wheel.right.on = true
                }
            })

        this.add.text(520, 85, '+', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                this.simulation.robots[0].state.wheel.right.speed += 1
            })

        this.add.text(560, 85, '-', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                this.simulation.robots[0].state.wheel.right.speed -= 1
            })


        this.add.text(520, 115, 'LLed', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                if (this.simulation.robots[0].state.led.left) {
                    this.simulation.robots[0].state.led.left = false
                } else {
                    this.simulation.robots[0].state.led.left = true
                }
            })

        this.add.text(520, 145, 'RLed', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                if (this.simulation.robots[0].state.led.right) {
                    this.simulation.robots[0].state.led.right = false
                } else {
                    this.simulation.robots[0].state.led.right = true
                }
            })

        this.ray = false
        this.add.text(520, 175, 'Distance', { color: '#000', backgroundColor: '#999', padding: 3 })
            .setInteractive().on('pointerdown', () => {
                if (this.ray) {
                    this.ray = false
                } else {
                    this.ray = true
                }
            })
    }

    update() {
        if (this.ray) {
            console.log(this.simulation.robots[0].getDistance())
        }
    }
}