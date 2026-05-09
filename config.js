const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, NightSelectScene, GameScene, GameOverScene],
    render: {
        pixelArt: false,
        antialias: true
    }
};

const game = new Phaser.Game(config);
