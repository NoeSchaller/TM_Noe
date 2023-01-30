"use strict";
class PolygoneMark {
    constructor(scene, x, y, points) {
        this.type = "mark";
        this.shape = "polygone";
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = 0;
        this.body = scene.matter.add
            .gameObject(scene.add.polygon(x, y, points, 0x000000), {
            shape: { type: "fromVerts", verts: points, flagInternal: true },
        })
            .setStatic(true)
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
