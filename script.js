const questions = [
    {
        question: "Which is the oldest mountain range in India?",
        answers: [
            { text: "Western Ghats", correct: false },
            { text: "Aravalli Range", correct: true },
            { text: "Himalayas", correct: false },
            { text: "Satpura Range", correct: false },
        ]
    },
    {
        question: "Who was the first woman Prime Minister of India?",
        answers: [
            { text: "Kalpana Chawla", correct: false },
            { text: "Sunita Williams", correct: false },
            { text: "Vikram Sarabhai", correct: false },
            { text: "Indira Gandhi", correct: true },
        ]
    },
    {
        question: "Which festival is known as the Festival of Lights?",
        answers: [
            { text: "Holi", correct: false },
            { text: "Diwali", correct: true },
            { text: "Dussehra", correct: false },
            { text: "Pongal", correct: false },
        ]
    },
    {
        question: "What is the national sport of India?",
        answers: [
            { text: "Football", correct: false },
            { text: "Kabaddi", correct: false },
            { text: "Hockey", correct: true },
            { text: "Cricket", correct: false },
        ]
    },
    {
        question: "Which bird is the national bird of India?",
        answers: [
            { text: "Peacock", correct: true },
            { text: "Eagle", correct: false },
            { text: "Crow", correct: false },
            { text: "Parrot", correct: false },
        ]
    },
    {
        question: "Which is the longest river in India?",
        answers: [
            { text: "Yamuna", correct: false },
            { text: "Ganga", correct: true },
            { text: "Krishna", correct: false },
            { text: "Brahmaputra", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}
startQuiz();
