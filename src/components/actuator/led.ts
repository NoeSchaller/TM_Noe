class Led {
    protected reference: any;
    protected on: boolean;
    protected deltaOrigin: number;
    protected rotationOrigin: number;
    protected led: any;
    constructor(scene: any, reference: any, x: number, y: number, radius:number = 4) {
      this.reference = reference;
      this.on = false;
      this.deltaOrigin = Math.sqrt(x ** 2 + y ** 2);
      this.rotationOrigin = Math.atan2(y, x);
  
      this.led = scene.add
        .circle(reference.x + x, reference.y + y, radius, 0x7a0000)
        .setDepth(2);
    }
  
    setOn(bool: boolean) {
      this.on = bool;
    }
  
    getOn() {
      return this.on;
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
  
      if (this.on) {
        this.led.fillColor = 0xff0000;
      } else {
        this.led.fillColor = 0x7a0000;
      }
    }
  }