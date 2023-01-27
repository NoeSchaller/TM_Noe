class MaqueenLite {
  protected name: string;
  protected type: string;
  protected angle: number;
  protected position: { x: number; y: number };
  protected body: any;
  protected Lmotor: Motor;
  protected Rmotor: Motor;
  protected ultrasonic: any;
  protected irL: any;
  protected infraRedRight: any;
  protected LLed: any;
  protected RLed: any;
  protected pin13: any;
  protected pin14: any;
  protected pin8: any;
  protected pin12: any;
  protected pin1: any;
  protected i2c: any;
  constructor(scene: any, name: string, x: number, y: number, angle: number) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenLite";
    this.angle = angle;
    this.position = { x: x, y: y };

    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "liteBodyPic", undefined, {
        shape: scene.cache.json.get("liteShape").body,
      })
      .setFrictionAir(0)
      .setDepth(2)
      .setAngle(angle);

    //mise en place des moteurs
    let speedGrowth = function (power: number) {
      return (
        -9e-9 * power ** 4 +
        7e-6 * power ** 3 -
        0.0021 * power ** 2 +
        0.3121 * power -
        1.2
      );
    };

    this.Lmotor = new Motor(
      scene,
      this.body,
      -35,
      18,
      9,
      43,
      { x: -10, y: -4 },
      { x: -10, y: 40 },
      speedGrowth
    );

    this.Rmotor = new Motor(
      scene,
      this.body,
      35,
      18,
      9,
      43,
      { x: 10, y: -4 },
      { x: 10, y: 40 },
      speedGrowth
    );

    //mise en place du capteur ultrason
    this.ultrasonic = new Ultrasonic(scene, this.body, 0, -35);

    //mise en place des capteurs infrarouges
    this.irL = new Infrared(scene, this.body, -7, -16, 2, false);

    this.infraRedRight = new Infrared(scene, this.body, 7, -16, 2, false);

    //mise en place des leds
    this.LLed = new Led(scene, this.body, -18, -32);

    this.RLed = new Led(scene, this.body, 18, -32);

    // mise en place des pins
    this.pin13 = new Pin(this.irL, "isMarked"); //irLeft
    this.pin14 = new Pin(this.infraRedRight, "isMarked"); // irRight
    this.pin8 = new Pin(this.LLed, "getOn", "setOn"); //LLed
    this.pin12 = new Pin(this.RLed, "getOn", "setOn"); // RLed
    this.pin1; // ultrason

    // mise en place de l'i2c
    this.i2c = new I2cLite(this);

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
    this.infraRedRight.update();
    this.LLed.update();
    this.RLed.update();
    this.position = { x: this.body.x, y: this.body.y };
    this.angle = this.body.angle;
  }

  setPosition(x: number, y: number) {
    this.body.setPosition(x, y);
    this.Lmotor.wheel.setPosition(
      x +
        this.Lmotor.deltaOrigin *
          Math.cos(this.Lmotor.rotationOrigin + this.body.rotation),
      y +
        this.Lmotor.deltaOrigin *
          Math.sin(this.Lmotor.rotationOrigin + this.body.rotation)
    );
    this.Rmotor.wheel.setPosition(
      x +
        this.Rmotor.deltaOrigin *
          Math.cos(this.Rmotor.rotationOrigin + this.body.rotation),
      y +
        this.Rmotor.deltaOrigin *
          Math.sin(this.Rmotor.rotationOrigin + this.body.rotation)
    );
  }

  setAngle(deg: number) {
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
