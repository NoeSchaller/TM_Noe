"use strict";
class Picture {
    constructor(scene, key, x, y, angle = 0) {
        this.type = "picture";
        this.shape = "rectangle";
        this.picture = key;
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = angle;
        this.body = scene.matter.add
            .image(x, y, key)
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
