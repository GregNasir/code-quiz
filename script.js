// Selects element by class
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



var questionHub = [
  {
      question: "Questions 1 : String values must be enclosed within _____ when being assigned to variables.",
      options: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
      answer: "c"
  },
  {
      question: "Questions 2 : Commonly used data types DO NOT include:",
      options: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
      answer: "c"
  },
  {
      question: "Questions 3 : How do you create a function in JavaScript",
      options: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
      answer: "b"
  },
  {
      question: "Questions 4 : How do you call a function named myFunction?",
      options: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
      answer: "c"
  },
  {
      question: "Questions 5 : To see if two variables are equal in an if / else statement you would use ____.",
      options: ["a. =", "b. ==", "c. 'equals'", "d. !="],
      answer: "b"
  }
];

// var timeLeft = document.getElementById("time");

var secondsLeft = 60;
var questionNumber = 0;
var finalScore = 0;
var questionCount = 1;


// Selects element by id
// var mainEl = document.querySelectorAll("#main-time");



// start.addEventListener('click', function setTime(e) {
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


function startQuiz() {
  intro.style.display = "none";
  questionsPage.style.display = "block";
  clock();
  questionOption= 0;
  questions(questionOption);

}


function questions(n) {
      questionList.textContent = questionHub[n].question;
      answerBtn1.textContent = questionHub[n].options[0];
      answerBtn2.textContent = questionHub[n].options[1];
      answerBtn3.textContent = questionHub[n].options[2];
      answerBtn4.textContent = questionHub[n].options[3];
      questionOption = n;
}

function answerVeri(e) {
  e.preventDefault();
  //make it display
  checkSelection .style.display = "block";
  setTimeout(function () {
    checkSelection.style.display = 'none';
  }, 1000);

  // answer check
  if (questionHub[questionOption].answer == e.target.value) {
    checkSelection.textContent = "Correct!"; 
      finalScore = finalScore + 1;
      

  } else {
      secondsLeft = secondsLeft - 10;
      checkSelection.textContent = "Wrong! The correct answer is " + questionHub[questionOption].answer + " .";
  }
       //THEN I am presented with another question
  if (questionOption < questionHub.length -1 ) {
  // call questionshub to bring in next question when any reactBtn is clicked
      questions(questionOption +1);
  } else {
  gameOver();
}
questionCount++;
}

function gameOver() {

  questionsPage.style.display = "none";
  scoreTally.style.display = "block";
  console.log(scoreTally);
  // show final score
  scoreTotal.textContent = "Your final score is :" + finalScore ;
  // clearInterval(timerInterval);  
  timeEl.style.display = "none";  
  // timeEl = document.getElementById("timeEl").style.visibility = "hidden";

};

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

function showScore () {
  userRecord.innerHTML = "";
  userRecord.style.display ="block";
    var highScores = compileScores();   
    // Slice the high score array to only show the top five high scores. 
    var topTen = highScores.slice(0,10);
    for (var i = 0; i < topTen.length; i++) {
        var item = topTen[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

// sort score and ranking the highscore list
function compileScores () {
  var userScoreList = userScore();
  if (userScore == null ){
      return;
  } else{
    userScoreList.sort(function(a,b){
      return b.score - a.score;
  })
  return userScoreList;
}};

// push new score and initial to the local storage
function addScore (n) {
  var newScoreList = userScore();
  newScoreList.push(n);
  localStorage.setItem("ScoreList", JSON.stringify(newScoreList));
};

function saveScore () {
  var scoreNum = {
      user: userInitials.value,
      score: finalScore
  }
  addScore(scoreNum);
  showScore();
}



startBtn.addEventListener("click", startQuiz);

//click any choices button, go to the next question
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

//go back to main page
backBtn.addEventListener("click",function(e){
  e.preventDefault();
  scoreTally.style.display = "none";
  intro.style.display = "block";
  highScorePage.style.display = "none";
  questionsPage.style.display ="none";
  location.reload();
});

//clear local storage and clear page shows
clearBtn.addEventListener("click",function(e) {
  e.preventDefault();
  localStorage.clear();
  showScore();
});


// // Function to create and append colorsplosion image
// function sendMessage() {
//   timeEl.textContent = " ";
//   const imgEl = document.createElement("img");
//   imgEl.setAttribute("src", "images/image_1.jpg");
//   mainEl.appendChild(imgEl);

// }

// setTime();



// button.addEventListener("click", setTime());