// Variable for quiz container

var quizArea = document.querySelector(".container");

// Variable for highscores button

var highscoresBtn = document.querySelector(".hsBtn");

// Variable for Take Quiz button

var takeQuizBtn = document.querySelector(".takeQuizBtn");

// Variable for Timer space

var timerArea = document.querySelector(".timer");

// Variable for starting time

var quizTimer = 70;

// Area where timer will appear

timerArea.textContent = quizTimer;

// Variable for Player Score

var playerScore = 0;

// Variable for High Score Input container

var scoreInput = document.querySelector(".submitScoreInput");

// Variable for High Score Table

var highScoreTable = document.querySelector(".highScoreTable");

// Variable for High Score container heading

var scoreHeader = document.querySelector(".postQuizMessage");

// Variable for initials ask heading

var initialsAsk = document.querySelector(".askForInitials");

// Variable for Initials window

var initialsInput = document.querySelector("#initials");


// Variable for area where question text goes ".question"

var questionSpot = document.querySelector("#question");

// Variables for choices buttons

var choiceBtns = document.querySelector("#answer-container");

// Variable for each choice button

var answerBtn = document.querySelector(".choice");

// Variable for Start button

var startBtn = document.querySelector(".playButton");

// Variable for Submit button

var submitBtn = document.querySelector("#submit");

// Variable for getting high scores from local storage

const highScores = JSON.parse(localStorage.getItem("highScores"))  || [];



 



// Variable for questions


var questions = [{question: "What is NOT one of the three building blocks of a webpage?",

                answers: ["HTML", "CSS", "Javascript", "Python"],

                correct: 3

                },

                { question: "Which would be an appropriate type of data to store in local storage?",
                
                  answers: ["Credit Card #", "High Scores", "Passwords", "Social Security #"],

                  correct: 1
                },

                { question: "In coding, 'for', 'while', and 'do-while' are all types of...",
                
                  answers: ["Loops", "Curves", "Chutes", "Ladders"],

                  correct: 0 
                },

                { question: "For loops tend to have ____ parameters.",
                
                  answers: ["1", "2", "3", "4"],

                  correct: 2 
                },



];

// Variable for index on question array

var questionIndex = 0;

// Function that begins quiz

function startQuiz() {
    highscoresBtn.disabled = true;
    startBtn.setAttribute("class", "hide");
    questionSpot.classList.remove("hide");
    choiceBtns.classList.remove("hide");
    
    startTimer();
    showQuestion();
    
}

// Function that starts timer

function startTimer() {
  var timerInterval = setInterval(function() {
    quizTimer--;
    timerArea.textContent = quizTimer;

    

    if(quizTimer === 0) {
      
      clearInterval(timerInterval);
      
      submitScore();
    }

    if(questionIndex === 4) {
      clearTimeout(timerInterval);
    }
    

  }, 1000);
}

// Function that shows each question

function showQuestion() {

        questionSpot.textContent = questions[questionIndex].question;
        showAnswers();      
        
        
}


// Function that creates each answer button

function showAnswers() {
  choiceBtns.textContent = "";
  for (var i = 0; i < questions[questionIndex].answers.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = questions[questionIndex].answers[i];
    choiceBtn.classList.add("choice");
    choiceBtn.id=i;
    choiceBtns.appendChild(choiceBtn);
    choiceBtn.setAttribute("onclick", "check(this)");   
    
    
    

  }

}

// Function that checks if selection is correct

function check(option) {
  const id=option.id;
 
  if(id==questions[questionIndex].correct){

    option.setAttribute("class", "correct");
    playerScore = playerScore + 5;

  } else {

    option.setAttribute("class", "wrong");
    playerScore = playerScore - 5;
    quizTimer = quizTimer -5;
    
  }
  
 

  killOtherButtons();
  
    
  waitBeforeNextQuestion();
   
}


// Function that waits so quiz taker can tell if they got question correct

function waitBeforeNextQuestion() {
  setTimeout(function nextQuestion() {
  
    questionIndex++;
    if (questionIndex === 4) {
      submitScore();
    } else {

      showQuestion();
    }
    
  
  
  }, 1000);
}

// Function that disables all other answer buttons

function killOtherButtons() {
  for (var i = 0; i < choiceBtns.children.length; i++) {
    choiceBtns.children[i].removeAttribute("onclick");

  }

}

// Function that shows the submit high score window

function submitScore() {
  playerScore = playerScore + quizTimer; 
  
  highscoresBtn.disabled = false;
  quizArea.classList.add("hide");
  timerArea.classList.add("hide");
  scoreInput.classList.remove("hide");
  
  scoreHeader.innerHTML = "Congratulations!  Your score is " + playerScore + "!";
  initialsAsk.innerHTML = "Enter your initials below to enter the high scores table!";
}



// Function that is activated by quiz button on high scores page

function goBackToStart() {
  var quizTimer = 70;
  highscoresBtn.classList.remove("hide");
  takeQuizBtn.classList.add("hide");
  scoreInput.classList.add("hide");
  timerArea.classList.remove("hide");
  quizArea.classList.remove("hide");
  startBtn.classList.remove("hide");
  startBtn.classList.add("playButton");
  highScoreTable.classList.add("hide");
  questionSpot.classList.add("hide");
  choiceBtns.classList.add("hide");
}

// Start Button

startBtn.addEventListener("click", startQuiz);

// Go to High Scores Page Button

highscoresBtn.addEventListener("click", renderHighScoresPage);

// Go back to Quiz Button

takeQuizBtn.addEventListener("click", goBackToStart);

// Submit button and function it powers to save initials and score to local storage

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var finalScore = playerScore;
  var initialsPlayer = initialsInput.value;

  

  const score = {
    score: finalScore,
    name: initialsPlayer

  };

  highScores.push(score);

  highScores.sort((a,b) => b.score - a.score);

  

  highScores.splice(10);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  console.log(highScores);
  
  
  renderHighScoresPage();

})

// Function to render High Scores Page and load scores from local storage

function renderHighScoresPage() {
  highscoresBtn.classList.add("hide");
  takeQuizBtn.classList.remove("hide");
  quizArea.classList.add("hide");
  scoreInput.classList.add("hide");
  timerArea.classList.add("hide");
  highScoreTable.classList.remove("hide");
 
  var highScoresList = document.querySelector(".listOfScores");
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScoresList.innerHTML = "";
    
  for (i = 0; i < highScores.length; i++) {
      const listItem = document.createElement('li');
      listItem.textContent = highScores[i].name + " " + highScores[i].score;
      listItem.classList.add('high-score');
      highScoresList.appendChild(listItem);

  }
    


   


  
}
