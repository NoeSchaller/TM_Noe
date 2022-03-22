sim = new simulation(600, 600, "game", mapLoad, mapCreate, 0xcccac0, 1);

setTimeout(() => {
  setInterval(() => {
    console.log(sim.robots[0].Lmotor.angle)
  }, 500);
}, 2000);

setTimeout(() => {
  sim.robots[0].i2c.write(0x10, [0x00, 1, 30])
}, 2200);