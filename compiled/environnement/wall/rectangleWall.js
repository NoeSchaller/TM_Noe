"use strict";
class RectangleWall {
    constructor(scene, x, y, width, height, angle = 0) {
        this.type = "wall";
        this.shape = "rectangle";
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = angle;
        this.body = scene.matter.add
            .gameObject(scene.add.rectangle(x, y, width, height, 0xff0000))
            .setStatic(true)
            .setAngle(angle);
        scene.walls.push(this);
        scene.RaycasterDomain.push(this.body);
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
