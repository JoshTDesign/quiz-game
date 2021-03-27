var isGameRunning = true;
console.log(isGameRunning);


//parts of the page
//var timer = document.querySelectorAll('timer');
// document.body.appendChild(document.createElement("h3"));
// timer.textContent="testing";

// var h1El = document.createElement("h1");
// h1El.textContent = "Welcome to my page";
// body.appendChild(document.createElement("h1"));

//document.body.querySelector("timer").textContent = "Testing";

// var element = document.getElementById("id01");
// element.innerHTML = "New Heading";

function startTimer() {
    var timeleft = 20;
    var timer = setInterval(function () {
        if (timeLeft === 0) {
          // Use `clearInterval()` to stop the timer
          clearInterval(timer);
        } else {
          // Display one word of the message
          mainEl.textContent = words[wordCount];
          wordCount++;
        }
      }, 100);
}