class Picture {

  protected picture: string;
  protected position: { x: number; y: number };
  protected scale: { x: number; y: number };
  protected angle: number;
  protected body: any;
  protected type: string;
  protected shape: string;
  
  constructor(
    scene: any,
    key: string,
    x: number,
    y: number,
    angle: number = 0
  ) {
    this.type = "picture";
    this.shape = "rectangle";
    this.picture = key;
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = angle;
    this.body = scene.matter.add
      .image(x, y, key)
      .setCollidesWith(0)
      .setAngle(angle);

    scene.marks.push(this);
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
}
