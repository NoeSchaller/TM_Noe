sim = new simulation(600, 600, "game", mapLoad, mapCreate, 0xcccac0, 0);

let old = 0,
    ne = 0

/*
setInterval(() => {

  old = sim.robots[0].Lmotor.time

  setTimeout(() => {
     ne = sim.robots[0].Lmotor.time
     console.log(ne - old) 
  }, 1000);

  
}, 1500);
*/