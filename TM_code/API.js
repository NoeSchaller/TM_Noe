let simul = game.scene.keys.simulation

class botLight{
    constructor(that, name, x, y, angle){
        this.robot = new robot(that, name, x, y, angle)
        this.i2c = new i2c(this.robot)
        //this.pin13.read_digital = this.robot.SeeIrL //irLeft
        //this.pin14.read_digital = this.robot.SeeIrL // irRight
        //this.pin8.write_digital() = this.robot.setLed //LLed
        this.pin12 = 1 // RLed
        this.pin1 // ultrason


        that.robots.push(this)
    }
};

class i2c{
    constructor(bot){
        this.bot = bot
    }
    

    /*
    adresse:
        0x10 = moteur
            commande
                0 = left or both
                2 = right
    */
    write(adresse, commande, byte1, byte2, byte3, byte4){
        if(adresse == 16){
            if(commande == 0){
                if(byte1 == 0){
                    this.bot.state.wheel.left = 0
                }else{
                    if(byte1 == 1){
                        this.bot.state.wheel.left = byte2
                    }else{
                        if(byte1 == 2){
                            this.bot.state.wheel.left = -byte2
                        }
                    }
                }

                if(byte3 == 0){
                    this.bot.state.wheel.right = 0
                }else{
                    if(byte3 == 1){
                        this.bot.state.wheel.right = byte4
                    }else{
                        if(byte3 == 2){
                            this.bot.state.wheel.right = -byte4
                        }
                    }
                }
            }else{
                if(commande == 2){
                    if(byte1 == 0){
                        this.bot.state.wheel.right = 0
                    }else{
                        if(byte1 == 1){
                            this.bot.state.wheel.right = byte2
                        }else{
                            if(byte1 == 2){
                                this.bot.state.wheel.right = -byte2
                            }
                        }
                    }
                }
            }
        }
            
    }
};

class pin{
    constructor(link){
        this.link = link
    }

    read_digital(){
        return this.link
    }
};