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
          this.bot.state.wheel.left = 0;
        } else if (byte[1] == 1) {
          this.bot.state.wheel.left = byte[2];
        } else if (byte[1] == 2) {
          this.bot.state.wheel.left = -byte[2];
        }

        if (byte[3] == 0) {
          this.bot.state.wheel.right = 0;
        } else if (byte[3] == 1) {
          this.bot.state.wheel.right = byte[4];
        } else if (byte[3] == 2) {
          this.bot.state.wheel.right = -byte[4];
        }
      } else if (byte[0] == 2) {
        if (byte[1] == 0) {
          this.bot.state.wheel.right = 0;
        } else if (byte[1] == 1) {
          this.bot.state.wheel.right = byte[2];
        } else if (byte[1] == 2) {
          this.bot.state.wheel.right = -byte[2];
        }
      }
    }
  }
}

class pin {
  constructor(robot, id) {
    this.robot = robot;
    this.id = id;
  }

  read_digital() {
    if (eval(this.id)) {
      return true;
    }
    return false;
  }

  write_digital(set) {
    eval(this.id + "=" + String(set));
  }
}

class ultrasonicD {
  constructor(scene, reference, x, y, angle = 0, range = 255, coneAngle = 60) {
    this.reference = reference;
    this.scene = scene;
    this.range = range;
    this.angle = angle/180*Math.PI
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
      .setAngle(
        this.reference.rotation - Math.PI / 2 + this.angle
      );
  }
}

class infra {
  constructor(scene, reference, x, y, radius) {
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

    this.isMarked = function () {
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
    };
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
      this.see = true;
    } else {
      this.ir.fillColor = 0x404040;
      this.see = false;
    }
    return this.see;
  }
}

class led {
  constructor(scene, reference, x, y, radius) {
    this.reference = reference;
    this.delta = Math.sqrt(x ** 2 + y ** 2);
    if (x >= 0) {
      this.relAngle = Math.atan(y / x);
    } else {
      this.relAngle = Math.PI + Math.atan(y / x);
    }

    this.led = scene.add
      .circle(reference.x + x, reference.y + y, radius, 0xff0000)
      .setDepth(2);
  }

  update(toCheck) {
    this.led.setPosition(
      this.reference.x +
        this.delta * Math.cos(this.reference.rotation + this.relAngle),
      this.reference.y +
        this.delta * Math.sin(this.reference.rotation + this.relAngle)
    );

    if (toCheck) {
      this.led.fillColor = 0xff0000;
    } else {
      this.led.fillColor = 0x500000;
    }
  }
}

class motor{
  constructor(scene, reference, x, y, width, height, pointA, pointB, angle = 0){

    //this.wheel = scene
    
  }
}
