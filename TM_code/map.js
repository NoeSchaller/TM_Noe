function mapLoad(scene) {
  scene.load.image("csud", "assets/irTest.png");
}

function mapCreate(scene) {
  new maqueenPlus(scene, "N°1", 300, 300, 0);

  new wallPoly(scene, 250, 250, "0 0 40 0 10 10 40 10 10 20 40 20 10 30 0 0")
}
