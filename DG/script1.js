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
question: "1. If f is a function on a set A= {1,2,3,4,5} such that f= { (1,1),(2,2),(3,3),(4,4),(5,5,)}. Then",
options: ["f is bijective but not surjective","f is surjective but not injective", "f is bijective", "None of the above"],
correct: "f is bijective",
},
{
id: "2",
question: "2. If f is a function on a set A= {1,2,3,4,5} such that  f= { (1,2),(2,3),(3,4),(4,x),(5,5,)}. If f is a bijective function the x is",
options: ["5" ,"3", "1", "None of these"],
correct: "1",
},
{
id: "3",
question:"3. Let A = {4,5,6,7} and B = {4,5,6,7}If f is one to one from A to B then which of the following is correct?",
options:["f is into function","f is bijective","f may or may not be bijective","None of these"],
correct: "f is bijective",
},
{
id: "4",
question:"4. Let A = {7,8,9} and B = {7,8,9} and f is onto from A to B then which of the following is correct?",
options:["(a) f is one to one", "(b) f is bijective","(c) f may be one to one or many to one ","(d) Non of the above"],
corect:"(b) f is bijective",
},
{
id: "5",
question:"5. if A function f : A →B is an onto function then",
optins:["(a) A = B", "(b) B is a subset of A", "(c) range of f is A", "(d) range of f is B"],
correct:" (d) range of f is B",
},
{
id: "6",
question: "6. If A function f : A →B is an one to one function then",
options:["(a) Number of elements in range of f is n(B)", "(b) n(A) = n(B)", "(c) Number of elements in range of f is n(A)", "(d) n(A) > number of elements in range of f"],
correct: "(c) Number of elements in range of f is n(A)",
},
{
id: "7",
question:"7. If A function f : A →B is an bijective function then",
options:["(a) Number of elements in range of f is n(B)","(b) Number of elements in range of f is n(A)","(c) n(A) = n(B)","(d) All the above are true"],
correct:"(c) n(A) = n(B)",
},
{
id: "8",
question: "8. If f:A→B is a bijective function and n(A) = 6 then which of the following is not possible",
options: ["(a) No of elements in range of f is 6","(b) n(B) = 6", "(c) n(B) =8", "(d) n(A) = n(B)"],
correct:"(c) n(B) =8",
},
{
id: "9",
question:"9. If f(a) = f(b) implies that a = b then f is",
options:["(a) not one to one"," (b) one to one"," (c) not onto"," (d) onto"],
correct:"one to one",
},
{
id: "10",
question:"10. If f : A →B is an onto function then range of f is ________",
options:["(a) A"," (b) B"," (c) subset of B"," (d) Can’t find"],
correct:" (b) B",
},
{
id: "11",
question:" 11. f : [0,π] →R given by f(x) = sinx is", 
options:["(a) one to one function","(b) onto function","(c) not one to one"," (d) bijective function"],
correct:"(c) not one to one",
},
{
id: "12",
question:"12. .A function f:R→R defined by f(x) = 2x is", 
options:["(a) only one to one","(b)only onto","(c) neither one to one nor onto","(d) bijective function"],
correct:"(d) bijective function",
},
{
id: "13",
question:"13. A function f:N→N defined by f(x) = x2 is ",
options:["(a) one to one","(b) not one to one","(c) on to","(d)bijective"],
correct:"(a) one to one",
},
{
id: "14",
question:"14. A function f:Z→Z defined by f(x) = x2 is ",
options:["(a) one to one","(b) on to","(c) neither one to one nor onto","(d)bijective"],
correct:"(c) neither one to one nor onto",
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