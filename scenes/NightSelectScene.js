class NightSelectScene extends Phaser.Scene {
    constructor() {
        super('NightSelectScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#1a1a2e');

        // Título
        this.add.text(this.cameras.main.width / 2, 50, 'SELECCIONA TU NOCHE', {
            fontSize: '44px',
            fill: '#00ff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Noches disponibles
        const nights = [
            { num: 1, name: 'La Suma Académica', difficulty: 'FÁCIL', color: 0xff4444 },
            { num: 2, name: 'El Multiplicador', difficulty: 'MODERADO', color: 0xff9944 },
            { num: 3, name: 'La División del Saber', difficulty: 'DIFÍCIL', color: 0xffdd44 },
            { num: 4, name: 'Geometría Oscura', difficulty: 'MUY DIFÍCIL', color: 0x44ddff },
            { num: 5, name: 'La Función Final', difficulty: 'IMPOSIBLE', color: 0xff44ff }
        ];

        let yPos = 150;
        nights.forEach((night, index) => {
            // Botón de noche
            const button = this.add.rectangle(
                this.cameras.main.width / 2,
                yPos,
                700,
                80,
                night.color
            ).setInteractive();

            // Texto de noche
            this.add.text(50, yPos - 25, `NOCHE ${night.num}`, {
                fontSize: '28px',
                fill: '#000000',
                fontStyle: 'bold'
            });

            this.add.text(250, yPos - 25, night.name, {
                fontSize: '24px',
                fill: '#000000'
            });

            this.add.text(this.cameras.main.width - 200, yPos - 25, `${night.difficulty}`, {
                fontSize: '20px',
                fill: '#000000',
                fontStyle: 'bold',
                align: 'right'
            });

            button.on('pointerdown', () => {
                this.scene.start('GameScene', { 
                    night: night.num,
                    nightName: night.name 
                });
            });

            button.on('pointerover', () => {
                button.setScale(1.05);
            });

            button.on('pointerout', () => {
                button.setScale(1);
            });

            yPos += 100;
        });

        // Botón volver
        const backButton = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height - 50,
            200,
            60,
            0x333333
        ).setInteractive();

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 50, 'VOLVER', {
            fontSize: '22px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
