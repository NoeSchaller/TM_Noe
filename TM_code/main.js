sim = new simulation(600, 600, "game", mapLoad, mapCreate, 0xcccac0, 1);

setTimeout(() => {

   lite = sim.robots[1]

   plus = sim.robots[0]

   lite.setAngle(0)
   plus.setAngle(90)
}, 4000);