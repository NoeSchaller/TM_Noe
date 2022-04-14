class markRect {
  constructor(scene, x, y, width, height, angle = 0) {
    this.picture = "geom";
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

class markCircle {
  constructor(scene, x, y, radius) {
    this.picture = "geom";
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(
        scene.add.circle(x, y, radius, 0x000000),
        scene.matter.add.circle(x, y, radius)
      )
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

class markPoly {
  constructor(scene, x, y, points) {
    this.picture = "geom";
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

class markPic {
  constructor(scene, key, x, y, angle = 0, scaleX = 1, scaleY = 1) {
    this.picture = key;
    this.position = { x: x, y: y };
    this.scale = { x: scaleX, y: scaleY };
    this.angle = angle;
    this.body = scene.matter.add
      .image(x, y, key)
      .setCollidesWith(0)
      .setScale(scaleX, scaleY)
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