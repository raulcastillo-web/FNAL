class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.stats = data;
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        // Título
        const titleColor = this.stats.won ? '#00ff00' : '#ff0000';
        let titleText = this.stats.won ? '¡NOCHE COMPLETADA!' : 'NOCHE FALLIDA';

        this.add.text(this.cameras.main.width / 2, 60, titleText, {
            fontSize: '60px',
            fill: titleColor,
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Subtítulo
        this.add.text(this.cameras.main.width / 2, 130, `NOCHE ${this.stats.night}`, {
            fontSize: '40px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Estadísticas
        const stats = [
            `Puntuación: ${this.stats.score}`,
            `Tiempo: ${this.stats.time}s`,
            `Resueltos: ${this.stats.problemsSolved}`,
            `Fallados: ${this.stats.problemsFailed}`,
            `Precisión: ${this.calculateAccuracy()}%`
        ];

        let yPos = 220;
        stats.forEach(stat => {
            this.add.text(this.cameras.main.width / 2, yPos, stat, {
                fontSize: '26px',
                fill: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
            yPos += 60;
        });

        // Botones
        let buttonX1 = this.cameras.main.width / 2 - 150;
        let buttonX2 = this.cameras.main.width / 2 + 150;

        // Botón Menú
        const menuButton = this.add.rectangle(buttonX1, 650, 180, 60, 0x0099ff).setInteractive();
        this.add.text(buttonX1, 650, 'MENÚ', { fontSize: '22px', fill: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
        menuButton.on('pointerdown', () => this.scene.start('MenuScene'));

        // Botón Reintentar o Siguiente
        if (this.stats.won && this.stats.nextNight) {
            const nextButton = this.add.rectangle(buttonX2, 650, 180, 60, 0x00ff00).setInteractive();
            this.add.text(buttonX2, 650, 'SIGUIENTE', { fontSize: '22px', fill: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
            nextButton.on('pointerdown', () => this.scene.start('NightSelectScene'));
        } else {
            const retryButton = this.add.rectangle(buttonX2, 650, 180, 60, 0xff6600).setInteractive();
            this.add.text(buttonX2, 650, 'REINTENTAR', { fontSize: '22px', fill: '#000000', fontStyle: 'bold' }).setOrigin(0.5);
            retryButton.on('pointerdown', () => this.scene.start('GameScene', { night: this.stats.night }));
        }
    }

    calculateAccuracy() {
        const total = this.stats.problemsSolved + this.stats.problemsFailed;
        if (total === 0) return 0;
        return Math.round((this.stats.problemsSolved / total) * 100);
    }
}
