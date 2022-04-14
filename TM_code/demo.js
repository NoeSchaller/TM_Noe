function load(scene) {
}

function create(scene) {
  new maqueenLite(scene, "N1", 500, 500, 60);

  new maqueenPlus(scene, "N2", 400, 400, 45);

  new wallRect(scene, 200, 200, 200, 200, 60);

  new wallCircle(scene, 100, 100, 50);

  new markCircle(scene, 100, 500, 50);

  new markRect(scene, 500, 100, 100, 100, 30);
}

sim = new simulation(600, 600, "game", load, create);
