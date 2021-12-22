
sim = new simulation(400, 400, 'map.json')

setInterval(() => {
    console.log(sim.Light[0].pin8.read_digital())
}, 500);
