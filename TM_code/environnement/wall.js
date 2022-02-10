class wallRect {
    constructor(that, x, y, width, heigth, angle = 0) {
        this.body = that.matter.add.gameObject(
            that.add.rectangle(x, y, width, heigth, 0xff00000))
            .setStatic(true)
            .setAngle(angle)

        that.walls.push(this.body)
    }
}

class wallCircle {
    constructor(that, x, y, radius) {
        this.body = that.matter.add.gameObject(
            that.add.circle(x, y, radius, 0xff0000)
        )
            .setStatic(true)

        that.walls.push(this.body)
    }
}