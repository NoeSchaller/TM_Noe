boxB.forward(1000)
setTimeout(function(){
    console.log(10)
},2000)



console.log(boxT.box)



Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

function wait() {
    var a = 5000 + new Date().getTime();
    while (new Date() < a){}
    console.log('waitfunction() context will be popped after this line');
}