"use strict";
class CircleMark {
    constructor(scene, x, y, radius) {
        this.type = "mark";
        this.shape = "circle";
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = 0;
        this.body = scene.matter.add
            .gameObject(scene.add.circle(x, y, radius, 0x000000), scene.matter.add.circle(x, y, radius))
            .setCollidesWith(0);
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
