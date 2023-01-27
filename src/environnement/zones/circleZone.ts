class CircleZone {
  protected scene: any;
  protected callback: Function;
  protected position: { x: number; y: number };
  protected scale: { x: number; y: number };
  protected angle: number;
  protected body: any;
  protected type: string;
  protected shape: string;

  constructor(
    scene: any,
    x: number,
    y: number,
    radius: number,
    callback: Function,
    color: number = 0xff0000,
    alpha: number = 0.3
  ) {
    this.type = "zone";
    this.shape = "circle";
    this.scene = scene;
    this.callback = callback;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(
        scene.add.circle(x, y, radius),
        scene.matter.add.circle(x, y, radius)
      )
      .setStatic(true)
      .setCollidesWith(0)
      .setFillStyle(color, alpha);

    scene.zones.push(this);
  }

  public setPosition(x: number, y: number) {
    this.body.setPosition(x, y);
    this.position = { x: x, y: y };
  }

  public setAngle(deg: number) {
    this.body.setAngle(deg);
    this.angle = deg;
  }

  public setScale(x: number, y: number) {
    this.body.setAngle(0);
    this.body.setScale(x, y);
    this.body.setAngle(this.angle);
    this.scale = { x: x, y: y };
  }

  public update() {
    for (let i = 0; i < this.scene.robots.length; i++) {
      if (this.scene.matter.overlap(this.body, this.scene.robots[i].body)) {
        this.callback();
      }
    }
  }
}
