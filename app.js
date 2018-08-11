// Game Values
let min = 1,
  max = 10,
  winnigNum = getWinning(min, max),
  guessesLeft = 3;

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener("mousedown", function(e) {
  console.log(e);
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    setTimeout(function() {
      message.innerHTML = "";
      guessInput.value = "";
    }, 2000);
  }
  // check if won
  if (guess === winnigNum) {
    gameOver(true, `Congratulations YOU WON, ${winnigNum} was correct!!`);
  }
  // check if lose
  else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `You lost, the correct number was ${winnigNum}`);
    } else {
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(
        `Please try again, ${guess} isn't correct, you have ${guessesLeft} guesses Left`,
        "red"
      );
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  //Play agian?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

function getWinning() {
  return Math.floor(Math.random() * 10) + 1;
}
