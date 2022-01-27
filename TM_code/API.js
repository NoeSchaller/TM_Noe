class simulation {
    constructor(width, height, id, map, background = 0xcccac0) {
        this.Light
        this.game = new Phaser.Game({
            width: width,
            height: height,
            backgroundColor: background,
            type: Phaser.CANVAS,
            canvas: document.getElementById(id),
            scene: [new Simul(this, map), Over],
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 0, x: 0 },
                    debug: 0
                }
            },
            plugins: {
                scene: [
                    {
                        key: 'PhaserRaycaster',
                        plugin: PhaserRaycaster,
                        mapping: 'raycasterPlugin'
                    }
                ]
            }
        });
    }
};

class botLight {
    constructor(that, name, x, y, angle) {
        this.robot = new robot(that, name, x, y, angle)
        this.i2c = new i2c(this.robot)
        this.pin13 = new pin(this.robot, 'irLeft')//irLeft
        this.pin14 = new pin(this.robot, 'irRight') // irRight
        this.pin8 = new pin(this.robot, 'LLed') //LLed
        this.pin12 = new pin(this.robot, 'RLed') // RLed
        this.pin1 // ultrason


        that.light.push(this)
    }
};

class i2c {
    constructor(bot) {
        this.bot = bot
    }


    /*
    adresse:
        0x10 = moteur
            commande
                0 = left or both
                2 = right
    */
    write(adresse, byte) {
        if (adresse == 0x10) {
            if (byte[0] == 0) {
                if (byte[1] == 0) {
                    this.bot.state.wheel.left = 0
                } else if (byte[1] == 1) {
                    this.bot.state.wheel.left = byte[2]
                } else if (byte[1] == 2) {
                    this.bot.state.wheel.left = -byte[2]
                }

                if (byte[3] == 0) {
                    this.bot.state.wheel.right = 0
                } else if (byte[3] == 1) {
                    this.bot.state.wheel.right = byte[4]
                } else if (byte[3] == 2) {
                    this.bot.state.wheel.right = -byte[4]
                }

            } else if (byte[0] == 2) {
                if (byte[1] == 0) {
                    this.bot.state.wheel.right = 0
                } else if (byte[1] == 1) {
                    this.bot.state.wheel.right = byte[2]
                } else if (byte[1] == 2) {
                    this.bot.state.wheel.right = -byte[2]
                }
            }
        }
    }
};

class pin {
    constructor(robot, id) {
        this.robot = robot
        this.id = id
    }

    read_digital() {
        if (this.id == 'RLed') {
            if (this.robot.state.led.right) { return true }
        } else if (this.id == 'LLed') {
            if (this.robot.state.led.left) { return true }
        } else if (this.id == 'irLeft') {
            if (this.robot.state.ir.left) { return true }
        } else if (this.id == 'irRight') {
            if (this.robot.state.ir.right) { return true }
        }
        return false
    }

    write_digital(set) {
        if (this.id == 'RLed') {
            this.robot.state.led.right = set
        } else if (this.id == 'LLed') {
            this.robot.state.led.left = set
        }
    }
}