function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapLoad(scene) {
  scene.load.image("trail", "assets/trail.png");
}

function mapCreate(scene) {
  new maqueenLite(scene, "N°1", 200, -100, 90);
  new markPic(scene, "trail", 300, 300).setScale(2, 2);
  new wallCircle(scene, 0, 0, 100)
  new zoneRect(scene, 0, 0, 300, 100, 45, function(){console.log(1)})
}

sim = new simulation(600, 600, "game", mapLoad, mapCreate, 0.5, 1, 0);

async function main() {
    await delay(1000);
    setVar()

  setSpeed(30);
  while (true) {
    const vL = irLeft.read_digital(),
      vR = irRight.read_digital();

    if (vL == 0 && vR == 0) {
      forward();
    } else if (vL == 1 && vR == 0) {
      rightArc(0.05);
    } else if (vL == 0 && vR == 1) {
      leftArc(0.05);
    }

    await delay(50)
  }
}


main();
