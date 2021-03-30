var isGameRunning;

//quiz array
var codingQuiz = [{
  question: "Which of the following is an advantage of using JavaScript?",
  choice1: "Less server interaction",
  choice2: "Immediate feedback to the visitors",
  choice3: "Increased interactivity",
  choice4: "All of the above",
  answer: "All of the above"
},{
  question: "Which of the following type of variable is visible only within a function where it is defined?",
  choice1: "Global variable",
  choice2: "Local variable",
  choice3: "Both of the above",
  choice4: "None of the above",
  answer: "Local variable"
},{
  question: "Which built-in method returns the calling string value converted to upper case?",
  choice1: "toUpperCase()",
  choice2: "toUpper()",
  choice3: "changeCase(case)",
  choice4: "None of the above",
  answer: "toUpperCase()"
},{
  question: "Which of the following function of String object combines the text of two strings and returns a new string?",
  choice1: "add()",
  choice2: "merge()",
  choice3: "concat()",
  choice4: "append()",
  answer: "concat()"
},{
  question: "Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
  choice1: "anchor()",
  choice2: "big()",
  choice3: "blink()",
  choice4: "italics()",
  answer: "big()"
},{
  question: "Which of the following function of String object causes a string to be displayed in fixed-pitch font as if it were in a <tt> tag?",
  choice1: "fixed()",
  choice2: "big()",
  choice3: "blink()",
  choice4: "bold()",
  answer: "fixed()"
}]

//useful global variables
var ranNum = Math.floor(Math.random()*25); //between 0 and 25
var thisQuiz = codingQuiz;
var timeLeft;
var score = 0;

//current quiz items
var choicesUl;
var li1;
var li2;
var li3;
var li4;
var currentQuestion;
var scoreH3;
var final;
var qResult;
var result;   //object that returns 'right' 'wrong' message to user

//parts of the page
var timerH3 = document.getElementById("timer");
var introDiv = document.getElementById("intro");
var quizDiv = document.getElementById("quiz");
var finalScoreDiv = document.getElementById("finalScore");
var leaderBoardDiv = document.getElementById("leaderBoard");
// var scoreDiv = document.getElementById("score");
var headDiv = document.getElementById("headContainer");

//buttons
var viewScoresButton = document.getElementById("viewScores");
var startButton = document.getElementById("start");

//game part visibility
introDiv.style.display = "block"
headDiv.style.display = "block"
quizDiv.style.display = "none"
finalScoreDiv.style.display = "none"
leaderBoardDiv.style.display = "none"
//scoreDiv.style.display = "none"


//start button listener
startButton.addEventListener("click", function() {
  startQuiz();
  startTimer();
  introDiv.style.display = "none";
  quizDiv.style.display = "block";
  //timerH3.style.display = "block";
})

//begins quiz functions contains event listeners for choices buttons
function startQuiz() {
  

  while (timeLeft > 0 && thisQuiz.length > 0) {
  makeQuestion();
  document.getElementById("logo").style.display = "none";
  isGameRunning = true;
  //scoreDiv.style.display = "none"; //feature to count right anwers not turned on
  //scoreDiv.textContent = score;


  //game responsiveness
  li1.addEventListener("click", function(){
    if (thisQuiz[currentQuestion].choice1 === thisQuiz[currentQuestion].answer) {
      rightAns();    
    } else {
      wrongAns(); 
    }  })
  li2.addEventListener("click", function(){
    if (thisQuiz[currentQuestion].choice2 === thisQuiz[currentQuestion].answer) {
      rightAns();    
    } else {
      wrongAns(); 
    }  })
  li3.addEventListener("click", function(){
    if (thisQuiz[currentQuestion].choice3 === thisQuiz[currentQuestion].answer) {
      rightAns();    
    } else {
      wrongAns(); 
    }  })
  li4.addEventListener("click", function(){
    if (thisQuiz[currentQuestion].choice4 === thisQuiz[currentQuestion].answer) {
      rightAns();    
    } else {
      wrongAns(); 
    }  
  })
  }
  finalScore();
}


//picks random question and sends it to page
function makeQuestion() {
  
  //picks random question
  currentQuestion = Math.floor(Math.random()*thisQuiz.length);
  
  //creates and appends question
  var questionH2 = document.createElement("h2");
  questionH2.textContent = thisQuiz[currentQuestion].question;
  quizDiv.appendChild(questionH2);
  
  //creates and appends choices
  choicesUl = document.createElement("ul");
  li1 = document.createElement("li");
  li2 = document.createElement("li");
  li3 = document.createElement("li");
  li4 = document.createElement("li");
  li1.textContent = thisQuiz[currentQuestion].choice1;
  li2.textContent = thisQuiz[currentQuestion].choice2;
  li3.textContent = thisQuiz[currentQuestion].choice3;
  li4.textContent = thisQuiz[currentQuestion].choice4;
  quizDiv.appendChild(choicesUl);
  choicesUl.appendChild(li1);
  choicesUl.appendChild(li2);
  choicesUl.appendChild(li3);
  choicesUl.appendChild(li4);

  //creates and displays result message after each answer
  result = document.createElement("h3");
  result.textContent = qResult;
  quizDiv.appendChild(result);
  setTimeout(function(){
    result.style.opacity = "0";
  }, 700);
}

//if answer is right
function rightAns(){
  
  //take question out of array
  thisQuiz.splice(currentQuestion, 1);
  
  //set result variable as string 'correct'
  qResult = "Correct!";

  //remove question from page
   let element = document.getElementById("quiz");
   while (element.firstChild) {
    element.removeChild(element.firstChild);
   }
  
  //ask new question
  startQuiz();
}

//if answer is wrong
function wrongAns(){

  //take question out of array
  thisQuiz.splice(currentQuestion, 1);

  //set result variable as string '-5'
  qResult = "-5";
  
  if (timeLeft > 5) {
    timeLeft = timeLeft-5;
  } else {
    timeLeft = 0;
  }

  //remove question from page
  let element = document.getElementById("quiz");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  //ask new question
  startQuiz();
}

//timer function
function startTimer() {
  

  //sets the start time of the clock and displays the clock
  timeLeft = thisQuiz.length*5;  
  var timerH2 = document.createElement("h2");
  timerH2.innerHTML = timeLeft + "<span>Seconds remaining</span>";
  headDiv.appendChild(timerH2);
  

  //starts the timer----------------------------------------
  var timer = setInterval(function () {
        timerH2.innerHTML = timeLeft + "<span>Seconds remaining</span>";
        timeLeft--;

      if (isGameRunning == false) {
        clearInterval(timer);
        quizDiv.style.display = "none";
        timerH2.innerHTML = "<h4>Game Over!</h4>";
        if (isGameRunning = true) {
          //finalScore();
          ifGameRunning = false;
        };

      } else if(timeLeft < 0){
        clearInterval(timer);
        timeLeft = 0;
        quizDiv.style.display = "none";
        timerH2.innerHTML = "<h4>Game Over!</h4>";
        if (isGameRunning = true) {
          //finalScore();
          ifGameRunning = false;
        };
      }
    }, 1000); //sets speed of timer in ms
  //--------------------------------------------------------

}



//final score
function finalScore() {
  finalScoreDiv.style.display = "block";
  final = document.createElement("h3");
    final.textContent = timeLeft;
    finalScoreDiv.appendChild(final);

//add initial box

}

//leader board function
function leaderBoard() {
  //creates and appends choices
  choicesUl = document.createElement("ul");
  li1 = document.createElement("li");
  li2 = document.createElement("li");
  li3 = document.createElement("li");
  li4 = document.createElement("li");
  li1.textContent = thisQuiz[currentQuestion].choice1;
  li2.textContent = thisQuiz[currentQuestion].choice2;
  li3.textContent = thisQuiz[currentQuestion].choice3;
  li4.textContent = thisQuiz[currentQuestion].choice4;
  quizDiv.appendChild(choicesUl);
  choicesUl.appendChild(li1);
  choicesUl.appendChild(li2);
  choicesUl.appendChild(li3);
  choicesUl.appendChild(li4);
}





  //governs the function of the timer starting and stopping
//   var timer = setInterval(function () {
//     if (timeLeft > 0 && isGameRunning == true) {
//       timerH2.innerHTML = timeLeft + "<span>Seconds remaining</span>";
//       timeLeft--;
//     } else if (timeLeft === 0){
//       timerH2.innerHTML = "<h4>Time's Up!</h4>";
//       clearInterval(timer);
//       quizDiv.style.display = "none";
//       console.log("time = 0");
//       finalScore();
//     } else {
//       timerH2.innerHTML = "<h4>Game Over!</h4>";
//       clearInterval(timer);
//       console.log("time = 0");
//       finalScore();
//     }
//   }, 1000); //sets speed of timer in ms
// }