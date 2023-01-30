"use strict";
class Motor {
    constructor(scene, reference, x, y, width, height, point1, point2, powerToSpeed) {
        this.scene = scene;
        this.speed = 0;
        this.power = 0;
        this.direction = 0;
        this.radius = height / 20;
        this.angle = 0;
        this.powerToSpeed = powerToSpeed;
        this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
        const deltaPoint1 = Math.sqrt(point1.x ** 2 + point1.y ** 2), deltaPoint2 = Math.sqrt(point2.x ** 2 + point2.y ** 2);
        this.rotationOrigin = Math.atan2(y, x);
        const rotationPoint1 = Math.atan2(point1.y, point1.x), rotationPoint2 = Math.atan2(point2.y, point2.x);
        this.wheel = scene.matter.add
            .gameObject(scene.add.rectangle(reference.x +
            this.deltaOrigin *
                Math.cos(this.rotationOrigin + reference.rotation), reference.y +
            this.deltaOrigin *
                Math.sin(this.rotationOrigin + reference.rotation), width, height, 0x808080), scene.matter.add.rectangle(reference.x +
            this.deltaOrigin *
                Math.cos(this.rotationOrigin + reference.rotation), reference.y +
            this.deltaOrigin *
                Math.sin(this.rotationOrigin + reference.rotation), width, height))
            .setRotation(reference.rotation)
            .setDepth(2)
            .setFrictionAir(3);
        scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
            pointA: {
                x: (height / 2) * Math.sin(-reference.rotation),
                y: (height / 2) * Math.cos(-reference.rotation),
            },
            pointB: {
                x: deltaPoint1 * Math.cos(rotationPoint1 + reference.rotation),
                y: deltaPoint1 * Math.sin(rotationPoint1 + reference.rotation),
            },
        });
        scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
            pointA: {
                x: (height / 2) * Math.sin(-reference.rotation),
                y: (height / 2) * Math.cos(-reference.rotation),
            },
            pointB: {
                x: deltaPoint2 * Math.cos(rotationPoint2 + reference.rotation),
                y: deltaPoint2 * Math.sin(rotationPoint2 + reference.rotation),
            },
        });
        scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
            pointA: {
                x: (height / 2) * Math.sin(reference.rotation),
                y: (-height / 2) * Math.cos(reference.rotation),
            },
            pointB: {
                x: deltaPoint1 * Math.cos(rotationPoint1 + reference.rotation),
                y: deltaPoint1 * Math.sin(rotationPoint1 + reference.rotation),
            },
        });
        scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
            pointA: {
                x: (height / 2) * Math.sin(reference.rotation),
                y: (-height / 2) * Math.cos(reference.rotation),
            },
            pointB: {
                x: deltaPoint2 * Math.cos(rotationPoint2 + reference.rotation),
                y: deltaPoint2 * Math.sin(rotationPoint2 + reference.rotation),
            },
        });
    }
    setSpeed(direction, power) {
        if (power >= 0 && power <= 255) {
            this.direction = direction;
            this.power = power;
            const speed = this.powerToSpeed(power) * this.radius * (12 / 100);
            if (speed < 0) {
                this.speed = 0;
            }
            if (direction == 0) {
                this.speed = 0;
            }
            else if (direction == 1) {
                this.speed = speed;
            }
            else if (direction == 2) {
                this.speed = -speed;
            }
        }
    }
    update() {
        const deltaX = this.wheel.x - this.wheel.body.positionPrev.x, deltaY = this.wheel.y - this.wheel.body.positionPrev.y, rotationSpeed = Math.round((Math.sqrt(deltaX ** 2 + deltaY ** 2) / this.radius) *
            (100 / 12) *
            5.6 *
            100) / 100;
        this.angle += Math.round((rotationSpeed / Math.PI) * 2 * 80);
        this.wheel.body.positionImpulse.x =
            Math.cos(this.wheel.rotation - Math.PI / 2) * this.speed;
        this.wheel.body.positionImpulse.y =
            Math.sin(this.wheel.rotation - Math.PI / 2) * this.speed;
    }
}
