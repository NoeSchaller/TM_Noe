class RectangleWall {
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
    width: number,
    height: number,
    angle: number = 0
  ) {
    this.type = "wall";
    this.shape = "rectangle";
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = angle;
    this.body = scene.matter.add
      .gameObject(scene.add.rectangle(x, y, width, height, 0xff0000))
      .setStatic(true)
      .setAngle(angle);

    scene.walls.push(this);
    scene.RaycasterDomain.push(this.body);
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
}
