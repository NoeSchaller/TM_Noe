class Field extends Phaser.Scene {
  protected mapLoad: Function;
  protected mapCreate: Function;
  protected robots: Array<MaqueenLite | MaqueenPlus>;
  protected walls: Array<RectangleWall | CircleWall | PolygoneWall>;
  protected marks: Array<RectangleMark | CircleMark | PolygoneMark>;
  protected zones: Array<RectangleZone | CircleZone | PolygoneZone>;
  protected RaycasterDomain: Array<MaqueenLite | MaqueenPlus>;
  protected mouse: boolean;
  protected load: any;
  protected matter: any;
  protected scene: any;
  protected cameras: any;

  constructor(
    robots: Array<MaqueenLite | MaqueenPlus>,
    walls: Array<RectangleWall | CircleWall | PolygoneWall>,
    marks: Array<RectangleMark | CircleMark | PolygoneMark>,
    zones: Array<RectangleZone | CircleZone | PolygoneZone>,
    mapLoad: Function,
    mapCreate: Function,
    mouse: boolean
  ) {
    super("field");
    this.mapLoad = mapLoad;
    this.mapCreate = mapCreate;
    this.robots = robots;
    this.walls = walls;
    this.marks = marks;
    this.zones = zones;
    this.mouse = mouse;
    this.RaycasterDomain = [];
  }

  preload() {
    this.load.json("liteShape", "assets/liteShape.json");
    this.load.json("plusShape", "assets/plusShape.json");

    this.load.spritesheet("liteBodyPic", "assets/liteBody.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("plusBodyPic", "assets/plusBody.png", {
      frameWidth: 100,
      frameHeight: 103,
    });

    this.mapLoad(this);
  }

  create() {
    this.mapCreate(this);

    if (this.mouse) {
      this.matter.add.mouseSpring({ stiffness: 0.001 }).constraint;
    }

    this.scene.launch("overlay", [this.robots, this.cameras.main]);
  }

  update() {
    for (let i = 0; i < this.zones.length; i++) {
      this.zones[i].update();
    }

    for (let i = 0; i < this.robots.length; i++) {
      this.robots[i].update();
    }
  }
}
