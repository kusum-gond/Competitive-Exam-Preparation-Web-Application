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
question: "The only language which the computer understands is ______________",
options: ["Assembly Language", "Binary Language", "BASIC Language", "None of these"],
correct: "Binary Language",
},
{
id: "2",
question:"The smallest unit of data in computer is ________________",
options:["Byte ","Nibble "," Bit ","KB"],
correct: "Bit",
},
{
id: "3",
question:"One nibble is equivalent to how many bits?",
options:["2","4","8","1"],
correct: "8",
},
{
id: "4",
question: "Which of the following describes the correct format of an input instruction?",
options:["IN 82", "INPUT 82", "INP 82", "82 INP"],
correct:"IN 82",
},
{
id: "5",
question: "The input machine which originated in the United States around 1880s is a",
options:["Mouse", "Joystick","Keyboard", "Bar Code Reader"],
correct:"Keyboard",
},
{
id:"6",
question:"1 yottabyte = ______________",
options:["1024 TB", "1024 EB","1024 ZB", "1024 PB"],
correct:"1024 ZB",
},
{
id:"7",
question:"Which of the following is not a function of the Input Unit?",
options:["It reads instructions and data from the outside world.", " It converts the data into computer acceptable format. "," It makes the data into user understandable format.","It supplies the data and instructions to the computer for further processing."],
correct:"It makes the data into user understandable format",
},
{
id:"8",
question:"The process of producing useful information for the user is called ___________",
options:["Controlling" ,"Outputting", "Inputting", "Processing"],
correct:"Outputting",
},
{
id:"9",
question:"The output unit coverts the data entered by the user into computer understandable form.",
options:["True ","False"],
correct:"False",
},
{
id:"10",
question:"VDU stands for __________",
options:["Virtual Display Unit", "Visual Display Unit ","Virtual Detection Unit ","Visual Detection Unit"],
correct:"Visual Display Unit",
},
{
id:"11",
question:"What does SVGA stands for?",
options:["Standard Visual Graphics Array ","Super Visual Graphics Array "," Standard Video Graphics Array", " Super Video Graphics Array"],
correct:"Super Video Graphics Array",
},
{
id:"12",
question:"The devices that used to give single or multiple colored images and drawings are ____________",
options:["Monitors "," Printers "," Plotters", "VDUs"],
correct:"Plotters",
},
{
id:"13",
question:"A special request originated from some device to the CPU to acquire some of its  time is called ___________",
options:["Disturbance ","Attenuation ","Interrupt ","Noise"],
correct:"Interrupt",
},
{
id:"14",
question:" Line Printers that print one line at a time are _________",
options:["Laser Printers "," Inkjet Printers ","Drum Printers ","Chain Printers"],
correct:"Drum Printers",
},
{
id:"15",
question:"A ___________________ monitor looks like a television and are normally used  with non-portable computer systems.",
options:["CRT ","LCD", " LED "," Flat Panel Monitors"],
correct:"CRT",
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