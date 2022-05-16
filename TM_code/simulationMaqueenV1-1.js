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

class zoneRect {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    angle,
    callback,
    color = 0xff0000,
    alpha = 0.3
  ) {
    this.scene = scene;
    this.callback = callback;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = angle;
    this.body = scene.matter.add
      .gameObject(scene.add.rectangle(x, y, width, height))
      .setStatic(true)
      .setCollidesWith(0)
      .setAngle(angle)
      .setFillStyle(color, alpha);

    scene.zones.push(this);
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

  update() {
    for (let i = 0; i < this.scene.robots.length; i++) {
      if (this.scene.matter.overlap(this.body, this.scene.robots[i].body)) {
        this.callback(this.scene.robots[i], this);
      }
    }
  }
}

class zoneCircle {
  constructor(scene, x, y, radius, callback, color = 0xff0000, alpha = 0.3) {
    this.scene = scene;
    this.callback = callback;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(
        scene.add.circle(x, y, radius),
        scene.matter.add.circle(x, y, radius)
      )
      .setStatic(true)
      .setCollidesWith(0)
      .setFillStyle(color, alpha);

    scene.zones.push(this);
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

  update() {
    for (let i = 0; i < this.scene.robots.length; i++) {
      if (this.scene.matter.overlap(this.body, this.scene.robots[i].body)) {
        this.callback();
      }
    }
  }
}

class zonePoly {
  constructor(scene, x, y, points, callback, color = 0xff0000, alpha = 0.3) {
    this.scene = scene;
    this.callback = callback;
    this.activated = false;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(scene.add.polygon(x, y, points, 0xff0000), {
        shape: { type: "fromVerts", verts: points, flagInternal: true },
      })
      .setStatic(true)
      .setCollidesWith(0)
      .setFillStyle(color, alpha);

    scene.zones.push(this);
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

  update() {
    for (let i = 0; i < this.scene.robots.length; i++) {
      if (this.scene.matter.overlap(this.body, this.scene.robots[i].body)) {
        this.callback(this, this.scene.robots[i]);
      }
    }
  }
}

class i2cPlus {
  constructor(robot) {
    this.robot = robot;
    this.colors = [
      0xff0000, 0x00ff00, 0xffff00, 0x0000ff, 0xff00ff, 0x00ffff, 0xffffff,
      0x808080,
    ];
    this.buffer = [];
  }

  write(adresse, byte) {
    if (adresse == 0x10) {
      const register = byte[0];

      //gestion des moteur
      if (register == 0x00) {
        if (byte.length == 3) {
          const dirL = byte[1],
            pL = byte[2];
          this.robot.Lmotor.setSpeed(dirL, pL);
        } else if (byte.length >= 5) {
          const dirL = byte[1],
            pL = byte[2],
            dirR = byte[3],
            pR = byte[4];
          this.robot.Lmotor.setSpeed(dirL, pL);
          this.robot.Rmotor.setSpeed(dirR, pR);
        }
        this.buffer.push(
          this.robot.Rmotor.power,
          this.robot.Rmotor.dir,
          this.robot.Lmotor.power,
          this.robot.Lmotor.dir
        );
      } else if (register == 0x02) {
        const dirR = byte[1],
          pR = byte[2];
        this.robot.Rmotor.setSpeed(dirR, pR);

        this.buffer.push(this.robot.Rmotor.power, this.robot.Rmotor.dir);
      } else if (register == 0x04) {
        this.buffer.push(
          this.robot.Rmotor.angle % 256,
          (this.robot.Rmotor.angle >> 8) % 256,
          this.robot.Lmotor.angle % 256,
          (this.robot.Lmotor.angle >> 8) % 256
        );
      }

      //gestion des leds rgb
      else if (register == 0x0b) {
        if (byte.length >= 3) {
          const colorL = this.colors[byte[1] - 1],
            colorR = this.colors[byte[2] - 1];
          this.robot.LLed.setColor(colorL);
          this.robot.RLed.setColor(colorR);
        } else if (byte.length == 2) {
          const colorL = this.colors[byte[1] - 1];
          this.robot.LLed.setColor(colorL);
        }
      } else if (register == 0x0c) {
        if (byte.length >= 2) {
          const colorR = this.colors[byte[1] - 1];
          this.robot.RLed.setColor(colorR);
        }
      }

      // gestion des ir
      else if (register == 0x1d) {
        let byte = 0;
        if (this.robot.irL3.isMarked()) {
          byte += 32;
        }
        if (this.robot.irL2.isMarked()) {
          byte += 16;
        }
        if (this.robot.irL1.isMarked()) {
          byte += 8;
        }
        if (this.robot.irR1.isMarked()) {
          byte += 4;
        }
        if (this.robot.irR2.isMarked()) {
          byte += 2;
        }
        if (this.robot.irR3.isMarked()) {
          byte += 1;
        }

        this.buffer.push(byte);
      }
    }
  }

  read(adresse, nb) {
    if (adresse == 0x10) {
      let get = [];

      for (let i = 0; i < nb; i++) {
        get.push(this.buffer[this.buffer.length - i - 1]);
      }
      return get;
    }
  }
}

class i2cLite {
  constructor(robot) {
    this.robot = robot;
  }

  write(adresse, byte) {
    if (adresse == 0x10) {
      const register = byte[0];

      //gestion des moteur
      if (register == 0x00) {
        if (byte.length == 3) {
          const dirL = byte[1],
            pL = byte[2];
          this.robot.Lmotor.setSpeed(dirL, pL);
        } else if (byte.length >= 5) {
          const dirL = byte[1],
            pL = byte[2],
            dirR = byte[3],
            pR = byte[4];
          this.robot.Lmotor.setSpeed(dirL, pL);
          this.robot.Rmotor.setSpeed(dirR, pR);
        }
      } else if (register == 0x02) {
        const dirR = byte[1],
          pR = byte[2];
        this.robot.Rmotor.setSpeed(dirR, pR);
      }
    }
  }
}

class pin {
  constructor(component, read, write) {
    this.component = component;
    this.read = read;
    this.write = write;
  }

  read_digital() {
    return this.component[this.read]();
  }

  write_digital(set) {
    this.component[this.write](set);
  }
}

class ultrasonicD {
  constructor(scene, reference, x, y, angle = 0, range = 255, coneAngle = 60) {
    this.reference = reference;
    this.scene = scene;
    this.range = range;
    this.angle = (angle / 180) * Math.PI;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    this.rotationOrigin = Math.atan2(y, x);

    this.raycaster = scene.raycasterPlugin.createRaycaster();
    this.raycaster.mapGameObjects(scene.RaycasterDomain);
    this.rayCone = this.raycaster
      .createRay({
        origin: {
          x: reference.x + x,
          y: reference.y + y,
        },
        autoSlice: true,
        collisionRange: range * 10,
      })
      .setConeDeg(coneAngle)
      .setAngle(reference.rotation + Math.PI / 2 + this.angle);

    this.rayCone.enablePhysics("matter");

    this.raycaster.mapGameObjects(scene.RaycasterDomain);
  }

  getDistance() {
    let distances = [];
    let distance;
    this.raycaster.mapGameObjects(this.scene.RaycasterDomain);
    this.intersections = this.rayCone.castCone();
    for (let i = 0; i < this.intersections.length; i++) {
      distance = Math.sqrt(
        (this.intersections[i].x - this.rayCone.origin.x) ** 2 +
          (this.intersections[i].y - this.rayCone.origin.y) ** 2
      );
      distances.push(Math.round(distance));
    }
    let min = Math.min(...distances);
    if (min < this.range * 10) {
      return Math.round(min / 10);
    } else {
      return this.range;
    }
  }

  update() {
    this.rayCone
      .setOrigin(
        this.reference.x +
          this.deltaOrigin *
            Math.cos(this.reference.rotation + this.rotationOrigin),
        this.reference.y +
          this.deltaOrigin *
            Math.sin(this.reference.rotation + this.rotationOrigin)
      )
      .setAngle(this.reference.rotation - Math.PI / 2 + this.angle);
  }
}

class infra {
  constructor(scene, reference, x, y, radius = 2, StateBlack = true) {
    this.scene = scene;
    this.reference = reference;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    this.rotationOrigin = Math.atan2(y, x);
    this.StateBlack = StateBlack;

    this.ir = scene.matter.add
      .gameObject(
        scene.add.circle(reference.x + x, reference.y + y, radius, 0xffffff),
        scene.matter.add.circle(reference.x + x, reference.y + y, 1)
      )
      .setCollidesWith(0)
      .setDepth(2);
  }

  isMarked() {
    for (let i = 0; i < this.scene.marks.length; i++) {
      if (this.scene.matter.overlap(this.ir, this.scene.marks[i].body)) {
        const mark = this.scene.marks[i];
        if (mark.picture == "geom") {
          return this.StateBlack;
        }

        const xAngle0 =
            Math.cos(-(mark.angle / 180) * Math.PI) *
              (this.ir.x - mark.position.x) -
            Math.sin(-(mark.angle / 180) * Math.PI) *
              (this.ir.y - mark.position.y),
          yAngle0 =
            Math.sin(-(mark.angle / 180) * Math.PI) *
              (this.ir.x - mark.position.x) +
            Math.cos(-(mark.angle / 180) * Math.PI) *
              (this.ir.y - mark.position.y);

        const color = this.scene.textures.getPixel(
          xAngle0 / mark.scale.x + mark.body.width / 2,
          yAngle0 / mark.scale.y + mark.body.height / 2,
          mark.picture
        );
        if (color !== null) {
          if (color.v < 0.3 && color.a >= 0.5) {
            return this.StateBlack;
          }
        }
      }
    }
    return !this.StateBlack;
  }

  update() {
    this.ir.setPosition(
      this.reference.x +
        this.deltaOrigin *
          Math.cos(this.reference.rotation + this.rotationOrigin),
      this.reference.y +
        this.deltaOrigin *
          Math.sin(this.reference.rotation + this.rotationOrigin)
    );

    if (this.isMarked()) {
      this.ir.fillColor = 0xffffff;
    } else {
      this.ir.fillColor = 0x404040;
    }
  }
}

class led {
  constructor(scene, reference, x, y, radius = 4) {
    this.reference = reference;
    this.on = false;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    this.rotationOrigin = Math.atan2(y, x);

    this.led = scene.add
      .circle(reference.x + x, reference.y + y, radius, 0x7a0000)
      .setDepth(2);
  }

  setOn(bool) {
    this.on = bool;
  }

  getOn() {
    return this.on;
  }

  update() {
    this.led.setPosition(
      this.reference.x +
        this.deltaOrigin *
          Math.cos(this.reference.rotation + this.rotationOrigin),
      this.reference.y +
        this.deltaOrigin *
          Math.sin(this.reference.rotation + this.rotationOrigin)
    );

    if (this.on) {
      this.led.fillColor = 0xff0000;
    } else {
      this.led.fillColor = 0x7a0000;
    }
  }
}

class rgbLed {
  constructor(scene, reference, x, y, radius = 5) {
    this.reference = reference;
    this.color = 0x808080;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    this.rotationOrigin = Math.atan2(y, x);

    this.rgb = scene.add
      .circle(reference.x + x, reference.y + y, radius, 0x808080)
      .setDepth(2);
  }

  setColor(color) {
    this.color = color;
  }

  update() {
    this.rgb.setPosition(
      this.reference.x +
        this.deltaOrigin *
          Math.cos(this.reference.rotation + this.rotationOrigin),
      this.reference.y +
        this.deltaOrigin *
          Math.sin(this.reference.rotation + this.rotationOrigin)
    );

    this.rgb.fillColor = this.color;
  }
}

class motor {
  constructor(
    scene,
    reference,
    x,
    y,
    width,
    height,
    point1,
    point2,
    powToSpeed
  ) {
    this.scene = scene;
    this.speed = 0;
    this.power = 0;
    this.dir = 0;
    this.radius = height / 20;
    this.angle = 0;
    this.powToSpeed = powToSpeed;

    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    const deltaPoint1 = Math.sqrt(point1.x ** 2 + point1.y ** 2),
      deltaPoint2 = Math.sqrt(point2.x ** 2 + point2.y ** 2);

    this.rotationOrigin = Math.atan2(y, x);
    const rotationPoint1 = Math.atan2(point1.y, point1.x),
      rotationPoint2 = Math.atan2(point2.y, point2.x);

    this.wheel = scene.matter.add
      .gameObject(
        scene.add.rectangle(
          reference.x +
            this.deltaOrigin *
              Math.cos(this.rotationOrigin + reference.rotation),
          reference.y +
            this.deltaOrigin *
              Math.sin(this.rotationOrigin + reference.rotation),
          width,
          height,
          0x808080
        ),
        scene.matter.add.rectangle(
          reference.x +
            this.deltaOrigin *
              Math.cos(this.rotationOrigin + reference.rotation),
          reference.y +
            this.deltaOrigin *
              Math.sin(this.rotationOrigin + reference.rotation),
          width,
          height
        )
      )
      .setRotation(reference.rotation)
      .setDepth(2)
      .setFrictionAir(3);

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(-reference.rotation),
        y: (height / 2) * Math.cos(-reference.rotation),
      },
      pointB: {
        x: deltaPoint1 * Math.cos(rotationPoint1 + reference.rotation),
        y: deltaPoint1 * Math.sin(rotationPoint1 + reference.rotation),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(-reference.rotation),
        y: (height / 2) * Math.cos(-reference.rotation),
      },
      pointB: {
        x: deltaPoint2 * Math.cos(rotationPoint2 + reference.rotation),
        y: deltaPoint2 * Math.sin(rotationPoint2 + reference.rotation),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(reference.rotation),
        y: (-height / 2) * Math.cos(reference.rotation),
      },
      pointB: {
        x: deltaPoint1 * Math.cos(rotationPoint1 + reference.rotation),
        y: deltaPoint1 * Math.sin(rotationPoint1 + reference.rotation),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(reference.rotation),
        y: (-height / 2) * Math.cos(reference.rotation),
      },
      pointB: {
        x: deltaPoint2 * Math.cos(rotationPoint2 + reference.rotation),
        y: deltaPoint2 * Math.sin(rotationPoint2 + reference.rotation),
      },
    });
  }

  setSpeed(dir, power) {
    if (power >= 0 && power <= 255) {
      this.dir = dir;
      this.power = power;
      const speed = this.powToSpeed(power) * this.radius * (12 / 100);

      if (speed < 0) {
        this.speed = 0;
      }

      if (dir == 0) {
        this.speed = 0;
      } else if (dir == 1) {
        this.speed = speed;
      } else if (dir == 2) {
        this.speed = -speed;
      }
    }
  }

  update() {
    const deltaX = this.wheel.x - this.wheel.body.positionPrev.x,
      deltaY = this.wheel.y - this.wheel.body.positionPrev.y,
      rotationSpeed =
        Math.round(
          (Math.sqrt(deltaX ** 2 + deltaY ** 2) / this.radius) *
            (100 / 12) *
            5.6 *
            100
        ) / 100;

    this.angle += Math.round((rotationSpeed / Math.PI) * 2 * 80);

    this.wheel.body.positionImpulse.x =
      Math.cos(this.wheel.rotation - Math.PI / 2) * this.speed;

    this.wheel.body.positionImpulse.y =
      Math.sin(this.wheel.rotation - Math.PI / 2) * this.speed;
  }
}

class maqueenLite {
  constructor(scene, name, x, y, angle) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenLite";
    this.angle = angle;
    this.position = { x: x, y: y };

    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "liteBodyPic", undefined, {
        shape: scene.cache.json.get("liteShape").body,
      })
      .setFrictionAir(0)
      .setDepth(2)
      .setAngle(angle);

    //mise en place des moteurs
    let speedGrowth = function (power) {
      return (
        -9e-9 * power ** 4 +
        7e-6 * power ** 3 -
        0.0021 * power ** 2 +
        0.3121 * power -
        1.2
      );
    };

    this.Lmotor = new motor(
      scene,
      this.body,
      -35,
      18,
      9,
      43,
      { x: -10, y: -4 },
      { x: -10, y: 40 },
      speedGrowth
    );

    this.Rmotor = new motor(
      scene,
      this.body,
      35,
      18,
      9,
      43,
      { x: 10, y: -4 },
      { x: 10, y: 40 },
      speedGrowth
    );

    //mise en place du capteur ultrason
    this.ultrasonic = new ultrasonicD(scene, this.body, 0, -35);

    //mise en place des capteurs infrarouges
    this.irL = new infra(scene, this.body, -7, -16, 2, false);

    this.irR = new infra(scene, this.body, 7, -16, 2, false);

    //mise en place des leds
    this.LLed = new led(scene, this.body, -18, -32);

    this.RLed = new led(scene, this.body, 18, -32);

    // mise en place des pins
    this.pin13 = new pin(this.irL, "isMarked"); //irLeft
    this.pin14 = new pin(this.irR, "isMarked"); // irRight
    this.pin8 = new pin(this.LLed, "getOn", "setOn"); //LLed
    this.pin12 = new pin(this.RLed, "getOn", "setOn"); // RLed
    this.pin1; // ultrason

    // mise en place de l'i2c
    this.i2c = new i2cLite(this);

    // ajout du robot à la liste des robots
    scene.robots.push(this);
  }

  getDistance() {
    return this.ultrasonic.getDistance();
  }

  update() {
    this.Lmotor.update();
    this.Rmotor.update();
    this.ultrasonic.update();
    this.irL.update();
    this.irR.update();
    this.LLed.update();
    this.RLed.update();
    this.position = { x: this.body.x, y: this.body.y };
    this.angle = this.body.angle;
  }

  setPosition(x, y) {
    this.body.setPosition(x, y);
    this.Lmotor.wheel.setPosition(
      x +
        this.Lmotor.deltaOrigin *
          Math.cos(this.Lmotor.rotationOrigin + this.body.rotation),
      y +
        this.Lmotor.deltaOrigin *
          Math.sin(this.Lmotor.rotationOrigin + this.body.rotation)
    );
    this.Rmotor.wheel.setPosition(
      x +
        this.Rmotor.deltaOrigin *
          Math.cos(this.Rmotor.rotationOrigin + this.body.rotation),
      y +
        this.Rmotor.deltaOrigin *
          Math.sin(this.Rmotor.rotationOrigin + this.body.rotation)
    );
  }

  setAngle(deg) {
    this.body.setAngle(deg);

    this.Lmotor.wheel.setPosition(
      this.body.x +
        this.Lmotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.Lmotor.rotationOrigin),
      this.body.y +
        this.Lmotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.Lmotor.rotationOrigin)
    );
    this.Lmotor.wheel.setAngle(deg);

    this.Rmotor.wheel.setPosition(
      this.body.x +
        this.Rmotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.Rmotor.rotationOrigin),
      this.body.y +
        this.Rmotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.Rmotor.rotationOrigin)
    );
    this.Rmotor.wheel.setAngle(deg);
  }
}

class maqueenPlus {
  constructor(scene, name, x, y, angle) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenPlus";
    this.angle = angle;
    this.position = { x: x, y: y };

    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "plusBodyPic", undefined, {
        shape: scene.cache.json.get("plusShape").body,
      })
      .setFrictionAir(0)
      .setDepth(2)
      .setAngle(angle);

    //mise en place des moteurs
    let speedGrowth = function (power) {
      return (
        -1e-8 * power ** 4 +
        1e-5 * power ** 3 -
        0.0032 * power ** 2 +
        0.4053 * power -
        2.8394
      );
    };
    this.Lmotor = new motor(
      scene,
      this.body,
      -45,
      27,
      9,
      43,
      { x: -10, y: 5 },
      { x: -10, y: 49 },
      speedGrowth
    );

    this.Rmotor = new motor(
      scene,
      this.body,
      45,
      27,
      9,
      43,
      { x: 10, y: 5 },
      { x: 10, y: 49 },
      speedGrowth
    );

    //mise en place du capteur ultrason
    this.ultrasonic = new ultrasonicD(scene, this.body, 0, -21);

    //mise en place des capteurs infrarouges
    this.irL1 = new infra(scene, this.body, -5, -31);

    this.irL2 = new infra(scene, this.body, -15, -31);

    this.irL3 = new infra(scene, this.body, -45, -11);

    this.irR1 = new infra(scene, this.body, 5, -31);

    this.irR2 = new infra(scene, this.body, 15, -31);

    this.irR3 = new infra(scene, this.body, 45, -11);

    //mise en place des leds rgb
    this.LLed = new rgbLed(scene, this.body, -20, -45);

    this.RLed = new rgbLed(scene, this.body, 20, -45);

    //mise en place de l'i2c
    this.i2c = new i2cPlus(this);

    // ajout du robot à la liste des robots
    scene.robots.push(this);
  }

  getDistance() {
    return this.ultrasonic.getDistance();
  }

  update() {
    this.Lmotor.update();
    this.Rmotor.update();
    this.ultrasonic.update();
    this.irL1.update();
    this.irL2.update();
    this.irL3.update();
    this.irR1.update();
    this.irR2.update();
    this.irR3.update();
    this.LLed.update();
    this.RLed.update();
    this.position = { x: this.body.x, y: this.body.y };
    this.angle = this.body.angle;
  }

  setPosition(x, y) {
    this.body.setPosition(x, y);
    this.Lmotor.wheel.setPosition(
      x +
        this.Lmotor.deltaOrigin *
          Math.cos(this.Lmotor.rotationOrigin + this.body.rotation),
      y +
        this.Lmotor.deltaOrigin *
          Math.sin(this.Lmotor.rotationOrigin + this.body.rotation)
    );
    this.Rmotor.wheel.setPosition(
      x +
        this.Rmotor.deltaOrigin *
          Math.cos(this.Rmotor.rotationOrigin + this.body.rotation),
      y +
        this.Rmotor.deltaOrigin *
          Math.sin(this.Rmotor.rotationOrigin + this.body.rotation)
    );
  }

  setAngle(deg) {
    this.body.setAngle(deg);

    this.Lmotor.wheel.setPosition(
      this.body.x +
        this.Lmotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.Lmotor.rotationOrigin),
      this.body.y +
        this.Lmotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.Lmotor.rotationOrigin)
    );
    this.Lmotor.wheel.setAngle(deg);

    this.Rmotor.wheel.setPosition(
      this.body.x +
        this.Rmotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.Rmotor.rotationOrigin),
      this.body.y +
        this.Rmotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.Rmotor.rotationOrigin)
    );
    this.Rmotor.wheel.setAngle(deg);
  }
}

class Simul extends Phaser.Scene {
  constructor(robots, walls, marks, zones, mapLoad, mapCreate, mouse) {
    super("simulation");
    this.mapLoad = mapLoad;
    this.mapCreate = mapCreate;
    this.robots = robots;
    this.walls = walls;
    this.marks = marks;
    this.zones = zones;
    this.mouse = mouse;
  }

  preload() {
    this.load.json("liteShape", "assets/liteShape.json");
    this.load.json("plusShape", "assets/plusShape.json");

    this.load.spritesheet("liteBodyPic", "assets/liteBody.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("plusBodyPic", "assets/plusBody.png", {
      frameWidth: 100,
      frameHeight: 103,
    });

    this.mapLoad(this);
  }

  create() {
    this.RaycasterDomain = [];

    this.mapCreate(this);

    if (this.mouse) {
      this.matter.add.mouseSpring({ stiffness: 0.001 }).constraint;
    }

    this.scene.launch("overlay", [this.robots, this.cameras.main]);
  }

  update() {
    for (let i = 0; i < this.zones.length; i++) {
      this.zones[i].update();
    }

    for (let i = 0; i < this.robots.length; i++) {
      this.robots[i].update();
    }
  }
}

class Over extends Phaser.Scene {
  constructor(height, zoom) {
    super("overlay");
    this.height = height
    this.initZoom = zoom;
  }

  init(data) {
    this.robots = data[0];
    this.camera = data[1];
  }

  preload() {
    this.load.image("echelle", "assets/scale.png");
  }

  create() {
    this.buttons = [];
    this.echelle = this.add.image(70, (this.height-30), "echelle").setScale(this.initZoom);
    this.camera.zoom = this.initZoom;

    this.add
      .text(10, 60, "-", {
        color: "#000",
        backgroundColor: "#fff",
        padding: 1,
        fontSize: 40,
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.camera.zoom /= 1.2), (this.echelle.scale /= 1.2);
      });

    this.add
      .text(10, 10, "+", {
        color: "#000",
        backgroundColor: "#fff",
        padding: 1,
        fontSize: 40,
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.camera.zoom *= 1.2), (this.echelle.scale *= 1.2);
      });

    this.buttons.push(
      this.add
        .text(10, 110, "Free", {
          color: "#000",
          backgroundColor: "#999",
          padding: 3,
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.keyboardControl = true;
          this.cursor.setPosition(15 + this.buttons[0].width, 110);
          this.camera.stopFollow();
        })
    );

    for (let i = 0; i < this.robots.length; i++) {
      this.buttons.push(
        this.add
          .text(10, 140 + 30 * i, this.robots[i].name, {
            color: "#000",
            backgroundColor: "#999",
            padding: 3,
          })
          .setInteractive()
          .on("pointerdown", () => {
            this.keyboardControl = false;
            this.cursor.setPosition(
              15 + this.buttons[i + 1].width,
              140 + 30 * i
            );
            this.camera.startFollow(this.robots[i].body);
          })
      );
    }

    this.cursor = this.add.text(0, 0, "<=", { color: "#000", fontSize: 20 });

    if(this.robots.length == 0){
    this.keyboardControl = true;
    this.cursor.setPosition(15 + this.buttons[0].width, 113);
    } else {
      this.keyboardControl = false
      this.cursor.setPosition(15 + this.buttons[1].width, 140);
      this.camera.startFollow(this.robots[0].body)
    }
  }

  update() {
    if (this.keyboardControl) {
      const inputs = this.input.keyboard.addKeys({
        up: "up",
        down: "down",
        left: "left",
        right: "right",
      });

      if (inputs.up.isDown) {
        this.camera.scrollY -= 5 / this.camera.zoom;
      } else if (inputs.down.isDown) {
        this.camera.scrollY += 5 / this.camera.zoom;
      }

      if (inputs.left.isDown) {
        this.camera.scrollX -= 5 / this.camera.zoom;
      } else if (inputs.right.isDown) {
        this.camera.scrollX += 5 / this.camera.zoom;
      }
    }
  }
}

class simulation {
  constructor(
    width,
    height,
    id,
    mapLoad,
    mapCreate,
    zoom = 0.8,
    mouse = true,
    debug = false,
    background = 0xcccac0
  ) {
    this.robots = [];
    this.walls = [];
    this.marks = [];
    this.zones = [];
    this.game = new Phaser.Game({
      width: width,
      height: height,
      backgroundColor: background,
      type: Phaser.WEBGL,
      canvas: document.getElementById(id),
      scene: [
        new Simul(
          this.robots,
          this.walls,
          this.marks,
          this.zones,
          mapLoad,
          mapCreate,
          mouse
        ),
        new Over(height, zoom),
      ],
      physics: {
        default: "matter",
        matter: {
          gravity: { y: 0, x: 0 },
          debug: debug,
        },
      },
      plugins: {
        scene: [
          {
            key: "PhaserRaycaster",
            plugin: PhaserRaycaster,
            mapping: "raycasterPlugin",
          },
        ],
      },
    });
  }
}
