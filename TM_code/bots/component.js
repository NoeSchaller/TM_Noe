class i2c {
  constructor(bot) {
    this.bot = bot;
  }

  /*
    adresse:
        0x10 = moteur
            commande
                0 = left or both
                2 = right
    */
  write(adresse, byte) {
    if (adresse == 0x10) {
      if (byte[0] == 0) {
        if (byte[1] == 0) {
          this.bot.Lmotor.setSpeed(0)
        } else if (byte[1] == 1) {
          this.bot.Lmotor.setSpeed(byte[2]);
        } else if (byte[1] == 2) {
          this.bot.Lmotor.setSpeed(-byte[2]);
        }

        if (byte[3] == 0) {
          this.bot.Rmotor.setSpeed(0);
        } else if (byte[3] == 1) {
          this.bot.Rmotor.setSpeed(byte[4]);
        } else if (byte[3] == 2) {
          this.bot.Rmotor.setSpeed(-byte[4]);
        }
      } else if (byte[0] == 2) {
        if (byte[1] == 0) {
          this.bot.Rmotor.setSpeed(0);
        } else if (byte[1] == 1) {
          this.bot.Rmotor.setSpeed(byte[2]);
        } else if (byte[1] == 2) {
          this.bot.Rmotor.setSpeed(-byte[2]);
        }
      }
    }
  }
}

class pin {
  constructor(robot, read, write) {
    this.robot = robot;
    this.read = read;
    this.write = write;
  }

  read_digital() {
    return eval(this.read);
  }

  write_digital(set) {
    eval(this.write.replace(")", String(set) + ")"));
  }
}

class ultrasonicD {
  constructor(scene, reference, x, y, angle = 0, range = 255, coneAngle = 60) {
    this.reference = reference;
    this.scene = scene;
    this.range = range;
    this.angle = (angle / 180) * Math.PI;
    this.delta = Math.sqrt(x ** 2 + y ** 2);
    if (x >= 0) {
      this.relAngle = Math.atan(y / x);
    } else {
      this.relAngle = Math.PI + Math.atan(y / x);
    }

    this.raycaster = scene.raycasterPlugin.createRaycaster();
    this.raycaster.mapGameObjects(scene.walls);
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

    this.raycaster.mapGameObjects(scene.walls);
  }

  getDistance() {
    let distances = [];
    let distance;
    this.raycaster.mapGameObjects(this.scene.walls);
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
          this.delta * Math.cos(this.reference.rotation + this.relAngle),
        this.reference.y +
          this.delta * Math.sin(this.reference.rotation + this.relAngle)
      )
      .setAngle(this.reference.rotation - Math.PI / 2 + this.angle);
  }
}

class infra {
  constructor(scene, reference, x, y, radius = 2) {
    this.scene = scene;
    this.reference = reference;
    this.delta = Math.sqrt(x ** 2 + y ** 2);
    if (x >= 0) {
      this.relAngle = Math.atan(y / x);
    } else {
      this.relAngle = Math.PI + Math.atan(y / x);
    }

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
        if (this.scene.marks[i].pic == "geom") {
          return true;
        }
        const color = this.scene.textures.getPixel(
          (this.ir.x -
            this.scene.marks[i].pos.x +
            (this.scene.marks[i].body.width * this.scene.marks[i].scale.x) /
              2) /
            this.scene.marks[i].scale.x,
          (this.ir.y -
            this.scene.marks[i].pos.y +
            (this.scene.marks[i].body.width * this.scene.marks[i].scale.y) /
              2) /
            this.scene.marks[i].scale.y,
          this.scene.marks[i].pic
        );
        if (color == null) {
        } else {
          if ((color.v < 0.2) & (color.a != 0)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  update() {
    this.ir.setPosition(
      this.reference.x +
        this.delta * Math.cos(this.reference.rotation + this.relAngle),
      this.reference.y +
        this.delta * Math.sin(this.reference.rotation + this.relAngle)
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
    this.delta = Math.sqrt(x ** 2 + y ** 2);
    if (x >= 0) {
      this.relAngle = Math.atan(y / x);
    } else {
      this.relAngle = Math.PI + Math.atan(y / x);
    }

    this.led = scene.add
      .circle(reference.x + x, reference.y + y, radius, 0x500000)
      .setDepth(2);
  }

  setOn(bool) {
    this.on = bool;

    if (bool) {
      this.led.fillColor = 0xff0000;
    } else {
      this.led.fillColor = 0x500000;
    }
  }

  getOn() {
    return this.on;
  }

  update() {
    this.led.setPosition(
      this.reference.x +
        this.delta * Math.cos(this.reference.rotation + this.relAngle),
      this.reference.y +
        this.delta * Math.sin(this.reference.rotation + this.relAngle)
    );
  }
}

class rgbLed {
  constructor(scene, reference, x, y, radius = 6) {
    this.reference = reference;
    this.delta = Math.sqrt(x ** 2 + y ** 2);
    if (x >= 0) {
      this.relAngle = Math.atan(y / x);
    } else {
      this.relAngle = Math.PI + Math.atan(y / x);
    }

    this.rgb = scene.add
      .circle(reference.x + x, reference.y + y, radius, 0xffffff)
      .setDepth(2);
  }

  setColor(color) {
    this.rgb.fillColor = color;
  }

  update() {
    this.rgb.setPosition(
      this.reference.x +
        this.delta * Math.cos(this.reference.rotation + this.relAngle),
      this.reference.y +
        this.delta * Math.sin(this.reference.rotation + this.relAngle)
    );
  }
}

class motor {
  constructor(
    scene,
    reference,
    BotAngle,
    x,
    y,
    width,
    height,
    point1,
    point2,
    RelativeAngle = 0
  ) {
    this.speed = 0;

    let delta = Math.sqrt(x ** 2 + y ** 2);
    let deltaPoint1 = Math.sqrt(point1.x ** 2 + point1.y ** 2);
    let deltaPoint2 = Math.sqrt(point2.x ** 2 + point2.y ** 2);

    if (x >= 0) {
      this.startAngle = Math.atan(y / x) + (BotAngle / 180) * Math.PI;
    } else {
      this.startAngle = Math.PI + Math.atan(y / x) + (BotAngle / 180) * Math.PI;
    }

    if (point1.x >= 0) {
      this.rotationPoint1 =
        (BotAngle / 180) * Math.PI + Math.atan(point1.y / point1.x);
    } else {
      this.rotationPoint1 =
        (BotAngle / 180 + 1) * Math.PI + Math.atan(point1.y / point1.x);
    }

    if (point2.x >= 0) {
      this.rotationPoint2 =
        (BotAngle / 180) * Math.PI + Math.atan(point2.y / point2.x);
    } else {
      this.rotationPoint2 =
        (BotAngle / 180 + 1) * Math.PI + Math.atan(point2.y / point2.x);
    }

    let rotationWheel = ((RelativeAngle + BotAngle) / 180) * Math.PI;

    this.wheel = scene.matter.add
      .gameObject(
        scene.add.rectangle(
          reference.x + delta * Math.cos(this.startAngle),
          reference.x + delta * Math.sin(this.startAngle),
          width,
          height,
          0x808080
        ),
        scene.matter.add.rectangle(
          reference.x + delta * Math.cos(this.startAngle),
          reference.x + delta * Math.sin(this.startAngle),
          width,
          height
        )
      )
      .setAngle(BotAngle + RelativeAngle)
      .setFrictionAir(0.5);

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(-rotationWheel),
        y: (height / 2) * Math.cos(-rotationWheel),
      },
      pointB: {
        x: deltaPoint1 * Math.cos(this.rotationPoint1),
        y: deltaPoint1 * Math.sin(this.rotationPoint1),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(-rotationWheel),
        y: (height / 2) * Math.cos(-rotationWheel),
      },
      pointB: {
        x: deltaPoint2 * Math.cos(this.rotationPoint2),
        y: deltaPoint2 * Math.sin(this.rotationPoint2),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(rotationWheel),
        y: (-height / 2) * Math.cos(rotationWheel),
      },
      pointB: {
        x: deltaPoint1 * Math.cos(this.rotationPoint1),
        y: deltaPoint1 * Math.sin(this.rotationPoint1),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(rotationWheel),
        y: (-height / 2) * Math.cos(rotationWheel),
      },
      pointB: {
        x: deltaPoint2 * Math.cos(this.rotationPoint2),
        y: deltaPoint2 * Math.sin(this.rotationPoint2),
      },
    });
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  update() {
    this.wheel.setVelocity(
      Math.cos(this.wheel.rotation - Math.PI / 2) * this.speed,
      Math.sin(this.wheel.rotation - Math.PI / 2) * this.speed
    );
  }
}
