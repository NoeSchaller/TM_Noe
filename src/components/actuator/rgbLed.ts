class RgbLed {
    protected reference: any;
    protected color: number;
    protected deltaOrigin: number;
    protected rotationOrigin: number;
    protected led: any
    constructor(scene: any, reference: any, x: number, y: number, radius: number = 5) {
      this.reference = reference;
      this.color = 0x808080;
      this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
      this.rotationOrigin = Math.atan2(y, x);
  
      this.led = scene.add
        .circle(reference.x + x, reference.y + y, radius, 0x808080)
        .setDepth(2);
    }
  
    setColor(color: number) {
      this.color = color;
    }
  
    update() {
      this.led.setPosition(
        this.reference.x +
          this.deltaOrigin *
            Math.cos(this.reference.rotation + this.rotationOrigin),
        this.reference.y +
          this.deltaOrigin *
            Math.sin(this.reference.rotation + this.rotationOrigin)
      );
  
      this.led.fillColor = this.color;
    }
  }