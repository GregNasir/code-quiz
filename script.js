// Selects element by class
var startBtn = document.querySelector("#start");
var timeEl = document.querySelector(".time");
var intro = document.querySelector("#intro");



var questionsPage = document.querySelector("#questions-page");
var questionList = document.querySelector(".question-list"); 

var pickButtons = document.querySelectorAll(".options");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var rightWrong = document.querySelector("#right-wrong");

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

var questionNumber = 0;


// Selects element by id
const mainEl = document.getElementById("main-time");

let secondsLeft = 60;


// start.addEventListener('click', function setTime(e) {
function clock() {
  

  // Sets interval in variable
  const timerInterval = setInterval(function () {
    
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      const clock = document.getElementById("clock").innerHTML = "Game Over!";
      return gameOver();
      
    }
    
  }, 1000);
}


function startQuiz() {
  intro.style.display = "none";
  questionsPage.style.display = "block";
  clock();
  questionNumber = 0;
  questions(questionNumber);

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
  rightWrong.style.display = "block";
  setTimeout(function () {
      rightWrong.style.display = 'none';
  }, 1000);

  // answer check
  if (questionHub[questionNumber].answer == e.target.value) {
      rightWrong.textContent = "Correct!"; 
      totalScore = totalScore + 1;

  } else {
      secondsLeft = secondsLeft - 10;
      rightWrong.textContent = "Wrong! The correct answer is " + questionHub[questionNumber].answer + " .";
  }
       //THEN I am presented with another question
  if (questionNumber < questionHub.length -1 ) {
  // call questionshub to bring in next question when any reactBtn is clicked
      questions(questionNumber +1);
  } else {
  gameOver();
}
questionCount++;
}





function gameOver() {
  return gameOver();
}


startBtn.addEventListener("click", startQuiz);

//click any choices button, go to the next question
pickButtons.forEach(function(click){

  click.addEventListener("click", answerVeri);
});

//save information and go to next page
submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  scoreBoard.style.display = "none";
  intro.style.display = "none";
  highScorePage.style.display = "block";
  questionsPage.style.display ="none";
  saveScore();
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