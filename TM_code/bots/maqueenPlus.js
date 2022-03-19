class maqueenPlus {
  constructor(scene, name, x, y, angle) {
    //mise  en place de variable utilisables plus tard
    this.name = name;
    this.type = "maqueenPlus";

    //mise en place du "corps" du robot
    this.body = scene.matter.add
      .sprite(x, y, "plusBodyPic", undefined, {
        shape: scene.cache.json.get("plusShape").body,
      })
      .setFrictionAir(0)
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
      angle / 180 * Math.PI,
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
      angle / 180 * Math.PI,
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
  }

  setPosition(x, y) {
    this.body.setPosition(x, y);
    this.Lmotor.wheel.setPosition(
      x + this.Lmotor.delta * Math.cos(this.Lmotor.startAngle),
      y + this.Lmotor.delta * Math.sin(this.Lmotor.startAngle)
    );
    this.Rmotor.wheel.setPosition(
      x + this.Rmotor.delta * Math.cos(this.Rmotor.startAngle),
      y + this.Rmotor.delta * Math.sin(this.Rmotor.startAngle)
    );
  }

  setAngle(deg) {
    this.body.setAngle(deg);

    this.Lmotor.wheel.setPosition(
      this.body.x +
        this.Lmotor.delta *
          Math.cos((deg / 180) * Math.PI + this.Lmotor.relAngle),
      this.body.y +
        this.Lmotor.delta *
          Math.sin((deg / 180) * Math.PI + this.Lmotor.relAngle)
    );
    this.Lmotor.wheel.setAngle(deg);

    this.Rmotor.wheel.setPosition(
      this.body.x +
        this.Rmotor.delta *
          Math.cos((deg / 180) * Math.PI + this.Rmotor.relAngle),
      this.body.y +
        this.Rmotor.delta *
          Math.sin((deg / 180) * Math.PI + this.Rmotor.relAngle)
    );
    this.Rmotor.wheel.setAngle(deg);
  }
}
