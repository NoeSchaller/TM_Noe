const config ={
    width:600,
    height: 600,
    backgroundColor : 0xcccac0,
    type: Phaser.AUTO,
    scene : [Simul, Over, Demonstration],
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
