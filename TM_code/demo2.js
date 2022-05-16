function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapLoad(scene) {
  scene.load.image("trail", "assets/trail.png");
  scene.load.image("trail2", "assets/trail2.png");
}

function mapCreate(scene) {
  new maqueenLite(scene, "N°1", 200, -100, 90);
  new Picture(scene, "trail", 300, 300, 0, 2, 2);
  new wallCircle(scene, 200, 200, 100);
  new zoneRect(scene, 250, 700, 200, 50, 90, function (robot, zone) {
    robot.setPosition(-1550, -1200);
    robot.setAngle(0);

    new markPic(scene, "trail2", -1500, -1500, 0, 3, 3);

    zone.setPosition(-1500, -1500);
  });
}

sim = new simulation(600, 600, "simulation", mapLoad, mapCreate, 0.5, 1);

async function main() {
  await delay(500);
  setMbrobot();

  setSpeed(30);
  while (true) {
    const vL = irLeft.read_digital(),
      vR = irRight.read_digital();

    if (vL == 0 && vR == 0) {
      forward();
    } else if (vL == 1 && vR == 0) {
      rightArc(0.1);
    } else if (vL == 0 && vR == 1) {
      leftArc(0.1);
    }

    await delay(50);
  }
}

//main();
