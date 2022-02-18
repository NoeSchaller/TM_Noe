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
        -1e-8 * (power ** 4) +
        1e-5 * (power ** 3) -
        0.0032 * (power ** 2) +
        0.4053 * (power) -
        2.8394
      );
    };
    this.Lmotor = new motor(
      scene,
      this.body,
      angle,
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
      angle,
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
    scene.parent.robots.push(this);
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
}
