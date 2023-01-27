class PolygoneMark {

  protected position: { x: number; y: number };
  protected scale: { x: number; y: number };
  protected angle: number;
  protected body: any;
  protected type: string;
  protected shape: string;
  
  constructor(scene: any, x: number, y: number, points: any) {
    this.type = "mark";
    this.shape = "polygone";
    this.position = { x: x, y: y };
    this.scale = { x: 1, y: 1 };
    this.angle = 0;
    this.body = scene.matter.add
      .gameObject(scene.add.polygon(x, y, points, 0x000000), {
        shape: { type: "fromVerts", verts: points, flagInternal: true },
      })
      .setStatic(true)
      .setCollidesWith(0);

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
