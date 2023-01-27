class Infrared {
  protected scene: any;
  protected reference: any;
  protected deltaOrigin: number;
  protected rotationOrigin: number;
  protected stateBlack: boolean;
  protected captor: any;
  protected type: string;
  constructor(
    scene: any,
    reference: any,
    x: number,
    y: number,
    radius = 2,
    stateBlack: boolean = true
  ) {
    this.type = "infrared";
    this.scene = scene;
    this.reference = reference;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    this.rotationOrigin = Math.atan2(y, x);
    this.stateBlack = stateBlack;

    this.captor = scene.matter.add
      .gameObject(
        scene.add.circle(reference.x + x, reference.y + y, radius, 0xffffff),
        scene.matter.add.circle(reference.x + x, reference.y + y, 1)
      )
      .setCollidesWith(0)
      .setDepth(2);
  }

  isMarked() {
    for (let i = 0; i < this.scene.marks.length; i++) {
      if (this.scene.matter.overlap(this.captor, this.scene.marks[i].body)) {
        const mark = this.scene.marks[i];
        if (mark.type != "picture") {
          return this.stateBlack;
        }

        const xAngle0 =
            Math.cos(-(mark.angle / 180) * Math.PI) *
              (this.captor.x - mark.position.x) -
            Math.sin(-(mark.angle / 180) * Math.PI) *
              (this.captor.y - mark.position.y),
          yAngle0 =
            Math.sin(-(mark.angle / 180) * Math.PI) *
              (this.captor.x - mark.position.x) +
            Math.cos(-(mark.angle / 180) * Math.PI) *
              (this.captor.y - mark.position.y);

        const color = this.scene.textures.getPixel(
          xAngle0 / mark.scale.x + mark.body.width / 2,
          yAngle0 / mark.scale.y + mark.body.height / 2,
          mark.picture
        );
        if (color !== null) {
          if (color.v < 0.3 && color.a >= 0.5) {
            return this.stateBlack;
          }
        }
      }
    }
    return !this.stateBlack;
  }

  update() {
    this.captor.setPosition(
      this.reference.x +
        this.deltaOrigin *
          Math.cos(this.reference.rotation + this.rotationOrigin),
      this.reference.y +
        this.deltaOrigin *
          Math.sin(this.reference.rotation + this.rotationOrigin)
    );

    if (this.isMarked()) {
      this.captor.fillColor = 0xffffff;
    } else {
      this.captor.fillColor = 0x404040;
    }
  }
}
