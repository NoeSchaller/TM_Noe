class wallRect {
  constructor(scene, x, y, width, height, angle = 0) {
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
    this.angle = deg;
  }

  setScale(x, y) {
    this.body.setAngle(0);
    this.body.setScale(x, y);
    this.body.setAngle(this.angle);
    this.scale = { x: x, y: y };
  }
}

class wallPoly {
  constructor(scene, x, y, points) {
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

class wallPic {
  constructor(scene, key, x, y, resolution, angle = 0, scaleX = 1, scaleY = 1) {
    this.picture = key;
    this.position = { x: x, y: y };
    this.scale = { x: scaleX, y: scaleY };
    this.angle = angle;

    for (
      let ix = resolution;
      ix < eval(`scene.textures.list.${key}.source[0].width`);
      ix += resolution
    ) {
      for (
        let iy = resolution;
        iy < eval(`scene.textures.list.${key}.source[0].height`);
        iy += resolution
      ) {
        if (scene.textures.getPixel(ix, iy, key).v < 0.3) {
          scene.matter.add
            .gameObject(
              scene.add.rectangle(
                x + ix,
                y + iy,
                resolution,
                resolution,
                0xff0000
              )
            )
            .setStatic(true)
            .setFriction(1);
        }
      }
    }

    //scene.walls.push(this);
    //scene.RaycasterDomain.push(this.body)
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
