class Ultrasonic {
  protected reference: any;
  protected scene: any;
  protected range: number;
  protected angle: number;
  protected deltaOrigin: number;
  protected rotationOrigin: number;
  protected raycaster: any;
  protected rayCone: any;

  constructor(
    scene: any,
    reference: any,
    x: number,
    y: number,
    angle: number = 0,
    range: number = 255,
    coneAngle: number = 60
  ) {
    this.reference = reference;
    this.scene = scene;
    this.range = range;
    this.angle = (angle / 180) * Math.PI;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    this.rotationOrigin = Math.atan2(y, x);

    this.raycaster = scene.raycasterPlugin.createRaycaster();
    this.raycaster.mapGameObjects(scene.RaycasterDomain);
    this.rayCone = this.raycaster
      .createRay({
        origin: {
          x: reference.x + x,
          y: reference.y + y,
        },
        autoSlice: true,
        collisionRange: range * 10,
      })
      .setConeDeg(coneAngle)
      .setAngle(reference.rotation + Math.PI / 2 + this.angle);

    this.rayCone.enablePhysics("matter");

    this.raycaster.mapGameObjects(scene.RaycasterDomain);
  }

  getDistance() {
    let intersections: Array<{ x: number; y: number }> = [];
    let distances: Array<number> = [];
    let distance: number;
    this.raycaster.mapGameObjects(this.scene.RaycasterDomain);
    intersections = this.rayCone.castCone();
    for (let i = 0; i < intersections.length; i++) {
      distance = Math.sqrt(
        (intersections[i].x - this.rayCone.origin.x) ** 2 +
          (intersections[i].y - this.rayCone.origin.y) ** 2
      );
      distances.push(Math.round(distance));
    }
    let min = Math.min(...distances);
    if (min < this.range * 10) {
      return Math.round(min / 10);
    } else {
      return this.range;
    }
  }

  update() {
    this.rayCone
      .setOrigin(
        this.reference.x +
          this.deltaOrigin *
            Math.cos(this.reference.rotation + this.rotationOrigin),
        this.reference.y +
          this.deltaOrigin *
            Math.sin(this.reference.rotation + this.rotationOrigin)
      )
      .setAngle(this.reference.rotation - Math.PI / 2 + this.angle);
  }
}
