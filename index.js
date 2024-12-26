const main = document.getElementById("mainContain");

const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";

const colors = ["red", "blue", "green", "yellow"];

const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

colors.forEach((color) => {
  const button = document.createElement("button");
  button.id = color;
  button.className = "colorButton";
  mainDiv.appendChild(button);
});

const startButton = document.createElement("button");
startButton.id = "startButton";
startButton.textContent = "Start Game";

main.appendChild(mainDiv);
main.appendChild(startButton);

let sequence = [];
let playerSequence = [];
let level = 0;

function startGame() {
  startButton.setAttribute("disabled", "disabled");
  sequence = [];
  playerSequence = [];
  level = 0;
  nextLevel();
}

const gameOver = () => {};

function nextLevel() {
  level++;
  const nextcolor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(nextcolor);
  console.log(sequence);
  flashColor(nextcolor);
  playSequence();
}

function flashColor(color) {
  const button = document.getElementById(color);
  console.log(button);
  button.style.animation = `ajillah${colors.indexOf(color) + 1} 2s linear`;
  setTimeout(() => {
    button.style.animation = "none";
  }, 1000);
}

function playSequence() {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, index * 1000);
  });
}

function handlePlayerInput(color) {
  playerSequence.push(color);
  flashColor(color);
  checkPlayerInput();
}

function checkPlayerInput() {
  const currentIndex = playerSequence.length - 1;

  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    startButton.removeAttribute("disabled");
    alert("game over");
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextLevel, 500);
  }
}

document.querySelectorAll(".colorButton").forEach((button) => {
  button.addEventListener("click", () => {
    handlePlayerInput(button.id);
  });
});

startButton.addEventListener("click", startGame);
