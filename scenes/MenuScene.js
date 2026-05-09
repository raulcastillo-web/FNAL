class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a0a');
        
        // Título principal
        this.add.text(this.cameras.main.width / 2, 60, 'FIVE NIGHTS AT', {
            fontSize: '48px',
            fill: '#00ff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.width / 2, 130, 'LICEO DE APODACA', {
            fontSize: '56px',
            fill: '#ffff00',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Subtítulo
        this.add.text(this.cameras.main.width / 2, 200, 'Programa Internacional (IB)', {
            fontSize: '24px',
            fill: '#00ccff',
            fontStyle: 'italic',
            align: 'center'
        }).setOrigin(0.5);

        // Descripción
        this.add.text(this.cameras.main.width / 2, 280, 
            'Resuelve problemas matemáticos para sobrevivir 5 noches en el Liceo\n' +
            'Las entidades del colegio se activarán durante la noche\n' +
            '¿Tienes lo que se necesita para pasar?', {
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Botón JUGAR
        const playButton = this.add.rectangle(
            this.cameras.main.width / 2,
            420,
            240,
            70,
            0x00ff00
        ).setInteractive();

        this.add.text(this.cameras.main.width / 2, 420, 'INICIAR JUEGO', {
            fontSize: '28px',
            fill: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        playButton.on('pointerdown', () => {
            this.scene.start('NightSelectScene');
        });

        playButton.on('pointerover', () => {
            playButton.setFillStyle(0x00dd00);
        });

        playButton.on('pointerout', () => {
            playButton.setFillStyle(0x00ff00);
        });

        // Botón INSTRUCCIONES
        const infoButton = this.add.rectangle(
            this.cameras.main.width / 2,
            530,
            240,
            70,
            0x0099ff
        ).setInteractive();

        this.add.text(this.cameras.main.width / 2, 530, 'INSTRUCCIONES', {
            fontSize: '24px',
            fill: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        infoButton.on('pointerdown', () => {
            this.showInstructions();
        });

        infoButton.on('pointerover', () => {
            infoButton.setFillStyle(0x0088dd);
        });

        infoButton.on('pointerout', () => {
            infoButton.setFillStyle(0x0099ff);
        });

        // Créditos
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 20, 
            'Liceo de Apodaca - Programa IB | Desafío Matemático', {
            fontSize: '14px',
            fill: '#666666',
            align: 'center'
        }).setOrigin(0.5);
    }

    showInstructions() {
        alert(`FIVE NIGHTS AT LICEO DE APODACA - INSTRUCCIONES

OBJETIVO:
Resuelve problemas matemáticos del programa IB durante 5 noches.
Cada noche tiene 10 problemas. Debes completar todas las noches.

VIDAS:
Comienzas con 3 vidas por noche.
Respuesta incorrecta = -1 vida
Si pierdes todas las vidas, GAME OVER

PUNTUACIÓN:
Respuesta correcta = +100 puntos
Respuesta rápida = bonus de tiempo

ENTIDADES (Las enemigo):
- La Suma Académica: Suma/Resta
- El Multiplicador de Tareas: Multiplicación  
- La División del Conocimiento: División
- El Profesor de Geometría: Geometría/Trigonometría
- La Función del Destino: Álgebra/Funciones

TIEMPO:
30 segundos por problema
Si se acaba el tiempo, pierdes 1 vida

¡Buena suerte, estudiante del Liceo!`);
    }
}
