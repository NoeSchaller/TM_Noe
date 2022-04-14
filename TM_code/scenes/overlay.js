class Over extends Phaser.Scene {
  constructor() {
    super("overlay");
  }

  init(data) {
    this.robots = data[0];
    this.camera = data[1];
  }

  preload() {
    this.load.image("echelle", "assets/scale.png");
  }

  create() {
    this.buttons = [];
    this.echelle = this.add.image(70, this.height - 30, "echelle");

    this.add
      .text(10, 60, "-", {
        color: "#000",
        backgroundColor: "#fff",
        padding: 1,
        fontSize: 40,
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.camera.zoom /= 1.2), (this.echelle.scale /= 1.2);
      });

    this.add
      .text(10, 10, "+", {
        color: "#000",
        backgroundColor: "#fff",
        padding: 1,
        fontSize: 40,
      })
      .setInteractive()
      .on("pointerdown", () => {
        (this.camera.zoom *= 1.2), (this.echelle.scale *= 1.2);
      });

    this.buttons.push(
      this.add
        .text(10, 110, "Free", {
          color: "#000",
          backgroundColor: "#999",
          padding: 3,
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.keyboardControl = true;
          this.cursor.setPosition(15 + this.buttons[0].width, 110);
          this.camera.stopFollow();
        })
    );

    for (let i = 0; i < this.robots.length; i++) {
      this.buttons.push(
        this.add
          .text(10, 140 + 30 * i, this.robots[i].name, {
            color: "#000",
            backgroundColor: "#999",
            padding: 3,
          })
          .setInteractive()
          .on("pointerdown", () => {
            this.keyboardControl = false;
            this.cursor.setPosition(
              15 + this.buttons[i + 1].width,
              140 + 30 * i
            );
            this.camera.startFollow(this.robots[i].body);
          })
      );
    }

    this.cursor = this.add.text(0, 0, "<=", { color: "#000", fontSize: 20 });

    if (this.robots.length !== 0) {
      this.keyboardControl = false;
      this.cursor.setPosition(15 + this.buttons[1].width, 140);
      this.camera.startFollow(this.robots[0].body)
    } else {
      this.keyboardControl = true;
      this.cursor.setPosition(15 + this.buttons[0].width, 113);
    }
  }

  update() {
    if (this.keyboardControl) {
      const inputs = this.input.keyboard.addKeys({
        up: "up",
        down: "down",
        left: "left",
        right: "right",
      });

      if (inputs.up.isDown) {
        this.camera.scrollY -= 5;
      } else if (inputs.down.isDown) {
        this.camera.scrollY += 5;
      }

      if (inputs.left.isDown) {
        this.camera.scrollX -= 5;
      } else if (inputs.right.isDown) {
        this.camera.scrollX += 5;
      }
    }
  }
}
