class maqueenLite {
  constructor(that, name, x, y, angle = 0) {
    this.robot = new bodyLite(that, name, x, y, angle);
    this.i2c = new i2c(this.robot);
    this.pin13 = new pin(this.robot, "this.robot.state.ir.left"); //irLeft
    this.pin14 = new pin(this.robot, "this.robot.state.ir.right"); // irRight
    this.pin8 = new pin(this.robot, "this.robot.state.led.left"); //LLed
    this.pin12 = new pin(this.robot, "this.robot.state.led.right"); // RLed
    this.pin1; // ultrason

    that.parent.lite.push(this);
  }
}

class bodyLite {
  constructor(scene, id, x, y, angle) {
    //mise  en place de variable utilisables plus tard
    this.scale = 0.4;
    this.frottement = 0;
    this.scene = scene;

    this.LastPosL = { x: x - 89 * this.scale, y: y + 45 * this.scale };
    this.LastPosR = { x: x + 89 * this.scale, y: y + 45 * this.scale };

    this.state = {
      wheel: { left: 0, right: 0 },
      led: { left: 0, right: 0 },
      ir: { left: 0, right: 0 },
      id: id,
    };

    //mise en place du "corps" du robot
    this.body = scene.matter.add
      .sprite(x, y, "bodyPic", "", {
        shape: scene.cache.json.get("bodyShape").body,
      })
      .setFrictionAir(0);
    this.Lwheel = scene.matter.add
      .image(x - 89 * this.scale, y + 45 * this.scale, "wheel")
      .setFrictionAir(0.5);
    this.Rwheel = scene.matter.add
      .image(x + 89 * this.scale, y + 45 * this.scale, "wheel")
      .setFrictionAir(0.5);

    //la roue gauche est attachée au corps
    scene.matter.add.constraint(this.body, this.Lwheel, undefined, 1, {
      pointA: { x: -70 * this.scale, y: -13 * this.scale },
      pointB: { x: -13 * this.scale, y: 58 * this.scale },
    });
    scene.matter.add.constraint(this.body, this.Lwheel, undefined, 1, {
      pointA: { x: -70 * this.scale, y: 102 * this.scale },
      pointB: { x: -13 * this.scale, y: -58 * this.scale },
    });
    scene.matter.add.constraint(this.body, this.Lwheel, undefined, 1, {
      pointA: { x: -70 * this.scale, y: 102 * this.scale },
      pointB: { x: -13 * this.scale, y: 58 * this.scale },
    });
    scene.matter.add.constraint(this.body, this.Lwheel, undefined, 1, {
      pointA: { x: -70 * this.scale, y: -13 * this.scale },
      pointB: { x: -13 * this.scale, y: -58 * this.scale },
    });

    // la roue droite est attachée au corps
    scene.matter.add.constraint(this.body, this.Rwheel, undefined, 1, {
      pointA: { x: 70 * this.scale, y: -13 * this.scale },
      pointB: { x: 13 * this.scale, y: 58 * this.scale },
    });
    scene.matter.add.constraint(this.body, this.Rwheel, undefined, 1, {
      pointA: { x: 70 * this.scale, y: 102 * this.scale },
      pointB: { x: 13 * this.scale, y: -58 * this.scale },
    });
    scene.matter.add.constraint(this.body, this.Rwheel, undefined, 1, {
      pointA: { x: 70 * this.scale, y: 102 * this.scale },
      pointB: { x: 13 * this.scale, y: 58 * this.scale },
    });
    scene.matter.add.constraint(this.body, this.Rwheel, undefined, 1, {
      pointA: { x: 70 * this.scale, y: -13 * this.scale },
      pointB: { x: 13 * this.scale, y: -58 * this.scale },
    });
    //mise en place du capteur ultrason

    this.ultrasonic = new ultrasonicD(scene, this.body, 0, -100 * this.scale, -90);

    //mise en place des capteurs infrarouges

    this.irL = new infra(
      scene,
      this.body,
      -18 * this.scale,
      -40 * this.scale,
      5 * this.scale
    );

    this.irR = new infra(
      scene,
      this.body,
      18 * this.scale,
      -40 * this.scale,
      5 * this.scale
    );

    //mise en place des leds

    this.LLed = new led(
      scene,
      this.body,
      -45 * this.scale,
      -80 * this.scale,
      10 * this.scale
    );

    this.RLed = new led(
      scene,
      this.body,
      45 * this.scale,
      -80 * this.scale,
      10 * this.scale
    );

    // adaptation de l'angle et de l'échelle en fonction des paramètres

    this.wholeBody = scene.add.group([this.body, this.Lwheel, this.Rwheel]);

    this.wholeBody.scaleXY(this.scale - 1, this.scale - 1);
    this.wholeBody.setDepth(1);
    this.wholeBody.angle(angle);

    this.wholeBody.rotateAround({ x: x, y: y }, (angle / 360) * 2 * Math.PI);
  }

  setWheel() {
    this.Lwheel.setVelocity(
      Math.cos(this.Lwheel.rotation - Math.PI / 2) * this.state.wheel.left,
      Math.sin(this.Lwheel.rotation - Math.PI / 2) * this.state.wheel.left
    );

    if (this.state.wheel.left == 0) {
      if (this.scene.frame % this.frottement == 0) {
        this.Lwheel.setVelocity(0, 0).setPosition(
          this.LastPosL.x,
          this.LastPosL.y
        );
      }
    }

    this.Rwheel.setVelocity(
      Math.cos(this.Rwheel.rotation - Math.PI / 2) * this.state.wheel.right,
      Math.sin(this.Rwheel.rotation - Math.PI / 2) * this.state.wheel.right
    );

    if (this.state.wheel.left == 0) {
      if (this.scene.frame % this.frottement == 0) {
        this.Rwheel.setVelocity(0, 0).setPosition(
          this.LastPosR.x,
          this.LastPosR.y
        );
      }
    }
    this.LastPosR = { x: this.Rwheel.x, y: this.Rwheel.y };
    this.LastPosL = { x: this.Lwheel.x, y: this.Lwheel.y };
  }

  update(that) {
    this.setWheel(that);
    this.LLed.update(this.state.led.left);
    this.RLed.update(this.state.led.right);
    this.ultrasonic.update();
    this.state.ir.left = this.irL.update();
    this.state.ir.right = this.irR.update();
  }
}
