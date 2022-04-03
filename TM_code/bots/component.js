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
    return eval(`this.component.${this.read}()`);
  }

  write_digital(set) {
    eval(`this.component.${this.write}(${set})`);
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
          if (color.v < 0.3) {
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
      .circle(reference.x + x, reference.y + y, radius, 0x500000)
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
      this.led.fillColor = 0x500000;
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
        speed = 0;
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
