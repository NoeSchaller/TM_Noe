class markRect {
    constructor(that, x, y, width, height, angle = 0) {
        this.pic = 'geom'
        this.body = that.matter.add.gameObject(
            that.add.rectangle(x, y, width, height, 0x000000))
            .setCollidesWith(0)
            .setAngle(angle)

        that.marks.push(this)
    }
}

class markCircle {
    constructor(that, x, y, radius) {
        this.pic = 'geom'
        this.body = that.matter.add.gameObject(
            that.add.circle(x, y, radius, 0x000000))
            .setCollidesWith(0)

        console.log(that)

        that.marks.push(this)
    }
}

class Picture {
    constructor(that, key, x, y, angle = 0) {
        this.pic = key
        this.pos = { x: x, y: y }
        this.scale = { x: 1, y: 1 }
        this.body = that.matter.add.image(x, y, key)
            .setCollidesWith(0)
            .setAngle(angle)

        that.marks.push(this)
    }
}