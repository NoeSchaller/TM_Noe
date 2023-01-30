"use strict";
class PolygoneWall {
    constructor(scene, x, y, points) {
        this.type = "wall";
        this.shape = "polygone";
        this.position = { x: x, y: y };
        this.scale = { x: 1, y: 1 };
        this.angle = 0;
        this.body = scene.matter.add
            .gameObject(scene.add.polygon(x, y, points, 0xff0000), {
            shape: { type: "fromVerts", verts: points, flagInternal: true },
        })
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
