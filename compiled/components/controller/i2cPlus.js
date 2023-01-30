"use strict";
class I2cPlus {
    constructor(robot) {
        this.robot = robot;
        this.colors = [
            0xff0000, 0x00ff00, 0xffff00, 0x0000ff, 0xff00ff, 0x00ffff, 0xffffff,
            0x808080,
        ];
        this.buffer = [];
    }
    write(adresse, byte) {
        if (adresse == 0x10) {
            const register = byte[0];
            //gestion des moteur
            if (register == 0x00) {
                if (byte.length == 3) {
                    const dirL = byte[1], pL = byte[2];
                    this.robot.motorLeft.setSpeed(dirL, pL);
                }
                else if (byte.length >= 5) {
                    const dirL = byte[1], pL = byte[2], dirR = byte[3], pR = byte[4];
                    this.robot.motorLeft.setSpeed(dirL, pL);
                    this.robot.motorRight.setSpeed(dirR, pR);
                }
                this.buffer.push(this.robot.motorRight.power, this.robot.motorRight.direction, this.robot.motorLeft.power, this.robot.motorLeft.direction);
            }
            else if (register == 0x02) {
                const dirR = byte[1], pR = byte[2];
                this.robot.motorRight.setSpeed(dirR, pR);
                this.buffer.push(this.robot.motorRight.power, this.robot.motorRight.direction);
            }
            else if (register == 0x04) {
                this.buffer.push(this.robot.motorRight.angle % 256, (this.robot.motorRight.angle >> 8) % 256, this.robot.motorLeft.angle % 256, (this.robot.motorLeft.angle >> 8) % 256);
            }
            //gestion des leds rgb
            else if (register == 0x0b) {
                if (byte.length >= 3) {
                    const colorL = this.colors[byte[1] - 1], colorR = this.colors[byte[2] - 1];
                    this.robot.ledLeft.setColor(colorL);
                    this.robot.ledRight.setColor(colorR);
                }
                else if (byte.length == 2) {
                    const colorL = this.colors[byte[1] - 1];
                    this.robot.ledLeft.setColor(colorL);
                }
            }
            else if (register == 0x0c) {
                if (byte.length >= 2) {
                    const colorR = this.colors[byte[1] - 1];
                    this.robot.ledRight.setColor(colorR);
                }
            }
            // gestion des ir
            else if (register == 0x1d) {
                let byte = 0;
                if (this.robot.infraredLeft3.isMarked()) {
                    byte += 32;
                }
                if (this.robot.infraredLeft2.isMarked()) {
                    byte += 16;
                }
                if (this.robot.infraredLeft1.isMarked()) {
                    byte += 8;
                }
                if (this.robot.infraredRight1.isMarked()) {
                    byte += 4;
                }
                if (this.robot.infraredRight2.isMarked()) {
                    byte += 2;
                }
                if (this.robot.infraredRight3.isMarked()) {
                    byte += 1;
                }
                this.buffer.push(byte);
            }
        }
    }
    read(adresse, number) {
        if (adresse == 0x10) {
            let get = [];
            for (let i = 0; i < number; i++) {
                get.push(this.buffer[this.buffer.length - i - 1]);
            }
            return get;
        }
    }
}
