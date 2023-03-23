//quiz questions
const quizData = [
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        a: "onmouseover",
        b: "onchange",
        c: "onmouseclick",
        d: "onclick",
        correct: "d",
    },
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Hyper Text Machine Learning",
        c: "How To Meet Ladies",
        d: "Hexadecimal Tamales Male Lineup",
        correct: "a",
    },
    {
        question: "What does CSS stand for?",
        a: "Collection of Stackoverflow Snippets",
        b: "Cascading Style Sheet",
        c: "Competitive Selector Syntax",
        d: "Combinators Compound Selectors",
        correct: "b",
    },
    {
        question: "Commonly used data types do NOT include which of the following?",
        a: "Strings",
        b: "Booleans",
        c: "Alerts",
        d: "Numbers",
        correct: "c",
    },
    {
        question: "The condition inside of an if/else statement is enclosed with?",
        a: "Quotes",
        b: "Curly Brackets",
        c: "Parenthesis",
        d: "Square Brackets",
        correct: "c",
    },
    {
        question: "Arrays in JavaScript can be used to store which of the following?",
        a: "Numbers and Srings",
        b: "Other Arrays",
        c: "Booleans",
        d: "All of the Above",
        correct: "d",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        a: "JavaScript",
        b: "Terminal/Bash",
        c: "For Loops",
        d: "Console.log",
        correct: "d",
    },
    {
        question: "String values must be enclosed inside of what when being assigned to a variable?",
        a: "Commas",
        b: "Curly Brackets",
        c: "Quotes",
        d: "Parenthesis",
        correct: "c",
    },
    {
        question: "Inside what HTML element do we put the JavaScript?",
        a: "<js>",
        b: "<script>",
        c: "<scripting>",
        d: "<javascript>",
        correct: "b",
    },
    {
        question: "What does DOM stand for?",
        a: "Document Object Model",
        b: "Domestic Object Model",
        c: "Data Oriented Model",
        d: "Data Object Muted",
        correct: "a",
    },
];


//
const quiz = document.getElementById('quiz');

const resultContainer = document.getElementById('result');

const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const highScore = document.getElementById('highscore');

const timerCount = document.querySelector(".timer-count")
const startButton = document.querySelector(".start-button")


let currentQuiz = 0
let score = 0
let secondsLeft = 75;

let highscoresArray = JSON.parse(localStorage.getItem("highscoreTable"));
if (highscoresArray === null) {
    highscoresArray = [];
}

let stillPlaying = true;

function loadQuestion() {
   console.log("question loaded")
    deselectAnswers()
    
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

//Deselects Checked radio outputs
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++

           resultContainer.innerHTML = 
           `<hr>
           <h2 class="correct text-center"> Correct! </h1>
           `

       } else {
        secondsLeft -= 10;
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
        timerCount.textContent = secondsLeft;

        resultContainer.innerHTML = 
           `<hr>
           <h2 class="incorrect text-center"> Incorrect! </h1>
           `

       }
       currentQuiz++

//else if subtract time function

//keeps loadquestion function going as long as there are questions remaining
//if the questions completely cycle through loads score and reload button functions
       if(currentQuiz < quizData.length) {
           loadQuestion()
       } else {
          
           stillPlaying = false;
       }
    }
})



function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCount.textContent = secondsLeft;

//Out of time end game function
        if(secondsLeft <= 0) {
            secondsLeft = 0;
            timerCount.textContent = secondsLeft;
            quiz.innerHTML = 

            `<h2 class="text-center">You've run out of time!</h2>

            <div class="row col-12 d-flex justify-content-center"><button class="btn btn-purple btn-default display col-2 display-5 d-flex justify-content-center p-2" onclick="location.reload()">Try Again?</button></div>`

            resultContainer.innerHTML = ``

            clearInterval(timerInterval);

        } else if (stillPlaying === false) { 
            
            quiz.innerHTML = 
            
            `<h2 class="text-center">You answered ${score}/${quizData.length} questions correctly</h2>

            <hr />
 
            <h4 class="text-center">Enter your initials</h4>
            
            <input type="text" id="initial" class="col-1 d-flex justify-content-center my-2">
 
            <div class="row col-12 d-flex justify-content-center"><button id="submit" class="btn btn-purple btn-default display col-2 display-5 d-flex justify-content-center p-2 my-4" onclick="">Submit Score</button></div>
 
            <hr />
 
            <div class="row col-12 d-flex justify-content-center"><button class="btn btn-purple btn-default display col-2 display-5 d-flex justify-content-center p-2 my-3" onclick="location.reload()">Reload</button></div>`

            resultContainer.innerHTML = ``

            clearInterval(timerInterval);
            submitEventListener();
        } 
    }, 1000);
}


startButton.addEventListener("click", function(event){
    console.log("Started Quiz");
    setTime();

    document.getElementById('start').classList.replace('display', 'hide');
    document.getElementById('quiz').classList.remove('hide');

    loadQuestion();

})

//Pushes highscores to local storage
function submitEventListener () {
   var submitInner = document.getElementById("submit");
   submitInner.addEventListener('click', function(){
    var userInput = document.getElementById("initial");
    highscoresArray.push({initials:userInput.value,score:score});
    localStorage.setItem("highscoreTable", JSON.stringify(highscoresArray));
    showHighscores();
   })
}

function showHighscores () {
    document.getElementById('start').classList.replace('display', 'hide');
    document.getElementById('quiz').classList.remove('hide');

    quiz.innerHTML = 
    `<h2 class="text-center">Highscores</h2>

    <ol id="hsList" class="text-center"></ol>

    <div class="row col-12 d-flex justify-content-center"><button id="clearBtn" class="btn btn-purple btn-default display col-2 display-5 d-flex justify-content-center p-2 my-3">Clear Scores</button></div>

    <div class="row col-12 d-flex justify-content-center"><button class="btn btn-purple btn-default display col-2 display-5 d-flex justify-content-center p-2" onclick="location.reload()">Back to Start</button></div>
    `
    var hsListEl = document.getElementById("hsList");

    for (i = 0; i < highscoresArray.length; i++) {
        var newListItem = document.createElement("li");
        newListItem.textContent = highscoresArray[i].initials + " | " + highscoresArray[i].score;
        hsListEl.append(newListItem);
    }


    //Clear Highscores 

    var clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener('click', function() {
        highscoresArray = [];
        localStorage.setItem("highscoreTable", JSON.stringify(highscoresArray));
        showHighscores();
    })

}

highScore.addEventListener('click', showHighscores)





// default start page
// when start button is clicked, the first question is presented

// when the user answers a question 
// another is presented

// when a question is answered incorrectly
// time is subtracted from the clock

// when all questions are answered or the timer reaches 0
// the game is over

// when the game is over you save your initials and score
// when you click view high scores you are presented with the previous games high scores