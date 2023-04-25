// Selects element by class
const timeEl = document.querySelector(".time");
const start = document.querySelector('#start');

// Selects element by id
const mainEl = document.getElementById("main-time");

let secondsLeft = 60;

// start.addEventListener('click', function() {
// 	// let i = 0;

//   timeEl.textContent = "Time: " + secondsLeft;



//   secondsLeft--;
	
// 	let timerId = setInterval(function() {
// 		console.log('!')
// 	}, 1000);
// });

function setTime() {
  // Sets interval in variable
  const timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      const countdown = document.getElementById("countdown").innerHTML = "Game Over!";
      return countdown;
      // Calls function to create and append image
      // sendMessage();
    }

  }, 1000);
}

function startQuiz(event) {
   event.stopPropagation();
  event.currentTarget.setAttribute(
    "button"
  );
}

// // Function to create and append colorsplosion image
// function sendMessage() {
//   timeEl.textContent = " ";
//   const imgEl = document.createElement("img");
//   imgEl.setAttribute("src", "images/image_1.jpg");
//   mainEl.appendChild(imgEl);

// }

// setTime();

start.addEventListener('click', setTime());

// button.addEventListener("click", setTime());