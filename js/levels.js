


const LEVELS = [
  {
    id: 1,
    name: "🌱 Primera taula",
    tables: [1],
    story: "Hola aventurera Jana!",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 2,
    name: "🌲 Tens tens?",
    tables: [10],
    story: "Això serà una aventura increible!",
	quizType: "numeric-keypad",
	questionOrder: "random",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 3,
    name: "🌊 Doble o res",
    tables: [2],
    story: "La taula del 2 rima amb la Switch 2",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 4,
    name: "⛰️ Tres coses",
    tables: [3],
    story: "Podràs arribar al final de la aventura?",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 5,
    name: "🦅 Primera prova!",
    tables: [2,3,4],
    story: "Aqui comença a ser una mica més dificil, anims!",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 20,
	passingScore: 16,
	maxSeconds: null
  },
  {
    id: 6,
    name: "🏜️ Temps de multiplicar",
    tables: [2,3,4],
    story: "Compte! Si s'acaba el temps s'acaba! :(",
	quizType: "numeric-keypad",
	questionOrder: "random",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: 180
  },
  {
    id: 7,
    name: "❄️ High five",
    tables: [5],
    story: "Al final de l'aventura hi ha un regal molt guay!",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 8,
    name: "🌋 four fiveeeeee",
    tables: [4,5],
    story: "Si tens tres estrelles en tot tindràs un super regal!",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: 100
  },
  {
    id: 9,
    name: "🐉 El drac del sis",
    tables: [6],
    story: "Molt bé! Ja portem la meitat del cami :)",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 10,
    name: "🏰 El Castell final?",
    tables: [4,5,6],
    story: "Demostra el que saps!",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 20,
	passingScore: 16,
	maxSeconds: null
  },
  {
    id: 11,
    name: "🏰 Ara si el castell final?",
    tables: [4,5,6],
    story: "Saps que papa segurament es comprarà una switch 2???",
	quizType: "numeric-keypad",
	questionOrder: "random",
	questionCount: 20,
	passingScore: 16,
	maxSeconds: 120
  },
  {
    id: 12,
    name: "🌱 Tens molta set de set?",
    tables: [7],
    story: "Papa et deixarà jugar a la switch 2, però no te cap joc per a tu :(",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 13,
    name: "🌲 Ja se el set",
    tables: [7],
    story: "T'agradia tenir algun joc de la switch 2 de regal d'aniversari???",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 14,
    name: "🌊 six seveeeen",
    tables: [6,7],
    story: "Ja et queda molt poc! :D",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 20,
	passingScore: 16,
	maxSeconds: null
  },
  {
    id: 15,
    name: "🦅 Infinits vuits!",
    tables: [8],
    story: "Si et pases tot amb 3 estrelles...",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 16,
    name: "🏜️ vuit o ple?",
    tables: [8],
    story: "Si et pases tot amb 3 estrelles... algu et reglararà un joc de switch 2?",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 17,
    name: "❄️ 7 per 8???",
    tables: [7,8],
    story: "Ja falta molt poc!",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 20,
	passingScore: 16,
	maxSeconds: null
  },
  {
    id: 18,
    name: "🌋 Aquest és nou",
    tables: [9],
    story: "Molt bona feina Jana, ja queda menys pel regal!",
	quizType: "multiple-choice",
	questionOrder: "sequential",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 19,
    name: "🐉 res de nou",
    tables: [9],
    story: "Podràs aconseguir tres estrelles en cada prova?",
	quizType: "multiple-choice",
	questionOrder: "random",
	questionCount: 10,
	passingScore: 8,
	maxSeconds: null
  },
  {
    id: 20,
    name: "🏰 La ultima prova!",
    tables: [7,8,9],
    story: "Espectacular Jana, aquest és l'ultim, molts ánims! :D",
	quizType: "numeric-keypad",
	questionOrder: "random",
	questionCount: 20,
	passingScore: 16,
	maxSeconds: 100
  }
];

const GOOD_MESSAGES = [
  "🎉 Increible!",
  "⭐ Ben fet!",
  "🚀 Fantastic!",
  "🦄 Genial!",
  "🥳 Excelent!"
];


const TRY_AGAIN_MESSAGES = [
  "💪 Ufff!",
  "😊 Prova un altre cop!",
  "🌟 Ho pots fer millor!",
  "❤️ La proxima segur que sí!"
];

