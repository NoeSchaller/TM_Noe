class maqueenLite {
  constructor(scene, name, x, y, angle) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenLite";

    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "liteBodyPic", undefined, {
        shape: scene.cache.json.get("liteShape").body,
      })
      .setFrictionAir(0)
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
      (angle / 180) * Math.PI,
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
      (angle / 180) * Math.PI,
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
  }

  setPosition(x, y) {
    this.body.setPosition(x, y);
    this.Lmotor.wheel.setPosition(
      x + this.Lmotor.deltaOrigin * Math.cos(this.Lmotor.rotationOrigin),
      y + this.Lmotor.deltaOrigin * Math.sin(this.Lmotor.rotationOrigin)
    );
    this.Rmotor.wheel.setPosition(
      x + this.Rmotor.deltaOrigin * Math.cos(this.Rmotor.rotationOrigin),
      y + this.Rmotor.deltaOrigin * Math.sin(this.Rmotor.rotationOrigin)
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
