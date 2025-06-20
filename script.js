const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "London"],
    answer: "Paris"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markdown Language", "HyperText Markup Language", "HyperTool Multi Language", "None"],
    answer: "HyperText Markup Language"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreEl = document.getElementById('score');

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.addEventListener('click', () => selectAnswer(option));
    optionsEl.appendChild(li);
  });
}

function resetState() {
  nextBtn.disabled = true;
  optionsEl.innerHTML = '';
}

function selectAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;
  const options = optionsEl.querySelectorAll('li');
  options.forEach(option => {
    option.style.pointerEvents = "none";
    if (option.textContent === correct) {
      option.style.backgroundColor = "#2ecc71"; // green
    } else if (option.textContent === selected) {
      option.style.backgroundColor = "#e74c3c"; // red
    }
  });

  if (selected === correct) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById('quiz-container').classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('quiz-container').classList.remove('hidden');
  scoreContainer.classList.add('hidden');
  showQuestion();
}

showQuestion();
