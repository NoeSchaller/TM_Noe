class PolygoneZone {
  protected scene: any;
  protected callback: Function;
  protected activated: boolean;
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
    points: any,
    callback: Function,
    color: number = 0xff0000,
    alpha: number = 0.3
  ) {
    this.type = "zone";
    this.shape = "polygone";
    this.scene = scene;
    this.callback = callback;
    this.activated = false;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(scene.add.polygon(x, y, points, 0xff0000), {
        shape: {
          type: "fromVerts",
          verts: points,
          flagInternal: true,
        },
      })
      .setStatic(true)
      .setCollidesWith(0)
      .setFillStyle(color, alpha);

    scene.zones.push(this);
  }

  setPosition(x: number, y: number) {
    this.body.setPosition(x, y);
    this.position = { x: x, y: y };
  }

  setAngle(deg: number) {
    this.body.setAngle(deg);
    this.angle = deg;
  }

  setScale(x: number, y: number) {
    this.body.setAngle(0);
    this.body.setScale(x, y);
    this.body.setAngle(this.angle);
    this.scale = { x: x, y: y };
  }

  update() {
    for (let i = 0; i < this.scene.robots.length; i++) {
      if (this.scene.matter.overlap(this.body, this.scene.robots[i].body)) {
        this.callback(this, this.scene.robots[i]);
      }
    }
  }
}
