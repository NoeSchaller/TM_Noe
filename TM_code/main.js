sim = new simulation(600, 600, "game", mapLoad, mapCreate, 0xcccac0, 0);


setTimeout(() => {
  let bot = sim.lite[0].robot

  setInterval(() => {
    //console.log(bot.state.ir.left)
  }, 200);

setInterval(() => {
  bot.wholeBody.rotateAround(bot.body, 0.05)
}, 50);
}, 2000);
