"use strict";
class CircleWall {
    constructor(scene, x, y, radius) {
        this.type = "wall";
        this.shape = "circle";
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = 0;
        this.body = scene.matter.add
            .gameObject(scene.add.circle(x, y, radius, 0xff0000), scene.matter.add.circle(x, y, radius))
            .setStatic(true)
            .setFriction(1);
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
