// ==========================================
// SCENE: JUEGO PRINCIPAL
// ==========================================

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.nightNumber = data.night || 1;
        this.nightName = data.nightName || 'Noche ' + this.nightNumber;
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a0a');
        
        this.gameState = {
            health: 3,
            maxHealth: 3,
            score: 0,
            time: 0,
            problemsSolved: 0,
            problemsFailed: 0,
            currentProblemIndex: 0,
            totalProblems: 10,
            night: this.nightNumber
        };

        this.mathProblemManager = new MathProblemManager();
        this.mathEntities = [];
        this.currentProblem = null;
        this.timeRemaining = 30;
        this.problemActive = false;

        // Crear UI
        this.createUI();
        
        // Crear entidades
        this.createMathEntities();

        // Generar primer problema
        this.generateNewProblem();

        // Timers
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 3000,
            callback: this.updateEntities,
            callbackScope: this,
            loop: true
        });

        this.input.keyboard.on('keydown', this.handleKeyPress, this);
    }

    createUI() {
        // Barra superior
        this.add.rectangle(0, 0, this.cameras.main.width, 100, 0x1a1a2e)
            .setOrigin(0, 0);

        // Noche
        this.nightText = this.add.text(20, 15, `NOCHE ${this.gameState.night}: ${this.nightName}`, {
            fontSize: '22px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        // Vidas
        this.healthText = this.add.text(20, 50, '', {
            fontSize: '24px',
            fill: '#ff0000',
            fontStyle: 'bold'
        });

        // Puntuación
        this.scoreText = this.add.text(400, 20, `Puntuación: 0`, {
            fontSize: '20px',
            fill: '#00ff00'
        });

        // Progreso
        this.progressText = this.add.text(400, 55, '', {
            fontSize: '20px',
            fill: '#00ff00'
        });

        // Tiempo
        this.timeText = this.add.text(this.cameras.main.width - 350, 20, `Tiempo Total: 0s`, {
            fontSize: '20px',
            fill: '#00ff00'
        });

        // Problema
        this.problemText = this.add.text(this.cameras.main.width / 2, 250, '', {
            fontSize: '36px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 900 },
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Opciones - CORREGIDO
        this.optionsTexts = [];
        const optionY = 350;
        const optionX = [250, 650];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'];

        for (let i = 0; i < 4; i++) {
            const x = optionX[i % 2];
            const y = optionY + (Math.floor(i / 2) * 80);

            // Crear rectángulo
            const rect = this.add.rectangle(x, y, 300, 70, parseInt(colors[i].replace('#', '0x')))
                .setInteractive()
                .setDepth(5);  // Depth normal

            // Crear texto CON MEJOR VISIBILIDAD
            const text = this.add.text(x, y, '', {
                fontSize: '28px',  // ⬆️ AUMENTADO de 22px a 28px
                fill: '#ffffff',   // ⬆️ CAMBIADO a blanco para mejor contraste
                fontStyle: 'bold',
                align: 'center',
                fontFamily: 'Arial'
            }).setOrigin(0.5).setDepth(10);  // ⬆️ DEPTH más alto para que esté encima

            this.optionsTexts.push({ rect, text, index: i });

            rect.on('pointerover', () => {
                rect.setScale(1.1);
                text.setFontSize(32);  // ⬆️ Texto más grande al pasar el mouse
            });

            rect.on('pointerout', () => {
                rect.setScale(1);
                text.setFontSize(28);  // ⬆️ Vuelve al tamaño normal
            });

            rect.on('pointerdown', () => this.selectAnswer(i));
        }

        // Feedback
        this.feedbackText = this.add.text(this.cameras.main.width / 2, 150, '', {
            fontSize: '28px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Timer
        this.timerText = this.add.text(this.cameras.main.width / 2, 600, `Tiempo: 30s`, {
            fontSize: '22px',
            fill: '#ffff00',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        this.updateHealthDisplay();
    }

    createMathEntities() {
        const entities = [
            { name: 'Números', emoji: '🔢' },
            { name: 'Fracciones', emoji: '➗' },
            { name: 'Porcentajes', emoji: '%' },
            { name: 'Álgebra', emoji: 'x' },
            { name: 'Geometría', emoji: '📐' }
        ];

        let xPos = 100;
        entities.forEach((entity, index) => {
            const color = [0xff0000, 0xff6600, 0xffff00, 0x00ffff, 0xff00ff][index];
            const mathEntity = {
                name: entity.name,
                emoji: entity.emoji,
                x: xPos,
                y: 100,
                color: color,
                graphics: this.add.graphics(),
                nameText: null,
                active: false
            };
            mathEntity.nameText = this.add.text(xPos, 180, `${entity.emoji}\n${entity.name}`, {
                fontSize: '12px',
                fill: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);
            this.mathEntities.push(mathEntity);
            xPos += 200;
        });
    }

    generateNewProblem() {
        this.currentProblem = this.mathProblemManager.generateProblem();
        this.problemActive = true;
        this.timeRemaining = 30;
        this.selectedAnswer = null;

        this.problemText.setText(this.currentProblem.question);
        this.feedbackText.setText('');

        const options = this.currentProblem.options;
        this.optionsTexts.forEach((option, index) => {
            option.text.setText(options[index]);
            option.rect.setInteractive();
            option.rect.setFillStyle(parseInt(['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'][index].replace('#', '0x')));
        });
    }

    selectAnswer(index) {
        if (!this.problemActive) return;

        this.problemActive = false;
        this.selectedAnswer = index;

        this.optionsTexts.forEach(option => option.rect.disableInteractive());

        if (index === this.currentProblem.correctIndex) {
            this.gameState.problemsSolved++;
            this.gameState.score += 100;
            this.feedbackText.setText('✓ ¡CORRECTO!');
            this.feedbackText.setColor('#00ff00');

            this.optionsTexts[index].rect.setFillStyle(0x00ff00);

            this.time.delayedCall(1500, () => {
                this.gameState.currentProblemIndex++;
                
                if (this.gameState.currentProblemIndex >= this.gameState.totalProblems) {
                    this.winNight();
                } else {
                    this.generateNewProblem();
                }
            });
        } else {
            this.gameState.problemsFailed++;
            this.gameState.health--;

            this.feedbackText.setText(`✗ INCORRECTO. Respuesta: ${this.currentProblem.options[this.currentProblem.correctIndex]}`);
            this.feedbackText.setColor('#ff0000');

            this.optionsTexts[index].rect.setFillStyle(0xff0000);
            this.optionsTexts[this.currentProblem.correctIndex].rect.setFillStyle(0x00ff00);

            this.updateHealthDisplay();

            if (this.gameState.health <= 0) {
                this.time.delayedCall(1500, () => this.loseNight());
            } else {
                this.time.delayedCall(2000, () => this.generateNewProblem());
            }
        }
    }

    updateHealthDisplay() {
        let hearts = '';
        for (let i = 0; i < this.gameState.maxHealth; i++) {
            hearts += i < this.gameState.health ? '❤️ ' : '🖤 ';
        }
        this.healthText.setText(`Vidas: ${hearts}`);
    }

    updateTimer() {
        this.gameState.time++;
        this.timeText.setText(`Tiempo Total: ${this.gameState.time}s`);

        if (this.problemActive) {
            this.timeRemaining--;
            this.timerText.setText(`Tiempo: ${this.timeRemaining}s`);

            if (this.timeRemaining <= 10) {
                this.timerText.setColor('#ff0000');
            } else if (this.timeRemaining <= 20) {
                this.timerText.setColor('#ffff00');
            } else {
                this.timerText.setColor('#00ff00');
            }

            if (this.timeRemaining <= 0) {
                this.problemActive = false;
                this.gameState.health--;
                this.gameState.problemsFailed++;

                this.feedbackText.setText('⏰ ¡TIEMPO AGOTADO!');
                this.feedbackText.setColor('#ff0000');

                this.optionsTexts.forEach(option => option.rect.disableInteractive());
                this.updateHealthDisplay();

                if (this.gameState.health <= 0) {
                    this.time.delayedCall(1500, () => this.loseNight());
                } else {
                    this.time.delayedCall(2000, () => this.generateNewProblem());
                }
            }
        }
    }

    updateEntities() {
        this.mathEntities.forEach(entity => {
            entity.graphics.clear();
            if (Math.random() < 0.3) {
                entity.active = true;
            } else {
                entity.active = false;
            }

            if (entity.active) {
                entity.graphics.fillStyle(entity.color, 0.8);
                entity.graphics.fillRect(entity.x - 40, entity.y - 40, 80, 80);
                entity.graphics.lineStyle(3, entity.color, 1);
                entity.graphics.strokeRect(entity.x - 40, entity.y - 40, 80, 80);
            } else {
                entity.graphics.fillStyle(entity.color, 0.3);
                entity.graphics.fillRect(entity.x - 40, entity.y - 40, 80, 80);
                entity.graphics.lineStyle(2, entity.color, 1);
                entity.graphics.strokeRect(entity.x - 40, entity.y - 40, 80, 80);
            }
        });
    }

    winNight() {
        this.scene.start('GameOverScene', {
            score: this.gameState.score,
            time: this.gameState.time,
            problemsSolved: this.gameState.problemsSolved,
            problemsFailed: this.gameState.problemsFailed,
            won: true,
            night: this.gameState.night,
            nextNight: this.gameState.night < 5
        });
    }

    loseNight() {
        this.scene.start('GameOverScene', {
            score: this.gameState.score,
            time: this.gameState.time,
            problemsSolved: this.gameState.problemsSolved,
            problemsFailed: this.gameState.problemsFailed,
            won: false,
            night: this.gameState.night
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Escape') {
            this.scene.start('NightSelectScene');
        }
    }

    update() {
        this.progressText.setText(`Progreso: ${this.gameState.currentProblemIndex}/${this.gameState.totalProblems}`);
        this.scoreText.setText(`Puntuación: ${this.gameState.score}`);
    }
}
