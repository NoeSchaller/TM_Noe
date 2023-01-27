class MaqueenPlus {
  protected name: string;
  protected type: string;
  protected angle: number;
  protected position: { x: number; y: number };
  protected body: any;
  protected leftMotor: Motor;
  protected rightMotor: Motor;
  protected ultrasonic: any;
  protected infraLeft1: any;
  protected infraLeft2: any;
  protected infraLeft3: any;
  protected infraRight1: any;
  protected infraRight2: any;
  protected infraRight3: any;
  protected ledLeft: any;
  protected ledRight: any;
  protected i2c: any;

  constructor(scene: any, name: string, x: number, y: number, angle: number) {
    //mise  en place de variables
    this.name = name;
    this.type = "maqueenPlus";
    this.angle = angle;
    this.position = { x: x, y: y };

    //mise en place de l'élément body
    this.body = scene.matter.add
      .sprite(x, y, "plusBodyPic", undefined, {
        shape: scene.cache.json.get("plusShape").body,
      })
      .setFrictionAir(0)
      .setDepth(2)
      .setAngle(angle);

    //mise en place des moteurs
    let speedGrowth = function (power: number) {
      return (
        -1e-8 * power ** 4 +
        1e-5 * power ** 3 -
        0.0032 * power ** 2 +
        0.4053 * power -
        2.8394
      );
    };
    this.leftMotor = new Motor(
      scene,
      this.body,
      -45,
      27,
      9,
      43,
      { x: -10, y: 5 },
      { x: -10, y: 49 },
      speedGrowth
    );

    this.rightMotor = new Motor(
      scene,
      this.body,
      45,
      27,
      9,
      43,
      { x: 10, y: 5 },
      { x: 10, y: 49 },
      speedGrowth
    );

    //mise en place du capteur ultrason
    this.ultrasonic = new Ultrasonic(scene, this.body, 0, -21);

    //mise en place des capteurs infrarouges
    this.infraLeft1 = new Infrared(scene, this.body, -5, -31);

    this.infraLeft2 = new Infrared(scene, this.body, -15, -31);

    this.infraLeft3 = new Infrared(scene, this.body, -45, -11);

    this.infraRight1 = new Infrared(scene, this.body, 5, -31);

    this.infraRight2 = new Infrared(scene, this.body, 15, -31);

    this.infraRight3 = new Infrared(scene, this.body, 45, -11);

    //mise en place des leds rgb
    this.ledLeft = new RgbLed(scene, this.body, -20, -45);

    this.ledRight = new RgbLed(scene, this.body, 20, -45);

    //mise en place de l'i2c
    this.i2c = new i2cPlus(this);

    // ajout du robot à la liste des robots
    scene.robots.push(this);
  }

  getDistance() {
    return this.ultrasonic.getDistance();
  }

  update() {
    this.leftMotor.update();
    this.rightMotor.update();
    this.ultrasonic.update();
    this.infraLeft1.update();
    this.infraLeft2.update();
    this.infraLeft3.update();
    this.infraRight1.update();
    this.infraRight2.update();
    this.infraRight3.update();
    this.ledLeft.update();
    this.ledRight.update();
    this.position = { x: this.body.x, y: this.body.y };
    this.angle = this.body.angle;
  }

  setPosition(x: number, y: number) {
    this.body.setPosition(x, y);
    this.leftMotor.wheel.setPosition(
      x +
        this.leftMotor.deltaOrigin *
          Math.cos(this.leftMotor.rotationOrigin + this.body.rotation),
      y +
        this.leftMotor.deltaOrigin *
          Math.sin(this.leftMotor.rotationOrigin + this.body.rotation)
    );
    this.rightMotor.wheel.setPosition(
      x +
        this.rightMotor.deltaOrigin *
          Math.cos(this.rightMotor.rotationOrigin + this.body.rotation),
      y +
        this.rightMotor.deltaOrigin *
          Math.sin(this.rightMotor.rotationOrigin + this.body.rotation)
    );
  }

  setAngle(deg: number) {
    this.body.setAngle(deg);

    this.leftMotor.wheel.setPosition(
      this.body.x +
        this.leftMotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.leftMotor.rotationOrigin),
      this.body.y +
        this.leftMotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.leftMotor.rotationOrigin)
    );
    this.leftMotor.wheel.setAngle(deg);

    this.rightMotor.wheel.setPosition(
      this.body.x +
        this.rightMotor.deltaOrigin *
          Math.cos((deg / 180) * Math.PI + this.rightMotor.rotationOrigin),
      this.body.y +
        this.rightMotor.deltaOrigin *
          Math.sin((deg / 180) * Math.PI + this.rightMotor.rotationOrigin)
    );
    this.rightMotor.wheel.setAngle(deg);
  }
}
