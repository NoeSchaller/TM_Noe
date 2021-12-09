const config ={
    width:800,
    height: 800,
    backgroundColor : 0xcccac0,
    type: Phaser.AUTO,
    scene : [Simul, Over],
    physics: {
        default: 'matter',
        matter: {
           gravity: {y: 0,  x: 0},
           debug: 0
        }
    },
    render : {},
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    }
};

var game = new Phaser.Game(config);
