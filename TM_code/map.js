function mapLoad(scene) {
  scene.load.image("csud", "assets/irTest.png");
}

function mapCreate(scene) {
  new maqueenPlus(scene, "N°1", 300, 300, 0);

  new wallPic(scene, "csud", 50, 200, 5);
}
