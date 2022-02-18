class maqueenLite {
  constructor(scene, name, x, y, angle) {
    //mise  en place de variable utilisables plus tard
    this.name = name;
    this.type = "maqueenLite";

    //mise en place du "corps" du robot
    this.body = scene.matter.add
      .sprite(x, y, "liteBodyPic", undefined, {
        shape: scene.cache.json.get("liteShape").body,
      })
      .setFrictionAir(0)
      .setAngle(angle);

    //mise en place des moteurs
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
    this.irL = new infra(scene, this.body, -7, -16);

    this.irR = new infra(scene, this.body, 7, -16);

    //mise en place des leds
    this.LLed = new led(scene, this.body, -18, -32);

    this.RLed = new led(scene, this.body, 18, -32);

    // mise en place des pins
    this.pin13 = new pin(this, "this.robot.irL.isMarked()"); //irLeft
    this.pin14 = new pin(this, "this.robot.irR.isMarked()"); // irRight
    this.pin8 = new pin(
      this,
      "this.robot.LLed.getOn()",
      "this.robot.LLed.setOn()"
    ); //LLed
    this.pin12 = new pin(
      this,
      "thid.robot.RLed.getOn()",
      "thid.robot.RLed.setOn()"
    ); // RLed
    this.pin1; // ultrason

    // mise en place de l'i2c
    this.i2c = new i2cLite(this);

    // ajout du robot à la liste des robots
    scene.parent.robots.push(this);
  }

  update() {
    this.Lmotor.update();
    this.Rmotor.update();
    this.ultrasonic.update();
    this.irL.update();
    this.irR.update();
    this.LLed.update();
    this.RLed.update();
  }
}
