function mapLoad(scene) {
  scene.load.image("csud", "assets/Logo_csud.png");
}

function mapCreate(scene) {
  new Picture(scene, "csud", 400, 100, 45);

  new wallRect(scene, 100, 200, 50, 200, 80);

  new wallCircle(scene, 500, 400, 50);

  new markRect(scene, 400, 500, 100, 100, 70);

  new markCircle(scene, 200, 500, 20);

  new maqueenPlus(scene, "N°1", 300, 300, 0);

  new maqueenLite(scene, "N°2", 400, 300, 90);
}