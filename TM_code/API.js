class simulation {
    constructor(width, height, map) {
        this.Light = ''
        this.game = new Phaser.Game({
            width: width,
            height: height,
            backgroundColor: 0xcccac0,
            type: Phaser.AUTO,
            scene: [new Simul(this, map), Over],
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 0, x: 0 },
                    debug: 0
                }
            },
            render: {},
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
        this.pin13 = new pinIr(this.robot, 'left')//irLeft
        this.pin14 = new pinIr(this.robot, 'right') // irRight
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
    write(adresse, commande, byte) {
        if (adresse == 16) {
            if (commande == 0) {
                if (byte[0] == 0) {
                    this.bot.state.wheel.left = 0
                } else {
                    if (byte[0] == 1) {
                        this.bot.state.wheel.left = byte[1]
                    } else {
                        if (byte[0] == 2) {
                            this.bot.state.wheel.left = -byte[1]
                        }
                    }
                }

                if (byte[2] == 0) {
                    this.bot.state.wheel.right = 0
                } else {
                    if (byte[2] == 1) {
                        this.bot.state.wheel.right = byte[3]
                    } else {
                        if (byte[2] == 2) {
                            this.bot.state.wheel.right = -byte[3]
                        }
                    }
                }
            } else {
                if (commande == 2) {
                    if (byte[0] == 0) {
                        this.bot.state.wheel.right = 0
                    } else {
                        if (byte[0] == 1) {
                            this.bot.state.wheel.right = byte[1]
                        } else {
                            if (byte[0] == 2) {
                                this.bot.state.wheel.right = -byte[1]
                            }
                        }
                    }
                }
            }
        }

    }
};

class pinIr {
    constructor(link, ir) {
        this.link = link
        this.ir = ir
    }

    read_digital() {
        if (this.ir == 'left') {
            if (this.link.state.ir.left) { return true }
            if (this.link.state.ir.left) { return true }
            if (this.link.state.ir.left) { return true }
            if (this.link.state.ir.left) { return true }
        } else {
            if (this.ir == 'right') {
                if (this.link.state.ir.right) { return true }
                if (this.link.state.ir.right) { return true }
                if (this.link.state.ir.right) { return true }
                if (this.link.state.ir.right) { return true }
            }
        }
        return false
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
        } else {
            if (this.id == 'LLed') {
                if (this.robot.state.led.left) { return true }
            }
        }
    }

    write_digital(set) {
        if (this.id == 'RLed') {
            this.robot.state.led.right = set
        } else {
            if (this.id == 'LLed') {
                this.robot.state.led.left = set
            }
        }
    }
}