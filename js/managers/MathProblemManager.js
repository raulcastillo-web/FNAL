// ==========================================
// GESTOR DE PROBLEMAS MATEMÁTICOS - 8VO GRADO
// ==========================================

class MathProblemManager {
    constructor() {
        this.eighthGradeProblems = [
            // ===== NOCHE 1: NÚMEROS ENTEROS Y OPERACIONES BÁSICAS =====
            { question: "¿Cuánto es -5 + 12?", options: ["7", "-7", "17", "-17"], correctIndex: 0 },
            { question: "¿Cuánto es -8 - 3?", options: ["5", "-11", "-5", "11"], correctIndex: 1 },
            { question: "¿Cuánto es -4 × 6?", options: ["24", "-24", "10", "-10"], correctIndex: 1 },
            { question: "¿Cuánto es -20 ÷ 4?", options: ["5", "-5", "16", "-16"], correctIndex: 1 },
            { question: "¿Cuánto es -3 × -7?", options: ["-21", "21", "10", "-10"], correctIndex: 1 },
            { question: "¿Cuánto es 15 - 8?", options: ["7", "-7", "23", "-23"], correctIndex: 0 },
            { question: "¿Cuánto es -12 + 5?", options: ["-7", "7", "-17", "17"], correctIndex: 0 },
            { question: "¿Cuánto es 9 + (-6)?", options: ["3", "-3", "15", "-15"], correctIndex: 0 },
            { question: "¿Cuánto es -18 ÷ 6?", options: ["-3", "3", "-12", "12"], correctIndex: 0 },
            { question: "¿Cuánto es -2 × -5?", options: ["-10", "10", "7", "-7"], correctIndex: 1 },

            // ===== NOCHE 2: FRACCIONES Y DECIMALES =====
            { question: "¿Cuánto es 1/2 + 1/4?", options: ["3/4", "2/4", "1/6", "2/6"], correctIndex: 0 },
            { question: "¿Cuánto es 3/5 - 1/5?", options: ["2/5", "4/5", "2/10", "1/10"], correctIndex: 0 },
            { question: "¿Cuánto es 1/2 × 2/3?", options: ["1/3", "2/5", "3/5", "3/6"], correctIndex: 0 },
            { question: "¿Cuánto es 3/4 ÷ 1/2?", options: ["3/2", "3/8", "6/4", "1/2"], correctIndex: 0 },
            { question: "¿Cuánto es 0.5 + 0.25?", options: ["0.75", "0.25", "0.30", "1.25"], correctIndex: 0 },
            { question: "¿Cuánto es 2.5 - 1.3?", options: ["1.2", "1.8", "3.8", "0.2"], correctIndex: 0 },
            { question: "¿Cuánto es 1/3 + 1/6?", options: ["1/2", "2/9", "1/9", "2/6"], correctIndex: 0 },
            { question: "¿Cuánto es 5/6 - 1/3?", options: ["1/2", "1/3", "2/3", "1/6"], correctIndex: 0 },
            { question: "¿Cuánto es 0.4 × 10?", options: ["4", "0.4", "40", "0.04"], correctIndex: 0 },
            { question: "¿Cuánto es 2/5 + 3/10?", options: ["7/10", "5/15", "1/2", "6/15"], correctIndex: 0 },

            // ===== NOCHE 3: PORCENTAJES Y RATIOS =====
            { question: "¿Cuánto es el 20% de 50?", options: ["10", "20", "30", "5"], correctIndex: 0 },
            { question: "¿Cuánto es el 25% de 80?", options: ["20", "30", "40", "15"], correctIndex: 0 },
            { question: "¿Cuánto es el 50% de 120?", options: ["60", "50", "70", "55"], correctIndex: 0 },
            { question: "Si 3 de cada 5 estudiantes aprueban, ¿cuál es el ratio?", options: ["3:5", "5:3", "3:2", "2:3"], correctIndex: 0 },
            { question: "¿Cuánto es el 10% de 200?", options: ["20", "30", "10", "40"], correctIndex: 0 },
            { question: "Si el ratio de niños a niñas es 2:3 y hay 10 niños, ¿cuántas niñas hay?", options: ["15", "20", "5", "12"], correctIndex: 0 },
            { question: "¿Cuánto es el 75% de 40?", options: ["30", "25", "35", "20"], correctIndex: 0 },
            { question: "¿Cuánto es el 5% de 100?", options: ["5", "10", "15", "20"], correctIndex: 0 },
            { question: "Si 2 de cada 4 monedas son de plata, ¿cuál es el porcentaje?", options: ["50%", "25%", "75%", "33%"], correctIndex: 0 },
            { question: "¿Cuánto es el 15% de 60?", options: ["9", "12", "15", "18"], correctIndex: 0 },

            // ===== NOCHE 4: ÁLGEBRA BÁSICA Y ECUACIONES =====
            { question: "Si x + 5 = 12, ¿cuánto es x?", options: ["7", "17", "-7", "5"], correctIndex: 0 },
            { question: "Si 2x = 16, ¿cuánto es x?", options: ["8", "18", "14", "4"], correctIndex: 0 },
            { question: "Si x - 3 = 10, ¿cuánto es x?", options: ["13", "7", "30", "3"], correctIndex: 0 },
            { question: "Si 3x + 2 = 11, ¿cuánto es x?", options: ["3", "4", "5", "6"], correctIndex: 0 },
            { question: "Si x/2 = 5, ¿cuánto es x?", options: ["10", "2.5", "7", "15"], correctIndex: 0 },
            { question: "Si 4x - 8 = 4, ¿cuánto es x?", options: ["3", "2", "4", "12"], correctIndex: 0 },
            { question: "Si x + (-3) = 5, ¿cuánto es x?", options: ["8", "2", "-8", "5"], correctIndex: 0 },
            { question: "Si 2x - 5 = 7, ¿cuánto es x?", options: ["6", "1", "12", "5"], correctIndex: 0 },
            { question: "Si x/3 + 2 = 5, ¿cuánto es x?", options: ["9", "3", "15", "6"], correctIndex: 0 },
            { question: "Si 5x = 35, ¿cuánto es x?", options: ["7", "30", "40", "5"], correctIndex: 0 },

            // ===== NOCHE 5: GEOMETRÍA Y EXPONENTES =====
            { question: "¿Cuál es el área de un cuadrado con lado 5?", options: ["25", "20", "10", "30"], correctIndex: 0 },
            { question: "¿Cuál es el perímetro de un rectángulo de 4 × 6?", options: ["20", "24", "10", "12"], correctIndex: 0 },
            { question: "¿Cuánto es 2⁴?", options: ["16", "8", "6", "32"], correctIndex: 0 },
            { question: "¿Cuánto es 3³?", options: ["27", "9", "12", "81"], correctIndex: 0 },
            { question: "¿Cuál es el área de un triángulo con base 6 y altura 4?", options: ["12", "24", "10", "20"], correctIndex: 0 },
            { question: "¿Cuánto es √16?", options: ["4", "8", "2", "16"], correctIndex: 0 },
            { question: "¿Cuánto es √25?", options: ["5", "25", "12.5", "10"], correctIndex: 0 },
            { question: "¿Cuál es el perímetro de un cuadrado con lado 7?", options: ["28", "49", "14", "21"], correctIndex: 0 },
            { question: "¿Cuánto es 10²?", options: ["100", "20", "1000", "50"], correctIndex: 0 },
            { question: "¿Cuánto es √64?", options: ["8", "32", "16", "4"], correctIndex: 0 },

            // ===== NOCHE 5 EXTRA: SISTEMAS Y GRÁFICAS =====
            { question: "¿Cuál es el valor de y en (2,y) si está en la línea y = 2x?", options: ["4", "2", "6", "8"], correctIndex: 0 },
            { question: "Si un taxi cobra \$2 por km, ¿cuánto cuesta viajar 5 km?", options: ["\$10", "\$5", "\$15", "\$7"], correctIndex: 0 },
            { question: "¿Cuánto es 5⁰?", options: ["1", "0", "5", "25"], correctIndex: 0 },
            { question: "Si x = 3, ¿cuánto es 2x + 4?", options: ["10", "8", "6", "12"], correctIndex: 0 },
            { question: "¿Cuál es el orden de las operaciones? (sin paréntesis)", options: ["Mult/Div luego Sum/Res", "Sum/Res luego Mult/Div", "Izquierda a derecha", "Mult siempre primero"], correctIndex: 0 },
        ];
    }

    generateProblem() {
        const randomIndex = Math.floor(Math.random() * this.eighthGradeProblems.length);
        return this.eighthGradeProblems[randomIndex];
    }
}
