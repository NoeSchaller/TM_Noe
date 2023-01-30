"use strict";
class RectangleMark {
    constructor(scene, x, y, width, height, angle = 0) {
        this.type = "mark";
        this.shape = "rectangle";
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = angle;
        this.body = scene.matter.add
            .gameObject(scene.add.rectangle(x, y, width, height, 0x000000))
            .setCollidesWith(0)
            .setAngle(angle);
        scene.marks.push(this);
    }
    setPosition(x, y) {
        this.body.setPosition(x, y);
        this.position = { x: x, y: y };
    }
    setAngle(deg) {
        this.body.setAngle(deg);
        this.angle = deg;
    }
    setScale(x, y) {
        this.body.setAngle(0);
        this.body.setScale(x, y);
        this.body.setAngle(this.angle);
        this.scale = { x: x, y: y };
    }
}
