class MathProblemManager {
    constructor() {
        this.ibProblems = [
            // Noche 1 - Básico
            { question: "¿Cuánto es 15 + 27?", options: ["40", "42", "44", "45"], correctIndex: 1 },
            { question: "¿Cuánto es 50 - 18?", options: ["30", "32", "34", "36"], correctIndex: 1 },
            { question: "¿Cuánto es 6 × 8?", options: ["46", "48", "50", "52"], correctIndex: 1 },
            { question: "¿Cuánto es 72 ÷ 8?", options: ["8", "9", "10", "11"], correctIndex: 1 },
            { question: "¿Cuánto es 25 + 35?", options: ["55", "58", "60", "65"], correctIndex: 2 },
            
            // Noche 2 - Moderado
            { question: "¿Cuánto es 12²?", options: ["132", "144", "156", "168"], correctIndex: 1 },
            { question: "¿Cuánto es √196?", options: ["12", "13", "14", "15"], correctIndex: 2 },
            { question: "Si 2x + 5 = 15, ¿cuánto es x?", options: ["4", "5", "6", "7"], correctIndex: 1 },
            { question: "¿Cuánto es (3 × 4) + 12?", options: ["22", "23", "24", "25"], correctIndex: 2 },
            { question: "¿Cuánto es el 30% de 150?", options: ["40", "43", "45", "48"], correctIndex: 2 },

            // Noche 3 - Avanzado
            { question: "Si f(x) = 2x + 3, ¿cuánto es f(5)?", options: ["11", "12", "13", "14"], correctIndex: 2 },
            { question: "Área triángulo: base=10, altura=8?", options: ["38", "40", "50", "60"], correctIndex: 1 },
            { question: "¿Cuánto es 2³ + 3²?", options: ["15", "17", "18", "20"], correctIndex: 2 },
            { question: "Si 3x - 7 = 20, ¿cuánto es x?", options: ["8", "9", "10", "11"], correctIndex: 1 },
            { question: "Perímetro rectángulo (12 × 8)?", options: ["38", "39", "40", "42"], correctIndex: 2 },

            // Noche 4 - Muy Difícil
            { question: "¿Cuánto es (8 × 5) - (12 ÷ 3)?", options: ["36", "38", "40", "42"], correctIndex: 2 },
            { question: "Si x² = 49, ¿cuánto es x?", options: ["6", "7", "8", "9"], correctIndex: 1 },
            { question: "Área círculo (r=5, π≈3.14)?", options: ["75", "78", "78.5", "80"], correctIndex: 2 },
            { question: "Si 5x + 10 = 40, ¿cuánto es x?", options: ["5", "6", "7", "8"], correctIndex: 1 },
            { question: "¿Cuánto es (10 + 15) × 2?", options: ["48", "49", "50", "52"], correctIndex: 2 },

            // Noche 5 - Imposible
            { question: "¿Cuánto es √(144/4)?", options: ["5", "6", "8", "7"], correctIndex: 1 },
            { question: "Si log₂(x) = 3, ¿cuánto es x?", options: ["6", "7", "8", "9"], correctIndex: 2 },
            { question: "Derivada de f(x) = 3x²?", options: ["3x", "6x", "9x", "12x"], correctIndex: 1 },
            { question: "Si sen(θ) = 0.5, ¿θ en grados?", options: ["20°", "30°", "40°", "50°"], correctIndex: 1 },
            { question: "¿Cuánto es e^(ln(5))?", options: ["3", "4", "5", "6"], correctIndex: 2 },
        ];
    }

    generateProblem() {
        const randomIndex = Math.floor(Math.random() * this.ibProblems.length);
        return this.ibProblems[randomIndex];
    }
}
