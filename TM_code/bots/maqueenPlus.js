class maqueenPlus {
  constructor(scene, name, x, y, angle) {
    //mise  en place de variable utilisables plus tard
    this.name = name;

    //mise en place du "corps" du robot
    this.body = scene.matter.add
      .sprite(x, y, "plusBodyPic", undefined, {
        shape: scene.cache.json.get("plusShape").body,
      })
      .setFrictionAir(0)
      .setAngle(angle);

    //mise en place des moteurs
    this.Lmotor = new motor(
      scene,
      this.body,
      angle,
      -45,
      27,
      9,
      43,
      { x: -10, y: 3 },
      { x: -10, y: 47 }
    );

    this.Rmotor = new motor(
      scene,
      this.body,
      angle,
      45,
      27,
      9,
      43,
      { x: 10, y: 3 },
      { x: 10, y: 47 }
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
