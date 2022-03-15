class Over extends Phaser.Scene {
  constructor(robots, width, height) {
    super("overlay");
    this.robots = robots;
    this.height = height;
    this.width = width;
  }

  init(data) {
    this.robots = data[0];
    this.cameraMain = data[1];
  }

  preload() {
    this.load.image("echelle", "assets/scale.png");
  }

  create() {
    this.echelle = this.add.image(70, this.height - 30, "echelle");
    this.buttonsCam = [];

    this.camera = new CameraManager(this, this.robots, this.cameraMain);
  }

  update() {
    this.camera.update(this.robots, this);
  }
}
