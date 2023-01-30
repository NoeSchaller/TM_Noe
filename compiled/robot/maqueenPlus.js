"use strict";
class MaqueenPlus {
    constructor(scene, name, x, y, angle) {
        //mise  en place de variables
        this.name = name;
        this.type = "maqueenPlus";
        this.angle = angle;
        this.position = { x: x, y: y };
        //mise en place de l'élément body
        this.body = scene.matter.add
            .sprite(x, y, "plusBodyPic", undefined, {
            shape: scene.cache.json.get("plusShape").body,
        })
            .setFrictionAir(0)
            .setDepth(2)
            .setAngle(angle);
        //mise en place des moteurs
        let speedGrowth = function (power) {
            return (-1e-8 * power ** 4 +
                1e-5 * power ** 3 -
                0.0032 * power ** 2 +
                0.4053 * power -
                2.8394);
        };
        this.motorLeft = new Motor(scene, this.body, -45, 27, 9, 43, { x: -10, y: 5 }, { x: -10, y: 49 }, speedGrowth);
        this.motorRight = new Motor(scene, this.body, 45, 27, 9, 43, { x: 10, y: 5 }, { x: 10, y: 49 }, speedGrowth);
        //mise en place du capteur ultrason
        this.ultrasonic = new Ultrasonic(scene, this.body, 0, -21);
        //mise en place des capteurs infrarouges
        this.infraredLeft1 = new Infrared(scene, this.body, -5, -31);
        this.infraredLeft2 = new Infrared(scene, this.body, -15, -31);
        this.infraredLeft3 = new Infrared(scene, this.body, -45, -11);
        this.infraredRight1 = new Infrared(scene, this.body, 5, -31);
        this.infraredRight2 = new Infrared(scene, this.body, 15, -31);
        this.infraredRight3 = new Infrared(scene, this.body, 45, -11);
        //mise en place des leds rgb
        this.ledLeft = new RgbLed(scene, this.body, -20, -45);
        this.ledRight = new RgbLed(scene, this.body, 20, -45);
        //mise en place de l'i2c
        this.i2c = new I2cPlus(this);
        // ajout du robot à la liste des robots
        scene.robots.push(this);
    }
    getDistance() {
        return this.ultrasonic.getDistance();
    }
    update() {
        this.motorLeft.update();
        this.motorRight.update();
        this.ultrasonic.update();
        this.infraredLeft1.update();
        this.infraredLeft2.update();
        this.infraredLeft3.update();
        this.infraredRight1.update();
        this.infraredRight2.update();
        this.infraredRight3.update();
        this.ledLeft.update();
        this.ledRight.update();
        this.position = { x: this.body.x, y: this.body.y };
        this.angle = this.body.angle;
    }
    setPosition(x, y) {
        this.body.setPosition(x, y);
        this.motorLeft.wheel.setPosition(x +
            this.motorLeft.deltaOrigin *
                Math.cos(this.motorLeft.rotationOrigin + this.body.rotation), y +
            this.motorLeft.deltaOrigin *
                Math.sin(this.motorLeft.rotationOrigin + this.body.rotation));
        this.motorRight.wheel.setPosition(x +
            this.motorRight.deltaOrigin *
                Math.cos(this.motorRight.rotationOrigin + this.body.rotation), y +
            this.motorRight.deltaOrigin *
                Math.sin(this.motorRight.rotationOrigin + this.body.rotation));
    }
    setAngle(deg) {
        this.body.setAngle(deg);
        this.motorLeft.wheel.setPosition(this.body.x +
            this.motorLeft.deltaOrigin *
                Math.cos((deg / 180) * Math.PI + this.motorLeft.rotationOrigin), this.body.y +
            this.motorLeft.deltaOrigin *
                Math.sin((deg / 180) * Math.PI + this.motorLeft.rotationOrigin));
        this.motorLeft.wheel.setAngle(deg);
        this.motorRight.wheel.setPosition(this.body.x +
            this.motorRight.deltaOrigin *
                Math.cos((deg / 180) * Math.PI + this.motorRight.rotationOrigin), this.body.y +
            this.motorRight.deltaOrigin *
                Math.sin((deg / 180) * Math.PI + this.motorRight.rotationOrigin));
        this.motorRight.wheel.setAngle(deg);
    }
}
