class robot{
    constructor(that, id, x, y, angle=0, scale=1){
        
        //mise en place du "corps" du robot
        this.body = that.matter.add.sprite(x,y, 'bodyPic', '', {shape: that.cache.json.get('bodyShape').body}).setFrictionAir(0)
        this.Lwheel = that.matter.add.image(x-(89)*scale,y+(45)*scale,'wheel').setFrictionAir(0.5)
        this.Rwheel = that.matter.add.image(x+(89)*scale,y+(45)*scale,'wheel').setFrictionAir(0.5)
        
            //la roue gauche est attachée au corps
        that.matter.add.constraint(this.body, this.Lwheel,'undefined' , 1, {
            pointA: {x:-70*scale,y:-13*scale},
            pointB: {x:-13*scale,y:58*scale}
        })
        that.matter.add.constraint(this.body, this.Lwheel,'undefined' , 1, {
            pointA: {x:-70*scale,y:102*scale},
            pointB: {x:-13*scale,y:-58*scale}
        })
        that.matter.add.constraint(this.body, this.Lwheel,'undefined' , 1, {
            pointA: {x:-70*scale,y:102*scale},
            pointB: {x:-13*scale,y:58*scale}
        })
        that.matter.add.constraint(this.body, this.Lwheel,'undefined' , 1, {
            pointA: {x:-70*scale,y:-13*scale},
            pointB: {x:-13*scale,y:-58*scale}
        })

            // la roue droite est attachée au corps
        that.matter.add.constraint(this.body, this.Rwheel,'undefined' , 1, {
            pointA: {x:70*scale,y:-13*scale},
            pointB: {x:13*scale,y:58*scale}
        })
        that.matter.add.constraint(this.body, this.Rwheel,'undefined' , 1, {
            pointA: {x:70*scale,y:102*scale},
            pointB: {x:13*scale,y:-58*scale}
        })
        that.matter.add.constraint(this.body, this.Rwheel,'undefined' , 1, {
            pointA: {x:70*scale,y:102*scale},
            pointB: {x:13*scale,y:58*scale}
        })
        that.matter.add.constraint(this.body, this.Rwheel,'undefined' , 1, {
            pointA: {x:70*scale,y:-13*scale},
            pointB: {x:13*scale,y:-58*scale}
        })
        //mise en place du capteur ultrason
        this.ultra = that.matter.add.sprite(x,y-4080*scale, 'ultra', '', {shape: that.cache.json.get('ultraShape').ultra}).setScale(scale/8*250).setCollidesWith(0).setVisible(false)

        this.raycaster = that.raycasterPlugin.createRaycaster()
        this.raycaster.mapGameObjects(that.walls)
        this.rayCone = this.raycaster.createRay({origin: {
            x: x,
            y: y-100*scale
          },
          autoSlice: true,
          collisionRange: 2550
        }).setConeDeg(60).setAngleDeg(this.body.angle-90)

        this.raycaster.mapGameObjects(that.walls, true);

        this.intersections = this.rayCone.castCone();
        this.rayCone.enablePhysics('matter');
        
        //mise en place des capteurs infrarouges
        this.irL = that.matter.add.gameObject(
            that.add.circle(x-18*scale,y-40*scale,5*scale, 0xffffff),
            that.matter.add.circle(x-18*scale,y-40*scale,1)
        ).setCollidesWith(0).setDepth(2)

        this.irR = that.matter.add.gameObject(
            that.add.circle(x-18*scale,y-40*scale,5*scale, 0xffffff),
            that.matter.add.circle(x+18*scale,y-40*scale,1)
        ).setCollidesWith(0).setDepth(2)
        
        //mise en place des leds
        this.LLed = that.add.circle(x-45*scale,y-80*scale,10*scale,0x500000).setDepth(2)
        this.RLed = that.add.circle(x+45*scale,y-80*scale,10*scale,0x500000).setDepth(2)

        //mise  en place de variable utilisables plus tard
        this.bot = that.add.group([this.body,this.Lwheel,this.Rwheel])
        this.component =that.add.group([this.irL, this.irR, this.ultra, this.LLed, this.RLed])


        this.LastPosL = {x: x-(89)*scale, y: y+(45)*scale}
        this.LastPosR = {x: x+(89)*scale, y: y+(45)*scale}
        this.scale = scale

        this.state = {wheel:{left:{speed:1,on:false}, right:{speed:1,on:false}},led:{left:false, right:false}, id:id}
        
      
        // adaptation de l'angle et de l'échelle en fonction des paramètres
        this.bot.scaleXY(scale-1, scale-1)
        this.bot.angle(angle)
        this.bot.setDepth(1)
        this.bot.rotateAround({x:x,y:y},angle/360*2*Math.PI)

        // s'ajoute à la liste des robots
        that.robots.push(this)
    };

    setWheel(that){
        if(this.state.wheel.left.on){
                this.Lwheel.setVelocity(
                    Math.cos (this.Lwheel.rotation-Math.PI/2)*this.state.wheel.left.speed,
                    Math.sin(this.Lwheel.rotation-Math.PI/2)*this.state.wheel.left.speed)
        }else{
            if(that.frame % 10 == 0){
                this.Lwheel.setVelocity(0,0).setPosition(this.LastPosL.x,this.LastPosL.y)
            }
        }


        if(this.state.wheel.right.on){
                this.Rwheel.setVelocity(
                    Math.cos(this.Rwheel.rotation-Math.PI/2)*this.state.wheel.right.speed,
                    Math.sin(this.Rwheel.rotation-Math.PI/2)*this.state.wheel.right.speed)
        }else{
            if(that.frame % 10 == 0){
                this.Rwheel.setVelocity(0,0).setPosition(this.LastPosR.x,this.LastPosR.y)
            }
        }
        this.LastPosR = { x: this.Rwheel.x, y: this.Rwheel.y}
        this.LastPosL = { x: this.Lwheel.x, y: this.Lwheel.y}

    };

    setLed(){
        if(this.state.led.left){
            this.LLed.fillColor = 0xff0000
        }else{
           this.LLed.fillColor = 0x500000
        }

        if(this.state.led.right){
            this.RLed.fillColor = 0xff0000
        }else{
            this.RLed.fillColor = 0x500000
        }
    };

    setIrColor(that){
        if(this.SeeIrL(that)){
            this.irL.fillColor = 0xffffff
        }else{
            this.irL.fillColor = 0x404040
        }

        if(this.SeeIrR(that)){
            this.irR.fillColor = 0xffffff
        }else{
            this.irR.fillColor = 0x404040
        }
    };

    SeeIrL(that){
        for(let i = 0; i < that.marks.length; i++){
            if(that.matter.overlap(this.irL, that.marks[i].body)){
                var color = that.textures.getPixel(
                    (this.irL.x-that.marks[i].pos.x+that.marks[i].body.width*that.marks[i].scale.x/2)/that.marks[i].scale.x,
                    (this.irL.y-that.marks[i].pos.y+that.marks[i].body.width*that.marks[i].scale.y/2)/that.marks[i].scale.y,
                    that.marks[i].pic)
                if(
                    color == null){
                }else{
                    if(
                        color.v  < 0.2 & color.a != 0){
                    return true
                    }
                }
            }
        }
        return false
    };

    SeeIrR(that){
        for(let i = 0; i < that.marks.length; i++){
            if(that.matter.overlap(this.irR, that.marks[i].body)){
                var color = that.textures.getPixel(
                    (this.irR.x-that.marks[i].pos.x+that.marks[i].body.width*that.marks[i].scale.x/2)/that.marks[i].scale.x,
                    (this.irR.y-that.marks[i].pos.y+that.marks[i].body.width*that.marks[i].scale.y/2)/that.marks[i].scale.y,
                    that.marks[i].pic)
                if(
                    color == null){
                }else{
                    if(
                        color.v  < 0.2 & color.a != 0 ){
                    return true
                    }
                }
            }
        }
        return false
    };

    getDistance(){
        let distances = []
        let distance
        this.intersections = this.rayCone.castCone();
        for(let i=0; i < this.intersections.length;i++){
            distance = Math.sqrt(
                (this.intersections[i].x-this.rayCone.origin.x)**2
                +(this.intersections[i].y-this.rayCone.origin.y)**2)
            distances.push(Math.round(distance))
        }
        let min = Math.min(...distances)
        if(min < 2550){
            return Math.round(min/10)
        }else{
            return 255
        }
        
    }
        

    setComponent(){
        this.irL.setPosition(this.body.x-18*this.scale,this.body.y-40*this.scale)
        this.irR.setPosition(this.body.x+18*this.scale,this.body.y-40*this.scale)

        this.ultra.setPosition(this.body.x, this.body.y-4080*this.scale)
        this.ultra.setAngle(this.body.angle)

        this.rayCone.setOrigin(
            this.body.x+100*Math.sin(this.body.rotation)*this.scale,
            this.body.y-100*Math.cos(this.body.rotation)*this.scale)
        .setAngleDeg(this.body.angle-90)

        this.LLed.setPosition(this.body.x-45*this.scale,this.body.y-80*this.scale)
        this.RLed.setPosition(this.body.x+45*this.scale,this.body.y-80*this.scale)

        this.component.rotateAround({x:this.body.x,y:this.body.y},this.body.rotation)
        
        
    };

    update(that){
        this.setWheel(that)
        this.setLed()
        this.setComponent()
        this.setIrColor(that)
    }
    
};



class wallRect{
    constructor(that, PointAX, PointAY, PointBX, PointBY){
        this.body = that.matter.add.gameObject(
            that.add.rectangle(
                (PointAX+PointBX)/2,
                (PointAY+PointBY)/2,
                PointAX-PointBX,
                PointAY-PointBY,
                0xff00000)
            ).setStatic(true)

        that.walls.push(this.body)
    }
};

class markRect{
    constructor(that, PointAX, PointAY, PointBX, PointBY){
        this.pic = 'mark'
        this.pos = {x:(PointAX+PointBX)/2, y:(PointAY+PointBY)/2}
        this.scale = {x:PointAX-PointBX, y:PointAY-PointBY }
        this.body = that.matter.add.image(
            (PointAX+PointBX)/2,
            (PointAY+PointBY)/2,
            'mark')
            .setScale(PointAX-PointBX, PointAY-PointBY)
            .setCollidesWith(0)

        that.marks.push(this)
    }
};
class markPic{
    constructor(that, x, y, pic, scale=1){
        this.pic = pic
        this.pos = {x:x, y:y}
        this.scale = {x:scale, y:scale }
        this.body = that.matter.add.image(x, y, pic).setScale(scale).setCollidesWith(0)

        that.marks.push(this)
    }
};


















class Camera{
    constructor(that, simulation){
        this.cam = simulation.cameras.main
        this.follow = 0
        this.cursor = that.add.text(0,0,'<=', {color: '#000', fontSize: 20})
        
        that.add.text(10,10, '+', {color: '#000', backgroundColor: '#fff', padding: 1, fontSize: 40})
                .setInteractive().on('pointerdown', () => {
                    this.cam.zoom *= 1.2, that.echelle.scale *= 1.2
                },

            that.add.text(10,60, '-', {color: '#000', backgroundColor: '#fff', padding: 1, fontSize:40})
                .setInteractive().on('pointerdown', () => {
                    this.cam.zoom /= 1.2, that.echelle.scale /= 1.2
                }),

            that.buttons.push(that.add.text(10,110, 'Free', {color: '#000', backgroundColor: '#999', padding: 3})
            .setInteractive().on('pointerdown', () => {
                this.follow = -1, this.cursor.setPosition(15+that.buttons[0].width,110), this.cam.stopFollow()
            }))
        )

        for(let i=0; i < simulation.robots.length; i++){
            that.buttons.push(that.add.text(10,140+30*i,simulation.robots[i].state.id, {color: '#000', backgroundColor: '#999', padding: 3})
                .setInteractive().on('pointerdown', () => {this.follow = i, this.cursor.setPosition(15+that.buttons[i+1].width,140+30*i)}))
        }

        this.cursor.setPosition(15+that.buttons[1].width,140)
    };

    update(that, sim){
        let inputs = sim.input.keyboard.addKeys({
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right'
        });

        if(this.follow == -1){
            if (inputs.up.isDown)
            {
                this.cam.scrollY -= 5
            }
            else if (inputs.down.isDown)
            {
                this.cam.scrollY += 5
            }

            if (inputs.left.isDown)
            {
                this.cam.scrollX -= 5
            }
            else if (inputs.right.isDown)
            {
                this.cam.scrollX += 5
            }
            
        }else{
            this.cam.startFollow(sim.robots[this.follow].body);
        }

    }
};