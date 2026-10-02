const menuScreen = document.getElementById("menu-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const tableButtons = document.getElementById("table-buttons");
const quizTitle = document.getElementById("quiz-title");
const questionLabel = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const progressLabel = document.getElementById("progress");
const scoreText = document.getElementById("score-text");

let last_level = 10;
let currentTable = 1;
let currentQuestion = 0;
let score = 0;
let questions = [];

let timeLeft;
let timerInterval;

initializeKeypad();

let player = JSON.parse(
  localStorage.getItem("kingdomSave")
) || {
  unlockedLevel: 1,
  totalStars: 0,
  scores: {},
  achievements: []
};


function saveGame() {
  localStorage.setItem(
    "kingdomSave",
    JSON.stringify(player)
  );
}



function renderMap() {

    const map =
        document.getElementById("adventure-map");

    map.innerHTML = "";

    const visibleLevels = LEVELS.filter(level =>
		level.id <= player.unlockedLevel + 1
	);

	[...visibleLevels]
		.reverse()
		.forEach((level, index) => {

            const node =
                document.createElement("button");

            const side =
                index % 2 === 0
                    ? "left"
                    : "right";

            const score = player.scores[level.id] || 0;

            let stars = "";
			
			let stars_num = calculateStars(score, level);
			
			if(stars == 1) stars = "⭐";
            if(stars == 2) stars = "⭐⭐";
            if(stars == 3) stars = "⭐⭐⭐";
			
			/*
            if(score >= level.passingScore) stars = "⭐";
            if(score >= level.questionCount-(level.questionCount/10)) stars = "⭐⭐";
            if(score === level.questionCount) stars = "⭐⭐⭐";
			*/

            node.classList.add(
                "level-node",
                side
            );

            if(level.id > player.unlockedLevel){

                node.classList.add(
                    "level-locked"
                );
                node.textContent = "🔒";
                node.disabled = true;

            } else {

                if(score >= level.passingScore){
                    node.classList.add(
                        "level-completed"
                    );
                } else {
                    node.classList.add(
                        "level-current"
                    );
					if (level.id === player.unlockedLevel) {
						node.id = "current-level";
					}
                }
                node.innerHTML =
                    `
                    <div>
                        ${level.name}
                        <br>
                        ${stars}
                    </div>
                    `;
                node.onclick =
                    () => startQuiz(level.id);
            }
            map.appendChild(node);
        });
		
	const currentLevel =
    document.getElementById("current-level");

	if (currentLevel) {
		currentLevel.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}
	
	drawRoad();
}



renderMap();



function startQuiz(levelId) {

	currentLevel = LEVELS.find(l => l.id === levelId);

	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null;
		document.getElementById("timer").innerHTML = "";
	}
	
	const timerElement = document.getElementById("timer"); 
	if(currentLevel.maxSeconds){	 
		timerElement.classList.remove("hidden");	 
		startTimer(currentLevel.maxSeconds);
	} else {	 
		timerElement.classList.add("hidden");	 
		timerElement.innerHTML = "";
	}
	
	currentQuestion = 0;
	score = 0;

	questions = [];


	questions = generateQuestions(currentLevel)

	menuScreen.classList.add("hidden");
	resultScreen.classList.add("hidden");
	quizScreen.classList.remove("hidden");
	
	document.getElementById("answers").classList.add("hidden");
	document.getElementById("numeric-container").classList.add("hidden");
	document.getElementById("quiz-title").textContent = currentLevel.name;
	document.getElementById("story").textContent = currentLevel.story;

	displayQuestion();
}


function displayQuestion() {

    const q = questions[currentQuestion];
	
    progressLabel.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
    questionLabel.textContent = `${q.a} × ${q.b} = ?`;
	
	if ( currentLevel.quizType === "multiple-choice") { 
		renderMultipleChoice();
	} else { 
		renderNumericKeypad();
	}
}


function renderMultipleChoice() {

    const q = questions[currentQuestion];
	
    document
        .getElementById("answers")
        .classList.remove("hidden");

    document
        .getElementById("numeric-container")
        .classList.add("hidden");

    const options = generateOptions(q.answer);

    answersContainer.innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        answersContainer.appendChild(button);
    });

}



function showResults() {
  
  
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden"); 
  
  let starsEarned = calculateStars(score, currentLevel);
  
/*
  if(score >= currentLevel.passingScore) starsEarned = 1;
  if(score >= currentLevel.questionCount-(currentLevel.questionCount/10)) starsEarned = 2;
  if(score === currentLevel.questionCount) starsEarned = 3;
*/

  const previousBest =
    player.scores[currentLevel.id] || 0;

  player.scores[currentLevel.id] =
    Math.max(previousBest,score);

  if(
    score >= currentLevel.passingScore &&
    currentLevel.id === player.unlockedLevel &&
    currentLevel.id < last_level
  ){
    player.unlockedLevel++;
  }

  saveGame();

  let starsText = "";

  for(let i=0;i<starsEarned;i++){
      starsText += "⭐";
  }
	  
  if (starsEarned >= 1) {	
	if (starsEarned === 3) {
		const duration = 3000;
		if (hasAllStars()) { duration = 6000; }
		const end = Date.now() + duration;
		const interval = setInterval(() => {
			confetti({
				particleCount: 20,
				spread: 120,
				startVelocity: 30,
				origin: {
					x: Math.random(),
					y: Math.random() * 0.5
				}
			});
			if (Date.now() > end) {
				clearInterval(interval);
			}
		}, 200);
	} else {
		launchConfetti();		
	}
  }
  
  scoreText.innerHTML =
    `
    ${starsText}
    <br><br>
    Punts: ${score}/${currentLevel.questionCount}
    `;
		
	if (
		  player.unlockedLevel === last_level &&
		  (player.scores[last_level] || 0) >= level.passingScore
		){
			if (hasAllStars()) { 
				showPerfectEnding(); 
				
			} else {
			  document.body.innerHTML = `
				  <div class="victory">
					  <h1>🏰 Aventura finalitzada!!</h1>
					  <h2>👑 Super joc de multiplicació</h2>
					  <p>
						Ara aconsegueix totes les estrelles per assegura-te el súper regal!!
					  </p>

				  </div>
			  `;
			}
		}
	{
	}
}

function showPerfectEnding() {

    document.body.innerHTML = `
        <div class="victory perfect-victory">

            <h1>👑🏆 Aventura de multiplicar 🏆👑</h1>

            <h2>🌟 HAS ACONSEGUIT TOTES LES ESTRELLES! 🌟</h2>

            <p>
                Has superat tots els nivells amb
                puntuació perfecta!
            </p>

            <p>
                🎉 SUPER REGAL DESBLOQUEJAT 🎉
            </p>
			<img src=assets/images/pokopia.png></img>
        </div>
    `;

}

function hasAllStars() {

    return LEVELS.every(level => {
        return player.scores[level.id] === level.questionCount;
    });

}

function renderAchievements(){

   document.getElementById(
      "achievements"
   ).innerHTML = player.achievements
      .map(a => `🏆 ${a}`)
      .join("<br>");

}

function goHome() {
	
	renderMap();
    resultScreen.classList.add("hidden");
    menuScreen.classList.remove("hidden");
}


function goBackToMap() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    menuScreen.classList.remove("hidden");
    renderMap();
}

function renderNumericKeypad() {
    document
        .getElementById("answers")
        .classList.add("hidden");

    document
        .getElementById("numeric-container")
        .classList.remove("hidden");

    document
        .getElementById("answer-input")
        .value = "";
}

function initializeKeypad() {

    document
        .querySelectorAll(".keypad-btn")
        .forEach(button => {
            button.addEventListener("click", handleKeypadClick);

        });
		
	document.addEventListener("keydown", e => {
		if( currentLevel?.quizType === "numeric-keypad" && e.key === "Enter" ){ submitNumericAnswer(); }
	});

}

function handleKeypadClick(event) {
    const key = event.target.textContent;
    const input = document.getElementById("answer-input" );

    if (key === "✅") {
        submitNumericAnswer();
        return;
    }

    if (key === "⌫") {
        input.value = input.value.slice(0, -1);
        return;
    }

    input.value += key;
}

function submitNumericAnswer() {

    const input = document.getElementById("answer-input");
    const answer = parseInt(input.value);

	if(input.value === "") {
		return;
	}
	
    const correct = questions[currentQuestion].answer;

    if (answer === correct) {
        score++;
        showPositiveMessage();
    } else {
        showTryAgainMessage();
    }

	setTimeout(() => {
		currentQuestion++;
		if(currentQuestion >= questions.length){
			finishQuiz();
		} else {
			displayQuestion();
		}
	}, 1000);

}


function showPositiveMessage() {

    const message = GOOD_MESSAGES[Math.floor(Math.random() * GOOD_MESSAGES.length) ];
    showToast(message, "success");
	
}

function showTryAgainMessage() {

    const message = TRY_AGAIN_MESSAGES[Math.floor(Math.random() * TRY_AGAIN_MESSAGES.length) ];
    showToast(message, "fail");
	
}

function showToast(message, type = "success") {

    const container = document.getElementById("toast-container" );
    const toast = document.createElement("div");

    toast.classList.add("toast", type === "success" ? "toast-success" : "toast-fail");
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2000);
}

function drawRoad() {
   
}
