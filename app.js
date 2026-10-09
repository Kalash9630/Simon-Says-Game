let gameOverVariable = false;
let body = document.querySelector("body");

let countLevel = 0;
let score = 0;

let gameSequence = [];  //for tracking the sequence of the game
let userSequence = [];  //for tracking the sequence of the user

let userTurn = false;

// Game Over Element
function gameOver() {
    let h2 = document.createElement("h2");
    h2.innerText = `GAME OVER! Your Score is ${score}.`

    let h2Present = document.querySelector("h2");
    h2Present.before(h2);
    h2Present.innerText = "Game Ended";

    body.style.backgroundColor = "red";
    setTimeout(function () {
        body.style.backgroundColor = "";
    }, 500);
    gameOverVariable = true;
}

// checking userSequence and gameSequence
function checkingUserAndGame() {
    let lastIndex = userSequence.length - 1;

    // not same
    if (gameSequence[lastIndex] != userSequence[lastIndex]) {
        gameOver();
        return;
    }

    if( gameSequence.length == userSequence.length) {
        score++;
        // console.log(`Score : ${score}`); //temp
        userSequence = [];
        startGame();
    }

}

// user Input
function userInput() {
    let btns = document.querySelectorAll(".btn");
    btns.forEach(function (btn, index) {
        btn.addEventListener("click", function () {

            // Don't allow user to click during computer's turn
            if (!userTurn) {
                return;
            }

            userSequence.push(index);
            // console.log(userSequence); //temp
            // console.log(index);  //temp
            checkingUserAndGame();
        });
    });
}


// flashing the button
function flashingButton() {
    let btns = document.querySelectorAll(".btn");
    let randomIndex = Math.floor(Math.random() * 4)
    btns[randomIndex].style.backgroundColor = "white";
    setTimeout(function () {
        btns[randomIndex].style.backgroundColor = "";
    }, 300);
    gameSequence.push(randomIndex);
    // console.log(btns[randomIndex]); //temp
    // console.log(gameSequence); //temp

    // Computer is finished
    userTurn = true;
}
userInput();

// Starting the game
function startGame() {

    if (gameOverVariable) {
        return;
    }

    countLevel++;
    let h2 = document.querySelector("h2");
    h2.innerText = `Level ${countLevel}`;
    setTimeout(function () {
        flashingButton();
    }, 500);
}

// starting here
body.addEventListener("keydown", startGame);