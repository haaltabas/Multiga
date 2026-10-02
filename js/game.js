function generateOptions(correctAnswer) {

    const options = [correctAnswer];
    while (options.length < 4) {
        const wrong =
            correctAnswer + Math.floor(Math.random() * 11) - 5;
        if (
            wrong > 0 &&
            !options.includes(wrong)
        ) {
            options.push(wrong);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}


function checkAnswer(selectedAnswer) {

    const correct =
        questions[currentQuestion].answer;

    if(selectedAnswer === correct){

		score++;
		showPositiveMessage();
	}else{	
		showTryAgainMessage();
	}

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        finishQuiz();
    } else {
        displayQuestion();
    }
}

function updateTimerDisplay(){
    const el = document.getElementById("timer");

    if(!currentLevel.maxSeconds){
        el.innerHTML = "";
        return;
    }
    el.innerHTML =`⏰ ${timeLeft}s`;
}

function checkAchievements() {

   if(
      player.unlockedLevel >= 5 &&
      !player.achievements.includes("Explorer")
   ){
      player.achievements.push("Explorer");
   }

	const perfectScore = LEVELS.some(level =>
		player.scores[level.id] === level.questionCount
	);
	
   if(perfectScore &&
      !player.achievements.includes("Perfect Score")
   ){
      player.achievements.push("Perfect Score");
   }

   saveGame();
}

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 90,
        origin: {
            y: 0.6
        }
    });
}

function generateQuestions(level) {

    const questions = [];
	
    
    if (level.questionOrder === "sequential") {
        level.tables.forEach(table => {
            for (let i = 1; i <= 10; i++) {
                questions.push({
                    a: table,
                    b: i,
                    answer: table * i
                });
            }
        });
    } else {
        while ( questions.length < level.questionCount ) {
            const table =
                level.tables[
                    Math.floor(
                        Math.random() *
                        level.tables.length
                    )
                ];
            const multiplier =
                1 + Math.floor(Math.random() * 10);
            questions.push({
                a: table,
                b: multiplier,
                answer: table * multiplier
            });
        }
    }

    return questions.slice(
        0,
        level.questionCount
    );
}

function startTimer(seconds){

    timeLeft = seconds;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            finishQuiz();
        }
    },1000);
}

function finishQuiz() {

    // Stop timer if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    showResults();
}

function calculateStars(score, level) {

    if(score === level.questionCount) return 3;
    if(score >= level.questionCount * 0.9) return 2;
    if(score >= level.passingScore) return 1;
    return 0;
}