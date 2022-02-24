class Simul extends Phaser.Scene {
  constructor(that, mapLoad, mapCreate, mode) {
    super("simulation");
    this.mapLoad = mapLoad;
    this.mapCreate = mapCreate;
    this.parent = that;
    this.mode = mode;
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
    this.frame = 0;
    this.marks = [];
    this.walls = [];

    this.mapCreate(this);

    if (this.mode) {
      this.scene.launch("setup", this);
      this.matter.add.mouseSpring().constraint.stiffness = 0.0005;
    }
    this.scene.launch("overlay", this);
  }

  update() {
    for (let i = 0; i < this.parent.robots.length; i++) {
      this.parent.robots[i].update();
    }
    this.frame++;
  }
}
