class i2cPlus {
  constructor(bot) {
    this.bot = bot;
    this.colors = [
      0xff0000, 0x00ff00, 0xffff00, 0x0000ff, 0xff00ff, 0x00ffff, 0xffffff,
      0x808080,
    ];
  }

  write(adresse, byte) {
    if (adresse == 0x10) {
      const register = byte[0];

      //gestion des moteur
      if (register == 0x00) {
        if (byte.length == 3) {
          const dirL = byte[1],
            pL = byte[2];
          this.bot.Lmotor.setSpeed(dirL, pL);
        } else if (byte.length == 5) {
          const dirL = byte[1],
            pL = byte[2],
            dirR = byte[3],
            pR = byte[4];
          this.bot.Lmotor.setSpeed(dirL, pL);
          this.bot.Rmotor.setSpeed(dirR, pR);
        }
      } else if (register == 0x02) {
        const dirR = byte[1],
          pR = byte[2];
        console.log(pR);
        this.bot.Rmotor.setSpeed(dirR, pR);
      }

      //gestion des leds rgb
      else if (register == 0x0b) {
        if (byte.length == 3) {
          const colorL = this.colors[byte[1] - 1],
            colorR = this.colors[byte[2] - 1];

          this.bot.LLed.setColor(colorL);
          this.bot.RLed.setColor(colorR);
        } else if (byte.length == 2) {
          const colorL = this.colors[byte[1] - 1];

          this.bot.LLed.setColor(colorL);
        }
      } else if (register == 0x0c) {
        const colorR = this.colors[byte[1] - 1];

        this.bot.RLed.setColor(colorR);
      }
    }
  }

  read(adresse, nb) {
    if (adresse == 0x10) {
      let get = [0] * nb;

      for (let i = 0; i < nb; i++) {
        get[i] = this.buffer[i];
      }
      return get;
    }
  }
}

class i2cLite {
  constructor(bot) {
    this.bot = bot;
  }

  write(adresse, byte) {
    if (adresse == 0x10) {
      if (byte[0] == 0x00) {
        this.bot.Lmotor.setSpeed(byte[1], byte[2]);

        if (byte.length > 3) {
          this.bot.Rmotor.setSpeed(byte[3], byte[4]);
        }
      } else if (byte[0] == 0x02) {
        this.bot.Rmotor.setSpeed(byte[1], byte[2]);
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
  constructor(scene, reference, x, y, radius = 5) {
    this.reference = reference;
    this.delta = Math.sqrt(x ** 2 + y ** 2);
    if (x >= 0) {
      this.relAngle = Math.atan(y / x);
    } else {
      this.relAngle = Math.PI + Math.atan(y / x);
    }

    this.rgb = scene.add
      .circle(reference.x + x, reference.y + y, radius, 0x808080)
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
    powToSpeed,
    RelativeAngle = 0
  ) {
    this.scene = scene;
    this.speed = 0;
    this.power = 0;
    this.dir = 0;
    this.radius = height / 20;
    //this.speedToPhaser = function (speed) {
    //  return speed * 6;
    //};

    if (powToSpeed === undefined) {
      this.powToSpeed = function (power) {
        return power;
      };
    } else {
      this.powToSpeed = powToSpeed;
    }

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
          reference.y + delta * Math.sin(this.startAngle),
          width,
          height,
          0x808080
        ),
        scene.matter.add.rectangle(
          reference.x + delta * Math.cos(this.startAngle),
          reference.y + delta * Math.sin(this.startAngle),
          width,
          height
        )
      )
      .setAngle(BotAngle + RelativeAngle)
      .setFrictionAir(0);

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

    this.time = 0
  }

  setSpeed(dir, power) {
    if (power >= 0 && power <= 255) {
      this.dir = dir;
      this.power = power;
      let speed = this.powToSpeed(power) * this.radius
      //this.speedToPhaser(this.powToSpeed(power) * this.radius);

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
    //this.wheel.setVelocity(
      //Math.cos(this.wheel.rotation - Math.PI / 2) * this.speed,
      //Math.sin(this.wheel.rotation - Math.PI / 2) * this.speed
    //);

    this.time += 1

    this.wheel.body.positionImpulse.x = Math.cos(this.wheel.rotation - Math.PI / 2) * this.speed / (1000/120);

    this.wheel.body.positionImpulse.y = Math.sin(this.wheel.rotation - Math.PI / 2) * this.speed / (1000/120);

  }
}
