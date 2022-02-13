function mapLoad(scene) {
  scene.load.image("csud", "assets/Logo_csud.png");
}

function mapCreate(scene) {
  new Picture(scene, "csud", 400, 100, 45);

  new wallRect(scene, 100, 200, 50, 200);

  new markRect(scene, 400, 500, 100, 100);

  new maqueenPlus(scene, "N°1", 300, 300, 50);
}
