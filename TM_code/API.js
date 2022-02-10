class simulation {
    constructor(width, height, id, mapLoad, mapCreate, background = 0xcccac0, mode = 0) {
        this.lite = []
        this.game = new Phaser.Game({
            width: width,
            height: height,
            backgroundColor: background,
            type: Phaser.WEBGL,
            canvas: document.getElementById(id),
            scene: [new Simul(this, mapLoad, mapCreate, mode), new Setup(width, height), new Over(width, height)],
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 0, x: 0 },
                    debug: 1
                }
            },
            plugins: {
                scene: [
                    {
                        key: 'PhaserRaycaster',
                        plugin: PhaserRaycaster,
                        mapping: 'raycasterPlugin'
                    }
                ]
            }
        });
    }
};