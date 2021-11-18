function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*function chain(array){
    var length = 0
    eval(array[0])
    for (var i = 1; i < array.length; i++) {
        
        }
    }   */

function rect(width, height, x, y, options=null){
    this.box = Bodies.rectangle(width,height,x,y,options)
    Composite.add(engine.world, this.box)

    var angle = this.box.angle
    var pos = this.box.position

    this.forward = function(time=2000,speed=1){
        Body.setVelocity(this.box, {x:speed*Math.cos(angle),y:speed*Math.sin(angle)})
        sleep(time).then(() => {
            Body.setVelocity(this.box,{x:0,y:0}) 
        })
    }

    this.rotate = function(time, angle=0.01){
        Body.setAngularVelocity(this.box, angle)

        sleep(time).then(() => {
            Body.setAngularVelocity(this.box, 0)})
    }
}
