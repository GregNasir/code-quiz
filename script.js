// Set variables and link to html
var startBtn = document.querySelector("#start");
var submitBtn =document.querySelector("#submit-btn");
var timeEl = document.querySelector("#time");
var intro = document.querySelector("#intro");
var questionsPage = document.querySelector("#questions-page");
var questionList = document.querySelector(".question-list"); 
var pickButtons = document.querySelectorAll(".options");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");
var checkSelection = document.querySelector("#check-selection");
var scoreTally = document.querySelector("#submit-page")
var scoreTotal = document.querySelector("#score-total");
var userInitials = document.querySelector("#initials");
var highScorePage = document.querySelector("#high-score-page");
var userRecord = document.querySelector("#user-record");
var scoreConfirm = document.querySelector("#high-scores");
var complete = document.querySelector("#complete");
var backBtn = document.querySelector("#back-btn");
var clearBtn=document.querySelector("#clear-btn");


// list of questions for quiz
var questionHub = [
  {
      question: "Questions 1 : Who created Javasript?",
      options: ["a. Bill Gates", "b. Al Gore", "c. Brendan Eich", "d. Isaac Newton"],
      answer: "c"
  },
  {
      question: "Questions 2 : The first index value in an array is:",
      options: ["a. 0", "b. 1", "c. NAN", "d. -1"],
      answer: "a"
  },
  {
      question: "Questions 3 : How do you render to the console?",
      options: ["a. var = ", "b. for i = 0", "c. function = myfunction()", "d. console.log()"],
      answer: "d"
  },
  {
      question: "Questions 4 : Which option saves an element to local storage?",
      options: ["a. .getItem", "b. .sort", "c. .setItem", "d. .trim"],
      answer: "c"
  },
  {
      question: "Questions 5 : Which is not a boolen?",
      options: ["a. ==", "b. 'my name + ''", "c. >", "d. !="],
      answer: "b"
  }
];


var secondsLeft = 60;
var questionNumber = 0;
var finalScore = 0;
var questionCount = 1;




//function to save and render info page and local storage

// sets timer and renders message upon completion
function clock() {

  // Sets interval in variable
  var timerInterval = setInterval(function () {
    
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      timeEl.textContent = "Time expired!";
      complete.textContent = "Time expired!";
      gameOver();
      
    } else  if(questionCount >= questionHub.length +1) {
      clearInterval(timerInterval);
      gameOver();
      } 
    
  }, 1000);
}

// start quiz and show first question after click of start quiz button
function startQuiz() {
  intro.style.display = "none";
  questionsPage.style.display = "block";
  clock();
  questionOption= 0;
  questions(questionOption);

}

// shows questions and answers on page
function questions(n) {
      questionList.textContent = questionHub[n].question;
      answerBtn1.textContent = questionHub[n].options[0];
      answerBtn2.textContent = questionHub[n].options[1];
      answerBtn3.textContent = questionHub[n].options[2];
      answerBtn4.textContent = questionHub[n].options[3];
      questionOption = n;
}

// verifies answers
function answerVeri(e) {
  e.preventDefault();
  
  checkSelection .style.display = "block";
  setTimeout(function () {
    checkSelection.style.display = 'none';
  }, 1000);

  
  if (questionHub[questionOption].answer == e.target.value) {
    checkSelection.textContent = "Correct!"; 
      finalScore = finalScore + 1;
      

  } else {
      secondsLeft = secondsLeft - 10;
      checkSelection.textContent = "Wrong! The correct answer is " + questionHub[questionOption].answer + " .";
  }
       
  if (questionOption < questionHub.length -1 ) {
  // calls questionshub to bring in next question when any reactBtn is clicked
      questions(questionOption +1);
  } else {
  gameOver();
}
questionCount++;
}

// upon completion of all question or timer is zero, displays final score
function gameOver() {

  questionsPage.style.display = "none";
  scoreTally.style.display = "block";
  console.log(scoreTally);
  // shows final score
  scoreTotal.textContent = "Your final score is :" + finalScore ;
  // clearInterval(timerInterval);  
  timeEl.style.display = "none";  
  

};

// send score and initials to local storage
function addScore (n) {
  var newScoreList = userScore();
  newScoreList.push(n);
  localStorage.setItem("ScoreList", JSON.stringify(newScoreList));
};

// saves score and initials
function saveScore () {
  var scoreNum = {
      user: userInitials.value,
      score: finalScore
  }
  addScore(scoreNum);
  showScore();
}


// collects score from local storage
function userScore () {
  var currentScore = localStorage.getItem("ScoreList");
  if (currentScore !== null ){
      newScoreList = JSON.parse(currentScore);
      return newScoreList;
  } else {
      newScoreList = [];
  }
  return newScoreList;
};

// shows score on high score page
function showScore () {
  userRecord.innerHTML = "";
  userRecord.style.display = "block";
    var highScores = compileScores();   
    // Slice the high score array to only show the top ten high scores. 
    var topTen = highScores.slice(0,10);
    for (var i = 0; i < topTen.length; i++) {
        var item = topTen[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    userRecord.appendChild(li);
    }
};

// displays high scores, starting with best
function compileScores () {
  var userScoreList = userScore();
  if (userScore == null ){
      return;
  } else {
    userScoreList.sort(function(a,b){
      return b.score - a.score;
  })
  return userScoreList;
}};



// initializes button to start quiz
startBtn.addEventListener("click", startQuiz);


pickButtons.forEach(function(click){

  click.addEventListener("click", answerVeri);
});

//save information and go to next page
submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  scoreTally.style.display = "none";
  intro.style.display = "none";
  highScorePage.style.display = "block";
  questionsPage.style.display ="none";
  saveScore();
});

// check highscore ranking list
scoreConfirm.addEventListener("click", function(e) {
  e.preventDefault();
  scoreTally.style.display = "none";
  intro.style.display = "none";
  highScorePage.style.display = "block";
  questionsPage.style.display ="none";
  showScore();
});

//takes you back to main page
backBtn.addEventListener("click",function(e){
  e.preventDefault();
  scoreTally.style.display = "none";
  intro.style.display = "block";
  highScorePage.style.display = "none";
  questionsPage.style.display ="none";
  location.reload();
});

//clears local storage and high score pages
clearBtn.addEventListener("click",function(e) {
  e.preventDefault();
  localStorage.clear();
  showScore();
});
