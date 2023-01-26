class Simulation {
  public robots: object[] = [];
  public walls: object[] = [];
  public marks: object[] = [];
  public zones: object[] = [];
  protected game: object = {};
  public constructor(
    width: number,
    height: number,
    id: any,
    mapLoad: Function,
    mapCreate: Function,
    zoom: number = 0.8,
    mouse: boolean = true,
    debug: boolean = false,
    background: number = 0xccac0
  ) {
    /*
    this.game = new Phaser.Game({
        width: width,
        height: height,
        backgroundColor: background,
        type: Phaser.WEBGL,
        canvas: document.getElementById(id),
        scene: [
          new Simul(
            this.robots,
            this.walls,
            this.marks,
            this.zones,
            mapLoad,
            mapCreate,
            mouse
          ),
          new Overlay(height, zoom),
        ],
        physics: {
          default: "matter",
          matter: {
            gravity: { y: 0, x: 0 },
            debug: debug,
          },
        },
        plugins: {
          scene: [
            {
              key: "PhaserRaycaster",
              plugin: PhaserRaycaster,
              mapping: "raycasterPlugin",
            },
          ],
        },
      });
  */
  }
}
