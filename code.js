const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
    ]
  },
  {
    question: "Which HTML element is used to define the title of a document?",
    answers: [
      { text: "<title>", correct: true },
      { text: "<head>", correct: false },
      { text: "<meta>", correct: false },
    ]
  },
  {
    question: "Which tag is used for inserting an image in HTML?",
    answers: [
      { text: "<img>", correct: true },
      { text: "<image>", correct: false },
      { text: "<src>", correct: false },
    ]
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: [
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "bgcolor", correct: false },
    ]
  },
  {
    question: "How do you select an element with id 'header' in CSS?",
    answers: [
      { text: ".header", correct: false },
      { text: "#header", correct: true },
      { text: "*header", correct: false },
    ]
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
    ]
  },
  {
    question: "Which JavaScript method is used to write output to the browser console?",
    answers: [
      { text: "console.log()", correct: true },
      { text: "print()", correct: false },
      { text: "write()", correct: false },
    ]
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "/*", correct: false },
      { text: "<!-- -->", correct: false },
    ]
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answers: [
      { text: "var myVar;", correct: true },
      { text: "variable myVar;", correct: false },
      { text: "v myVar;", correct: false },
    ]
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "class", correct: false },
      { text: "style", correct: true },
      { text: "font", correct: false },
    ]
  }
];
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const scoreValue = document.getElementById('score-value');

let currentQuestionIndex = 0;
let score = 0;
let quizFinished = false; // Track if quiz is finished but score not shown

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizFinished = false;
  scoreEl.classList.add('hide');
  nextBtn.style.display = 'none';
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsEl.appendChild(button);
  });

  // Show Submit on last question, else Next
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.innerText = "Submit";
  } else {
    nextBtn.innerText = "Next";
  }
}

function resetState() {
  nextBtn.style.display = 'none';
  answerButtonsEl.innerHTML = '';
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) {
    score++;
    selectedBtn.classList.add('correct');
  } else {
    selectedBtn.classList.add('wrong');
  }

  Array.from(answerButtonsEl.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
  });

  nextBtn.style.display = 'inline-block';
}

function showViewScorePrompt() {
  resetState();
  questionEl.innerText = "You've submitted your answers.";
  scoreEl.classList.add('hide');
  nextBtn.innerText = "View Score";
  nextBtn.style.display = 'inline-block';
  quizFinished = true;
}

function showScore() {
  resetState();
  questionEl.innerText = "Quiz Completed!";
  scoreValue.innerText = `${score} / ${questions.length}`;
  scoreEl.classList.remove('hide');
  nextBtn.innerText = "Play Again";
  nextBtn.style.display = 'inline-block';

  if (score >= 5) {
    alert(`✅ Well done! You scored ${score} out of ${questions.length}.`);
  } else {
    alert(`😔 Better luck next time! You scored ${score} out of ${questions.length}.`);
  }
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showViewScorePrompt();
  }
}

nextBtn.addEventListener('click', () => {
  if (!quizFinished) {
    if (currentQuestionIndex < questions.length - 1) {
      handleNext();
    } else if (currentQuestionIndex === questions.length - 1) {
      // Submit clicked on last question
      showViewScorePrompt();
    }
  } else {
    // quizFinished = true, now show score or restart
    if (nextBtn.innerText === "View Score") {
      showScore();
    } else if (nextBtn.innerText === "Play Again") {
      startQuiz();
    }
  }
});

startQuiz();
