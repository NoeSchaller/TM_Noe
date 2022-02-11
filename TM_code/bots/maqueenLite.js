class maqueenLite {
  constructor(that, name, x, y, angle = 0) {
    this.robot = new bodyLite(that, name, x, y, angle);
    this.i2c = new i2c(this.robot);
    this.pin13 = new pin(this.robot, "this.robot.irL.isMarked()"); //irLeft
    this.pin14 = new pin(this.robot, "this.robot.irR.isMarked()"); // irRight
    this.pin8 = new pin(
      this.robot,
      "this.robot.LLed.getOn()",
      "this.robot.LLed.setOn()"
    ); //LLed
    this.pin12 = new pin(
      this.robot,
      "this.robot.RLed.getOn()",
      "this.robot.RLed.setOn()"
    ); // RLed
    this.pin1; // ultrason

    that.parent.lite.push(this);
  }
}

class bodyLite {
  constructor(scene, id, x, y, angle) {
    //mise  en place de variable utilisables plus tard
    this.scale = 0.4;
    this.id = id;

    //mise en place du "corps" du robot
    this.body = scene.matter.add
      .sprite(x, y, "bodyPic", "", {
        shape: scene.cache.json.get("bodyShape").body,
      })
      .setFrictionAir(0)
      .setScale(this.scale)
      .setAngle(angle);

    this.Lmotor = new motor(
      scene,
      this.body,
      angle,
      -35,
      18,
      9,
      43,
      { x: -10, y: -4 },
      { x: -10, y: 40 }
    );

    this.Rmotor = new motor(
      scene,
      this.body,
      angle,
      35,
      18,
      9,
      43,
      { x: 10, y: -4 },
      { x: 10, y: 40 }
    );

    //mise en place du capteur ultrason

    this.ultrasonic = new ultrasonicD(scene, this.body, 0, -35);

    //mise en place des capteurs infrarouges

    this.irL = new infra(scene, this.body, -18 * this.scale, -40 * this.scale);

    this.irR = new infra(scene, this.body, 18 * this.scale, -40 * this.scale);

    //mise en place des leds

    this.LLed = new led(scene, this.body, -45 * this.scale, -80 * this.scale);

    this.RLed = new led(scene, this.body, 45 * this.scale, -80 * this.scale);
  }

  update() {
    this.LLed.update();
    this.RLed.update();
    this.ultrasonic.update();
    this.irL.update();
    this.irR.update();
    this.Rmotor.update();
    this.Lmotor.update();
  }
}
