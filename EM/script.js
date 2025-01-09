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
    question: " Cauchy – Riemann equation is",
    options: ["ux = vy & uy = vy", "ux = vy & uy = vx", "ux = - vy & uy = vx", "ux = vy & uy = -vx"],
    correct: "ux = vy & uy = -vx",
  },
  {
    id: "2",
    question: "An analytic function with constant real part is",
    options: ["real", "imaginary", "constant", "neither real nor imaginary"],
    correct: "constant",
  },
{
    id: "3",
    question: "If f(z) = z3 then ux = ________",
    options: ["3x2 – 3y2","3z2","3y2 – 3x2","3x2 + 3y2"],
    correct: "3x2 – 3y2",
  },
{
    id: "4",
    question: "If f(z) = e-z then vy =",
    options: ["- e-x cosy","e-x cosy","e-y cosy","e-x cosy"],    
	correct: "- e-x cosy",
  },
{
    id: "5",
    question: " If w = sin z then the value of vy is",
    options: ["vy = sinx coshy","vy = sinx sinhy","vy = cosx coshy","vy =- sinx coshy"],
    correct: "vy = cosx coshy",
  },
{
    id: "6",
    question: "A parentheses checker program would be best implemented using",
    options: ["List","Queue","Stack","Any of the above"],
    correct: "Stack",
  },
{
    id: "7",
    question: "If w=f(z) is not conformal at a point z0 ,where f ’(z0) =0,then z0 is called",
    options: ["critical point","saddle point","vertical point","finite point"],
    correct: "critical point",
  },
{
    id: "8",
    question: "If given transformation isw=z-1/z+1 then fixed point is",
    options: ["-i","i","2","+ i"],
    correct: "+i",
  },
{
    id: "9",
    question: "If f(z) = u+iv is analytic,then u is said to be ________of v",
    options: ["conjugate harmonic", "harmonic function", "analytic function", "exponential function"],
    correct: "conjugate harmonic",
  },
{
    id: "10",
    question: "An analytic function with constant modulus is",
    options: ["variable","Constant"," Infinity","finite"],
    correct: " Infinity",
  },
{
    id: "11",
    question: "The cross ratio of (z1 ,z 2, z3, z 4) is defined as",
    options: ["(z4 –z1) (z3 – z2) / (z4 –z 3) (z 2– z1)","(z1 –z2) (z 3 – z4) / (z1 –z4) (z3 – z2)","(z2 –z3) (z1 – z4) / (z 3–z4) (z1 – z2 )","(z1 –z3) (z 2– z3) / (z1 –z2) (z 4– z 1)"],
    correct: "(z1 –z2) (z 3 – z4) / (z1 –z4) (z3 – z2)",
  },
{
    id: "12",
    question: "The image of y = 3x under w = 1 / z is",
    options: ["u – 3v = 0","3u + v = 0","u + 3v = 0","3u – v = 0"],
    correct: "3u + v = 0",
  },
{
    id: "13",
    question: "The critical point of w = z 2 is",
    options: ["1","0","2","-2"],
    correct: "0",
  },
{
    id: "14",
    question: "The image of | z + 1 | = 1 under the mapping w = 1/ z is",
    options: ["2u + 1 =0","1 – 2u = 0","2v +1 =0","1- 2v = 0"],
    correct: "2u + 1 =0",
  },
{
    id: "15",
    question: "The image of the circle | z | = 2 under the transformation w = 3z is",
    options: ["(u -3)2 + (v-3) 2 = 9","u 2 + v 2 = 3","(u -1)2 + (v-2) 2 = 4","u 2 + v 2 = 36"],
    correct: "u 2 + v 2 = 36",
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