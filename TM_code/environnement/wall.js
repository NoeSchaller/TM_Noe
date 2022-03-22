class wallRect {
  constructor(scene, x, y, width, heigth, angle = 0) {
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = angle;
    this.body = scene.matter.add
      .gameObject(scene.add.rectangle(x, y, width, heigth, 0xff00000))
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
    this.angle = angle;
  }

  setScale(x, y) {
    this.body.setScale(x, y);
    this.scale = { x: x, y: y };
  }
}

class wallCircle {
  constructor(scene, x, y, radius) {
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(
        scene.add.circle(x, y, radius, 0xff0000),
        scene.matter.add.circle(x, y, radius)
      )
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
    this.angle = angle;
  }

  setScale(x, y) {
    this.body.setScale(x, y);
    this.scale = { x: x, y: y };
  }
}
