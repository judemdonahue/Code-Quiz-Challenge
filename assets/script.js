const quizData = [
    {
        question: "Where did the swag monster get his swagethy?",
        a: "The swag store",
        b: "It was a gift",
        c: "He has none",
        d: "Swags",
        correct: "d",

    },
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Handmedown Towels Make Lunch",
        c: "Henry Told Me Loco",
        d: "Handlebars Take Massive Lions",
        correct: "a",

    },
    {
        question: "What does CSS stand for?",
        a: "Camaro Super Soldier",
        b: "Cascading Style Sheet",
        c: "Can Superman Swim?",
        d: "Crank Soldier Slim",
        correct: "b",

    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit')





let currentQuiz = 0
let score = 0

function loadQuiz() {
   console.log("quiz loaded... zzz...")
   isDefault = true;
    deselectAnswers()
    
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

// loadQuiz()

let isDefault = false;

function defaultPage () {
    quiz.innerHTML =
    `<h1 class="display-3 text-center text-light">Code Quiz Challenge!</h1>
    
    <button class="start-button mx-3 w-25">Start</button>`

    if (isDefault) {
        return;
    }

    
}

window.onload = defaultPage ()

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
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()

       } else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
           
       }
    }
})







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

    loadQuiz();

})



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