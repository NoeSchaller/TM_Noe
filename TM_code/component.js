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
        if (eval(this.id)) {
            return true
        }
        return false
    }

    write_digital(set) {
        eval(this.id + '=' + String(set))
    }
}



