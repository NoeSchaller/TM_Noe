class robot {
    constructor(that, id, x, y, angle = 0) {
        //mise  en place de variable utilisables plus tard
        this.scale = 0.4
        this.frottement = 0

        this.LastPosL = { x: x - (89) * this.scale, y: y + (45) * this.scale }
        this.LastPosR = { x: x + (89) * this.scale, y: y + (45) * this.scale }

        this.state = { wheel: { left: 0, right: 0 }, led: { left: 0, right: 0 }, ir: { left: 0, right: 0 }, id: id }

        //mise en place du "corps" du robot
        this.body = that.matter.add.sprite(x, y, 'bodyPic', '', { shape: that.cache.json.get('bodyShape').body }).setFrictionAir(0)
        this.Lwheel = that.matter.add.image(x - (89) * this.scale, y + (45) * this.scale, 'wheel').setFrictionAir(0.5)
        this.Rwheel = that.matter.add.image(x + (89) * this.scale, y + (45) * this.scale, 'wheel').setFrictionAir(0.5)

        //la roue gauche est attachée au corps
        that.matter.add.constraint(this.body, this.Lwheel, 'undefined', 1, {
            pointA: { x: -70 * this.scale, y: -13 * this.scale },
            pointB: { x: -13 * this.scale, y: 58 * this.scale }
        })
        that.matter.add.constraint(this.body, this.Lwheel, 'undefined', 1, {
            pointA: { x: -70 * this.scale, y: 102 * this.scale },
            pointB: { x: -13 * this.scale, y: -58 * this.scale }
        })
        that.matter.add.constraint(this.body, this.Lwheel, 'undefined', 1, {
            pointA: { x: -70 * this.scale, y: 102 * this.scale },
            pointB: { x: -13 * this.scale, y: 58 * this.scale }
        })
        that.matter.add.constraint(this.body, this.Lwheel, 'undefined', 1, {
            pointA: { x: -70 * this.scale, y: -13 * this.scale },
            pointB: { x: -13 * this.scale, y: -58 * this.scale }
        })

        // la roue droite est attachée au corps
        that.matter.add.constraint(this.body, this.Rwheel, 'undefined', 1, {
            pointA: { x: 70 * this.scale, y: -13 * this.scale },
            pointB: { x: 13 * this.scale, y: 58 * this.scale }
        })
        that.matter.add.constraint(this.body, this.Rwheel, 'undefined', 1, {
            pointA: { x: 70 * this.scale, y: 102 * this.scale },
            pointB: { x: 13 * this.scale, y: -58 * this.scale }
        })
        that.matter.add.constraint(this.body, this.Rwheel, 'undefined', 1, {
            pointA: { x: 70 * this.scale, y: 102 * this.scale },
            pointB: { x: 13 * this.scale, y: 58 * this.scale }
        })
        that.matter.add.constraint(this.body, this.Rwheel, 'undefined', 1, {
            pointA: { x: 70 * this.scale, y: -13 * this.scale },
            pointB: { x: 13 * this.scale, y: -58 * this.scale }
        })
        //mise en place du capteur ultrason
        this.ultra = that.matter.add.sprite(x, y - 4080 * this.scale, 'ultra', '', { shape: that.cache.json.get('ultraShape').ultra }).setScale(this.scale / 8 * 250).setCollidesWith(0).setVisible(false)

        this.raycaster = that.raycasterPlugin.createRaycaster()
        this.raycaster.mapGameObjects(that.walls)
        this.rayCone = this.raycaster.createRay({
            origin: {
                x: x,
                y: y - 100 * this.scale
            },
            autoSlice: true,
            collisionRange: 2550
        })
            .setConeDeg(60)
            .setAngleDeg(this.body.angle - 90)

        this.raycaster.mapGameObjects(that.walls, true);

        this.intersections = this.rayCone.castCone();
        this.rayCone.enablePhysics('matter');

        //mise en place des capteurs infrarouges
        this.irL = that.matter.add.gameObject(
            that.add.circle(
                x - 18 * this.scale, y - 40 * this.scale,
                5 * this.scale,
                0xffffff
            ),
            that.matter.add.circle(
                x - 18 * this.scale,
                y - 40 * this.scale,
                1)
        ).setCollidesWith(0).setDepth(2)

        this.irR = that.matter.add.gameObject(
            that.add.circle(
                x - 18 * this.scale,
                y - 40 * this.scale,
                5 * this.scale,
                0xffffff),
            that.matter.add.circle(
                x + 18 * this.scale,
                y - 40 * this.scale,
                1)
        ).setCollidesWith(0).setDepth(2)

        //mise en place des leds
        this.LLed = that.add.circle(
            x - 45 * this.scale,
            y - 80 * this.scale,
            10 * this.scale,
            0x500000
        ).setDepth(2)
        this.RLed = that.add.circle(x + 45 * this.scale,
            y - 80 * this.scale,
            10 * this.scale,
            0x500000
        ).setDepth(2)

        // adaptation de l'angle et de l'échelle en fonction des paramètres
        this.component = that.add.group([this.irL, this.irR, this.ultra, this.LLed, this.RLed])

        this.bot = that.add.group([this.body, this.Lwheel, this.Rwheel])

        this.bot.scaleXY(this.scale - 1, this.scale - 1)
        this.bot.angle(angle)
        this.bot.setDepth(1)
        this.bot.rotateAround({ x: x, y: y }, angle / 360 * 2 * Math.PI)
    };

    setWheel(that) {
        this.Lwheel.setVelocity(
            Math.cos(this.Lwheel.rotation - Math.PI / 2) * this.state.wheel.left,
            Math.sin(this.Lwheel.rotation - Math.PI / 2) * this.state.wheel.left)

        if (this.state.wheel.left == 0) {
            if (that.frame % this.frottement == 0) {
                this.Lwheel.setVelocity(0, 0).setPosition(this.LastPosL.x, this.LastPosL.y)
            }
        }

        this.Rwheel.setVelocity(
            Math.cos(this.Rwheel.rotation - Math.PI / 2) * this.state.wheel.right,
            Math.sin(this.Rwheel.rotation - Math.PI / 2) * this.state.wheel.right)

        if (this.state.wheel.left == 0) {
            if (that.frame % this.frottement == 0) {
                this.Rwheel.setVelocity(0, 0).setPosition(this.LastPosR.x, this.LastPosR.y)
            }
        }
        this.LastPosR = { x: this.Rwheel.x, y: this.Rwheel.y }
        this.LastPosL = { x: this.Lwheel.x, y: this.Lwheel.y }

    };

    seeLed() {
        if (this.state.led.left) {
            this.LLed.fillColor = 0xff0000
        } else {
            this.LLed.fillColor = 0x500000
        }

        if (this.state.led.right) {
            this.RLed.fillColor = 0xff0000
        } else {
            this.RLed.fillColor = 0x500000
        }
    };

    setIrColor(that) {
        if (this.SeeIrL(that)) {
            this.irL.fillColor = 0xffffff
            this.state.ir.left = 1
        } else {
            this.irL.fillColor = 0x404040
            this.state.ir.left = 0
        }

        if (this.SeeIrR(that)) {
            this.irR.fillColor = 0xffffff
            this.state.ir.right = 1
        } else {
            this.irR.fillColor = 0x404040
            this.state.ir.right = 0
        }
    };

    SeeIrL(that) {
        for (let i = 0; i < that.marks.length; i++) {

            if (that.matter.overlap(this.irL, that.marks[i].body)) {
                var color = that.textures.getPixel(
                    (this.irL.x - that.marks[i].pos.x + that.marks[i].body.width * that.marks[i].scale.x / 2) / that.marks[i].scale.x,
                    (this.irL.y - that.marks[i].pos.y + that.marks[i].body.width * that.marks[i].scale.y / 2) / that.marks[i].scale.y,
                    that.marks[i].pic)
                if (
                    color == null) {
                } else {
                    if (
                        color.v < 0.2 & color.a != 0) {
                        return true
                    }
                }
            }
        }
        return false
    };

    SeeIrR(that) {
        for (let i = 0; i < that.marks.length; i++) {
            if (that.matter.overlap(this.irR, that.marks[i].body)) {
                var color = that.textures.getPixel(
                    (this.irR.x - that.marks[i].pos.x + that.marks[i].body.width * that.marks[i].scale.x / 2
                    ) / that.marks[i].scale.x,
                    (this.irR.y - that.marks[i].pos.y + that.marks[i].body.width * that.marks[i].scale.y / 2
                    ) / that.marks[i].scale.y,
                    that.marks[i].pic)
                if (
                    color == null) {
                } else if (
                    color.v < 0.2 & color.a != 0) {
                    return true
                }
            }
        }
        return false
    };

    getDistance() {
        let distances = []
        let distance
        this.intersections = this.rayCone.castCone();
        for (let i = 0; i < this.intersections.length; i++) {
            distance = Math.sqrt(
                (this.intersections[i].x - this.rayCone.origin.x) ** 2
                + (this.intersections[i].y - this.rayCone.origin.y) ** 2)
            distances.push(Math.round(distance))
        }
        let min = Math.min(...distances)
        if (min < 2550) {
            return Math.round(min / 10)
        } else {
            return 255
        }

    }


    setComponent() {
        this.irL.setPosition(this.body.x - 18 * this.scale, this.body.y - 40 * this.scale)
        this.irR.setPosition(this.body.x + 18 * this.scale, this.body.y - 40 * this.scale)

        this.ultra.setPosition(this.body.x, this.body.y - 4080 * this.scale)
        this.ultra.setAngle(this.body.angle)

        this.rayCone.setOrigin(
            this.body.x + 100 * Math.sin(this.body.rotation) * this.scale,
            this.body.y - 100 * Math.cos(this.body.rotation) * this.scale)
            .setAngleDeg(this.body.angle - 90)

        this.LLed.setPosition(this.body.x - 45 * this.scale, this.body.y - 80 * this.scale)
        this.RLed.setPosition(this.body.x + 45 * this.scale, this.body.y - 80 * this.scale)

        this.component.rotateAround({ x: this.body.x, y: this.body.y }, this.body.rotation)


    };

    update(that) {
        this.setWheel(that)
        this.seeLed()
        this.setComponent()
        this.setIrColor(that)
    }

}



class wallRect {
    constructor(that, x, y, width, heigth) {
        this.body = that.matter.add.gameObject(
            that.add.rectangle(
                x,
                y,
                width,
                heigth,
                0xff00000)
        ).setStatic(true)

        that.walls.push(this.body)
    }
}

class markRect {
    constructor(that, x, y, width, height) {
        this.pic = 'mark'
        this.pos = { x: x, y: y }
        this.scale = { x: width * 20, y: height * 20 }
        this.body = that.matter.add.image(y, x, 'mark')
            .setScale(width, height)
            .setCollidesWith(0)

        that.marks.push(this)
    }
}
class Picture {
    constructor(that, key, x, y) {
        this.pic = String(key)
        this.pos = { x: x, y: y }
        this.scale = { x: 1, y: 1 }
        this.body = that.matter.add.image(x, y, key).setCollidesWith(0)

        that.marks.push(this)
    }
}


















class Camera {
    constructor(that, simulation) {
        this.cam = simulation.cameras.main
        this.follow = 0
        this.cursor = that.add.text(0, 0, '<=', { color: '#000', fontSize: 20 })

        that.add.text(10, 10, '+', { color: '#000', backgroundColor: '#fff', padding: 1, fontSize: 40 })
            .setInteractive().on('pointerdown', () => {
                this.cam.zoom *= 1.2,
                    that.echelle.scale *= 1.2
            },

                that.add.text(10, 60, '-', { color: '#000', backgroundColor: '#fff', padding: 1, fontSize: 40 })
                    .setInteractive().on('pointerdown', () => {
                        this.cam.zoom /= 1.2,
                            that.echelle.scale /= 1.2
                    }),

                that.buttons.push(that.add.text(10, 110, 'Free', { color: '#000', backgroundColor: '#999', padding: 3 })
                    .setInteractive().on('pointerdown', () => {
                        this.follow = -1, this.cursor.setPosition(15 + that.buttons[0].width, 110), this.cam.stopFollow()
                    }))
            )


        for (let i = 0; i < simulation.light.length; i++) {
            that.buttons.push(
                that.add.text(
                    10,
                    140 + 30 * i,
                    simulation.light[i].robot.state.id,
                    { color: '#000', backgroundColor: '#999', padding: 3 }
                )
                    .setInteractive().on('pointerdown', () => {
                        this.follow = i,
                            this.cursor.setPosition(
                                15 + that.buttons[i + 1].width,
                                140 + 30 * i)
                    }))
        }

        this.cursor.setPosition(15 + that.buttons[1].width, 140)
    };

    update(sim) {
        let inputs = sim.input.keyboard.addKeys({
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right'
        });

        if (this.follow == -1) {
            if (inputs.up.isDown) {
                this.cam.scrollY -= 5
            }
            else if (inputs.down.isDown) {
                this.cam.scrollY += 5
            }

            if (inputs.left.isDown) {
                this.cam.scrollX -= 5
            }
            else if (inputs.right.isDown) {
                this.cam.scrollX += 5
            }

        } else {
            this.cam.startFollow(sim.light[this.follow].robot.body);
        }

    }
}