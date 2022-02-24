class CameraManager {
  constructor(scene, simulation, seeBot = 1) {
    this.cam = simulation.cameras.main;
    this.follow = -1;

    scene.add
      .text(10, 60, "-", {
        color: "#000",
        backgroundColor: "#fff",
        padding: 1,
        fontSize: 40,
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.cam.zoom /= 1.2), (scene.echelle.scale /= 1.2);
      });

    scene.add
      .text(10, 10, "+", {
        color: "#000",
        backgroundColor: "#fff",
        padding: 1,
        fontSize: 40,
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.cam.zoom *= 1.2), (scene.echelle.scale *= 1.2);
      });

    scene.buttonsCam.push(
      scene.add
        .text(10, 110, "Free", {
          color: "#000",
          backgroundColor: "#999",
          padding: 3,
        })
        .setInteractive()
        .on("pointerdown", () => {
          (this.follow = -1),
            this.cursor.setPosition(15 + scene.buttonsCam[0].width, 110),
            this.cam.stopFollow();
        })
    );

    this.cursor = scene.add.text(0, 0, "<=", { color: "#000", fontSize: 20 });

    for (let i = 0; i < simulation.parent.robots.length; i++) {
      scene.buttonsCam.push(
        scene.add
          .text(10, 140 + 30 * i, simulation.parent.robots[i].name, {
            color: "#000",
            backgroundColor: "#999",
            padding: 3,
          })
          .setInteractive()
          .on("pointerdown", () => {
            (this.follow = i),
              this.cursor.setPosition(
                15 + scene.buttonsCam[i + 1].width,
                140 + 30 * i
              );
          })
      );
    }

    this.cursor.setPosition(15 + scene.buttonsCam[0].width, 113);

    this.follow = -1;
  }

  update(simulation, scene) {
    let inputs = scene.input.keyboard.addKeys({
      up: "up",
      down: "down",
      left: "left",
      right: "right",
    });

    if (this.follow == -1) {
      if (inputs.up.isDown) {
        this.cam.scrollY -= 5;
      } else if (inputs.down.isDown) {
        this.cam.scrollY += 5;
      }

      if (inputs.left.isDown) {
        this.cam.scrollX -= 5;
      } else if (inputs.right.isDown) {
        this.cam.scrollX += 5;
      }
    } else {
      this.cam.startFollow(simulation.robots[this.follow].body);
    }
  }
}
