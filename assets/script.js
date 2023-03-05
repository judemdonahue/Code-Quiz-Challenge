var timerCount = document.querySelector(".timer-count")
var startButton = document.querySelector(".start-button")

secondsLeft = 75;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCount.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        
//

        }
    }, 1000);
}

startButton.addEventListener("click", function(event){
    console.log("click");
    setTime();

})

// default start page
// when start button is clicked, the first question is presented

// when the user answers a question 
// another is presented

// when a question is answered correctly
// time is subtracted from the clock

// when all questions are answered or the timer reaches 0
// the game is over

// when the game is over you save your initials and score
// when you click view high scores you are presented with the previous games high scores