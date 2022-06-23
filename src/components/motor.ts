import { ClassElement } from "typescript";

class Motor {
  readonly speed: number;
  readonly power: number;
  readonly direction: number;
  readonly radius: number;
  readonly angle: number;
  readonly deltaOrigin: number;
  readonly rotationOrigin: number;
  readonly wheel: object;

  constructor(
    readonly scene: object,
    readonly reference: object,
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number,
    readonly point1: { x: number; y: number },
    readonly point2: { x: number; y: number },
    readonly powerToSpeed: Function
  ) {
    this.speed = 0;
    this.power = 0;
    this.direction = 0;
    this.radius = height / 20;
    this.angle = 0;
    this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
    const deltaPoint1 = Math.sqrt(point1.x ** 2 + point1.y ** 2),
      deltaPoint2 = Math.sqrt(point2.x ** 2 + point2.y ** 2);

    this.rotationOrigin = Math.atan2(y, x);
    const rotationPoint1 = Math.atan2(point1.y, point1.x),
      rotationPoint2 = Math.atan2(point2.y, point2.x);

    this.wheel = scene.matter.add
      .gameObject(
        scene.add.rectangle(
          reference.x +
            this.deltaOrigin *
              Math.cos(this.rotationOrigin + reference.rotation),
          reference.y +
            this.deltaOrigin *
              Math.sin(this.rotationOrigin + reference.rotation),
          width,
          height,
          0x808080
        ),
        scene.matter.add.rectangle(
          reference.x +
            this.deltaOrigin *
              Math.cos(this.rotationOrigin + reference.rotation),
          reference.y +
            this.deltaOrigin *
              Math.sin(this.rotationOrigin + reference.rotation),
          width,
          height
        )
      )
      .setRotation(reference.rotation)
      .setDepth(2)
      .setFrictionAir(3);

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(-reference.rotation),
        y: (height / 2) * Math.cos(-reference.rotation),
      },
      pointB: {
        x: deltaPoint1 * Math.cos(rotationPoint1 + reference.rotation),
        y: deltaPoint1 * Math.sin(rotationPoint1 + reference.rotation),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(-reference.rotation),
        y: (height / 2) * Math.cos(-reference.rotation),
      },
      pointB: {
        x: deltaPoint2 * Math.cos(rotationPoint2 + reference.rotation),
        y: deltaPoint2 * Math.sin(rotationPoint2 + reference.rotation),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(reference.rotation),
        y: (-height / 2) * Math.cos(reference.rotation),
      },
      pointB: {
        x: deltaPoint1 * Math.cos(rotationPoint1 + reference.rotation),
        y: deltaPoint1 * Math.sin(rotationPoint1 + reference.rotation),
      },
    });

    scene.matter.add.constraint(this.wheel, reference, undefined, 1, {
      pointA: {
        x: (height / 2) * Math.sin(reference.rotation),
        y: (-height / 2) * Math.cos(reference.rotation),
      },
      pointB: {
        x: deltaPoint2 * Math.cos(rotationPoint2 + reference.rotation),
        y: deltaPoint2 * Math.sin(rotationPoint2 + reference.rotation),
      },
    });
  }
}
