Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Body = Matter.Body,
Composite = Matter.Composite;
// create an engine
var engine = Engine.create();
// create a renderer
var render = Render.create({
element: document.getElementById('matter'),
engine: engine,
options : {
    width : 800,
    heigth : 800,
}
});



engine.gravity.y = 0


var boxA = new rect(400, 400, 80, 80, {isStatic: true});
var boxB = new rect(400, 300, 80, 80, {frictionAir : 0, angle : -Math.PI/2})
var boxT = new rect(100,100,40,40,{angle : 1, frictionAir : 0})



