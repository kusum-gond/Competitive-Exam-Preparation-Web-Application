//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "1",
    question: "Minimum number of fields in each node of a doubly linked list is",
    options: ["2", "3", "4", "None of the above"],
    correct: "3",
  },
  {
    id: "2",
    question: "A graph in which all vertices have equal degree is known as",
    options: ["Complete graph", "Regular graph", "Multi graph", "Simple graph"],
    correct: "Complete graph",
  },
 {
    id: "3",
    question: "A vertex of in-degree zero in a directed graph is called a/an",
    options: ["Root vertex","Isolated vertex","Sink","Articulation point"],
    correct: "Sink",
  },
{
    id: "4",
    question: "A graph is a tree if and only if graph is ",
    options: ["Directed graph","Contains no cycles","Planar","Completely connected"],
    correct: "Contains no cycles",
  },
{
    id: "5",
    question: "The elements of a linked list are stored",
    options: ["In a structure","In an array","Anywhere the computer has space for them","In contiguous memory locations"],
    correct: "Anywhere the computer has space for them",
  },
{
    id: "6",
    question: "A parentheses checker program would be best implemented using",
    options: ["List","Queue","Stack","Any of the above"],
    correct: "Stack",
  },
{
    id: "7",
    question: "To perform level-order traversal on a binary tree, which of the following data structure will be required?",
    options: ["Hash table","Queue","Binary search tree","Stack"],
    correct: "Queue",
  },
{
    id: "8",
    question: "Which of the following data structure is required to convert arithmetic expression in infix to its equivalent postfix notation?",
    options: ["Queue","Linked list","Binary search tree","None of above"],
    correct: "None of above",
  },
{
    id: "9",
    question: "A binary tree in which all its levels except the last, have maximum numbers of nodes, and all the nodes in the last level have only one child it will be its left child. Name the tree.",
    options: ["Threaded tree", "Complete binary tree", "M-way search tree", "Full binary tree"],
    correct: "Complete binary tree",
  },
{
    id: "10",
    question: "Which of following data structure is more appropriate for implementing quick sort iteratively?",
    options: ["Deque","Queue","Stack","Priority queue"],
    correct: "Stack",
  },
{
    id: "11",
    question: "The number of edges in a complete graph of n vertices is",
    options: ["n(n+1)/2","n(n-1)/2","n2/2","n"],
    correct: "n(n-1)/2",
  },
{
    id: "12",
    question: "If two trees have same structure and but different node content,then they are called ___",
    options: ["Synonyms trees","Joint trees","Equivalent trees","Similar trees"],
    correct: "Similar trees",
  },
{
    id: "13",
    question: "If two trees have same structure and node content, then they are called ____",
    options: ["Synonyms trees","Joint trees","Equivalent trees","Similar trees"],
    correct: "Equivalent trees",
  },
{
    id: "14",
    question: "Finding the location of a given item in a collection of items is called",
    options: ["Discovering","Finding","Searching","Mining"],
    correct: "Searching",
  },
{
    id: "15",
    question: "Quick sort is also known as",
    options: ["merge sort","tree sort","shell sort","partition and exchange sort"],
    correct: "partition and exchange sort",
  },

];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};