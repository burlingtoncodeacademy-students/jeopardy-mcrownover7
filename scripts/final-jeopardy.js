//DOM Elements
let playerScoreList = document.getElementById("playerScores");
let playerOneNameDiv = document.getElementById("playerOneName");
let playerTwoNameDiv = document.getElementById("playerTwoName");
let playerOneScoreDiv = document.getElementById("playerOneScore");
let playerTwoScoreDiv = document.getElementById("playerTwoScore");
let playerThreeNameDiv = document.getElementById("playerThreeName");
let playerThreeScoreDiv = document.getElementById("playerThreeScore");
let playerFourNameDiv = document.getElementById("playerFourName");
let playerFourScoreDiv = document.getElementById("playerFourScore");

let finalQuestionDiv = document.getElementById("finalQuestion");
let userAmountWager = document.getElementById("amountFinal");
let userGuess = document.getElementById("answerFinal");
let betButton = document.getElementById("betResponse");

//setting global variables
//taking fragment and using it to find names and number of players
let frag = window.location.hash.substr(1);
let numPlayersField = frag.split("=");
let numPlayers = parseInt(numPlayersField[1].toString().split("&")[0]);
let nameField;
let scoreField;

let playerOne;
let playerTwo;
let playerThree;
let playerFour;
let nameArray = [];

let scoreArray = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let playerThreeScore = 0;
let playerFourScore = 0;

let whoseTurn;

let fill;
let valueClicked;
let answer;
let userAnswer;

let question;

//-------------------------------JSON FETCH SECTION---------------------------------
//fetching the musical and theatre json and setting the global corrected variable to store data from the fetch
let jsonGadgetsCorrected;
fetch("/JSON/gadgets.json")
  .then((res) => res.json())
  .then((jsonGadgets) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(myArray) {
      let currentIndex = myArray.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [myArray[currentIndex], myArray[randomIndex]] = [
          myArray[randomIndex],
          myArray[currentIndex],
        ];
      }
      return myArray;
    }
    //setting the corrected (randomized) array
    jsonGadgetsCorrected = shuffle(jsonGadgets);

    //getting a random question and answer and assigning to global variables
    question = jsonGadgetsCorrected[0].question;
    answer = jsonGadgetsCorrected[0].correct_answer;
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonGadgetsCorrected;
  });

//----------------------Page Load Logic----------------------------------------

//logic for setting the names and setting whoseTurn to be playerOne
if (numPlayers == 1) {
  playerOne = numPlayersField[2].toString().split("&")[0].toString();
  nameArray = [`${playerOne}`];
  whoseTurn = playerOne;
} else if (numPlayers == 2) {
  nameField = numPlayersField[2].toString().split("+");
  playerOne = nameField[0].toString();
  playerTwo = nameField[1].toString().split("&")[0].toString();
  nameArray = [`${playerOne}`, `${playerTwo}`];
  whoseTurn = playerOne;
} else if (numPlayers == 3) {
  nameField = numPlayersField[2].toString().split("+");
  playerOne = nameField[0].toString();
  playerTwo = nameField[1].toString();
  playerThree = nameField[2].toString().split("&")[0].toString();
  nameArray = [`${playerOne}`, `${playerTwo}`, `${playerThree}`];
  whoseTurn = playerOne;
} else {
  nameField = numPlayersField[2].toString().split("+");
  playerOne = nameField[0].toString();
  playerTwo = nameField[1].toString();
  playerThree = nameField[2].toString();
  playerFour = nameField[3].toString().split("&")[0].toString();
  nameArray = [
    `${playerOne}`,
    `${playerTwo}`,
    `${playerThree}`,
    `${playerFour}`,
  ];
  whoseTurn = playerOne;
}

//logic for passing the scores to the round based on the fragment
if (numPlayers == 1) {
  playerOneScore = parseInt(numPlayersField[3]);
} else if (numPlayers == 2) {
  scoreField = numPlayersField[3].toString().split("^");
  playerOneScore = parseInt(scoreField[0]);
  playerTwoScore = parseInt(scoreField[1]);
} else if (numPlayers == 3) {
  scoreField = numPlayersField[3].toString().split("^");
  playerOneScore = parseInt(scoreField[0]);
  playerTwoScore = parseInt(scoreField[1]);
  playerThreeScore = parseInt(scoreField[2]);
} else if (numPlayers == 4) {
  scoreField = numPlayersField[3].toString().split("^");
  playerOneScore = parseInt(scoreField[0]);
  playerTwoScore = parseInt(scoreField[1]);
  playerThreeScore = parseInt(scoreField[2]);
  playerFourScore = parseInt(scoreField[3]);
}

//creating event listener for when the game starts to notify player one it is their turn and starting the round timer
window.addEventListener("load", (evt) => {
  //logic to set the name and score divs to the right names and number of players
  if (numPlayers == 1) {
    playerOneNameDiv.textContent = playerOne;
    playerOneScoreDiv.textContent = `$${playerOneScore}`;
  } else if (numPlayers == 2) {
    playerOneNameDiv.textContent = playerOne;
    playerOneScoreDiv.textContent = `$${playerOneScore}`;
    playerTwoNameDiv.textContent = playerTwo;
    playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
  } else if (numPlayers == 3) {
    playerOneNameDiv.textContent = playerOne;
    playerOneScoreDiv.textContent = `$${playerOneScore}`;
    playerTwoNameDiv.textContent = playerTwo;
    playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
    playerThreeNameDiv.textContent = playerThree;
    playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
  } else {
    playerOneNameDiv.textContent = playerOne;
    playerOneScoreDiv.textContent = `$${playerOneScore}`;
    playerTwoNameDiv.textContent = playerTwo;
    playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
    playerThreeNameDiv.textContent = playerThree;
    playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
    playerFourNameDiv.textContent = playerFour;
    playerFourScoreDiv.textContent = `$${playerFourScore}`;
  }

  //alert to notify player one it is their turn
  alert(
    `Place your wagers!\nEach player can place a wager up to their current score (unless below 0).\nFirst player to bet is ${playerOne}. Once all players wager the final question will be revealed`
  );

  betButton.disabled = true;
  userAmountWager.disabled = false;
  userGuess.disabled = true;
});

//Prompt to make wager up to their current point total

//all players enter their wagers

//question revealed

//all players can enter their guesses

//all submitted -> answer is shown

//calculate new scores based on wagers

//game notifies the winner and returns to index.html

let playerOneBet = 0;
let playerTwoBet = 0;
let playerThreeBet = 0;
let playerFourBet = 0;

let playerOneGuess;
let playerTwoGuess;
let playerThreeGuess;
let playerFourGuess;

let playerOneBetPlaced = false;
let playerTwoBetPlaced = false;
let playerThreeBetPlaced = false;
let playerFourBetPlaced = false;

let playerOneGuessPlaced = false;
let playerTwoGuessPlaced = false;
let playerThreeGuessPlaced = false;
let playerFourGuessPlaced = false;

//event listener on the wager input to re-enable the bet button
userAmountWager.addEventListener("input", (evt) => {
  betButton.disabled = false;
});

//event listener on the guess input to re-enable the bet button
userGuess.addEventListener("input", (evt) => {
  betButton.disabled = false;
});

betButton.addEventListener("click", (evt) => {
  //logic for if all players betted -> show question -> set the bet variable, then expect guesses
  console.log(answer);
  //-------------------------------logic for single player-------------------------
  if (numPlayers == 1) {
    //get bet first
    if (playerOneBetPlaced === false) {
      //protection against a score lower than zero
      if (playerOneScore < 0) {
        playerOneBet = 0;
        playerOneBetPlaced = true;
        userAmountWager.value = "";

        userGuess.disabled = false;
        userAmountWager.disabled = true;
        betButton.disabled = true;
        finalQuestionDiv.innerHTML = question;
        alert(
          `${playerOne}, your score is less than 0.\nSo, your bet is defaulted to 0.`
        );
        //if wager is < 0
      } else if (parseInt(userAmountWager.value) < 0) {
        playerOneBet = 0;
        playerOneBetPlaced = true;
        userAmountWager.value = "";

        userGuess.disabled = false;
        userAmountWager.disabled = true;
        betButton.disabled = true;
        finalQuestionDiv.innerHTML = question;
        alert(
          `${playerOne}, you wagered less than 0.\nSo, your bet is defaulted to 0.`
        );
        //if the user wagers more than they have and checking NaN
      } else if (
        parseInt(userAmountWager.value) > playerOneScore ||
        isNaN(parseInt(userAmountWager.value)) === true
      ) {
        alert(`${playerOne}, wager a value lower than your score`);
        userAmountWager.value = "";
        //Wager is valid
      } else {
        playerOneBet = parseInt(userAmountWager.value);
        playerOneBetPlaced = true;
        userAmountWager.value = "";

        userGuess.disabled = false;
        userAmountWager.disabled = true;
        betButton.disabled = true;
        finalQuestionDiv.innerHTML = question;
        alert(`${playerOne}, you wager ${playerOneBet}`);
      }
      //Checking answer
    } else {
      userAnswer = userGuess.value;
      //correct answer
      if (userAnswer.toLowerCase() == answer.toLowerCase()) {
        playerOneScore = playerOneScore + playerOneBet;
        playerOneScoreDiv.textContent = `$${playerOneScore}`;
        userGuess.value = "";
        finalQuestionDiv.innerHTML = "";
        alert(
          `Congrats ${playerOne}! That was correct.\nYou finished with a score of ${playerOneScore}`
        );
        //incorrect answer
      } else {
        playerOneScore = playerOneScore - playerOneBet;
        playerOneScoreDiv.textContent = `$${playerOneScore}`;
        userGuess.value = "";
        finalQuestionDiv.innerHTML = "";
        alert(
          `Incorrect! The answer was ${answer}. You finished with a score of ${playerOneScore}`
        );
      }
    }

    //-------------------------logic for a two player round-------------------------
  } else if (numPlayers == 2) {
    if (whoseTurn == playerOne) {
      if (playerOneBetPlaced === false) {
        //protection against a score lower than zero
        if (playerOneScore < 0) {
          playerOneBet = 0;
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, your score is less than 0.\nSo, your bet is defaulted to 0.\n${playerTwo}'s turn to wager.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerOneBet = 0;
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, you wagered less than 0.\nSo, your bet is defaulted to 0.\n${playerTwo}'s turn to wager.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerOneScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerOne}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerOneBet = parseInt(userAmountWager.value);
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, you wager ${playerOneBet}\n${playerTwo}'s turn to wager.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          playerOneScore = playerOneScore + playerOneBet;
          //commented out to not give away if right or wrong
          //   playerOneScoreDiv.textContent = `$${playerOneScore}`;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerTwo;

          alert(`Now it is ${playerTwo}'s turn to guess.`);
          //incorrect answer
        } else {
          playerOneScore = playerOneScore - playerOneBet;
          //comment out to hide update
          //   playerOneScoreDiv.textContent = `$${playerOneScore}`;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(`Now it is ${playerTwo}'s turn to guess.`);
        }
      }

      //Player two logic
    } else {
      if (playerTwoBetPlaced === false) {
        //protection against a score lower than zero
        if (playerTwoScore < 0) {
          playerTwoBet = 0;
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerTwo}, your score is less than 0.\nSo, your bet is defaulted to 0.\nNow it is ${playerOne}'s time turn to answer.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerTwoBet = 0;
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerTwo}, you wagered less than 0.\nSo, your bet is defaulted to 0.\nNow it is ${playerOne}'s time turn to answer.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerTwoScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerTwo}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerTwoBet = parseInt(userAmountWager.value);
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerTwo}, you wager ${playerTwoBet}.\nNow it is ${playerOne}'s time turn to answer.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          //updating player two's score
          playerTwoScore = playerTwoScore + playerTwoBet;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
          userGuess.value = "";
          finalQuestionDiv.innerHTML = "";

          //logic to alert the correct winner
          if (playerOneScore > playerTwoScore) {
            alert(
              `The answer was ${answer}. ${playerOne} wins, with a score of ${playerOneScore}!!!`
            );
          } else if (playerOneScore < playerTwoScore) {
            alert(
              `The answer was ${answer}. ${playerTwo} wins, with a score of ${playerTwoScore}!!!`
            );
          } else {
            alert(
              `The answer was ${answer}. It was a tie, with a score of ${playerOneScore}!!!`
            );
          }

          //incorrect answer
        } else {
          //updating player two's score
          playerTwoScore = playerTwoScore - playerTwoBet;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
          userGuess.value = "";
          finalQuestionDiv.innerHTML = "";

          //logic to alert the correct winner
          if (playerOneScore > playerTwoScore) {
            alert(
              `The answer was ${answer}. ${playerOne} wins, with a score of ${playerOneScore}!!!`
            );
          } else if (playerOneScore < playerTwoScore) {
            alert(
              `The answer was ${answer}. ${playerTwo} wins, with a score of ${playerTwoScore}!!!`
            );
          } else {
            alert(
              `The answer was ${answer}. It was a tie, with a score of ${playerOneScore}!!!`
            );
          }
        }
      }
    }

    //--------------------------------logic for three player rounds--------------------
  } else if (numPlayers == 3) {
    if (whoseTurn == playerOne) {
      if (playerOneBetPlaced === false) {
        //protection against a score lower than zero
        if (playerOneScore < 0) {
          playerOneBet = 0;
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, your score is less than 0.\nSo, your bet is defaulted to 0.\n${playerTwo}'s turn to wager.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerOneBet = 0;
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, you wagered less than 0.\nSo, your bet is defaulted to 0.\n${playerTwo}'s turn to wager.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerOneScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerOne}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerOneBet = parseInt(userAmountWager.value);
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, you wager ${playerOneBet}\n${playerTwo}'s turn to wager.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          playerOneScore = playerOneScore + playerOneBet;
          //commented out to not give away if right or wrong
          //   playerOneScoreDiv.textContent = `$${playerOneScore}`;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerTwo;

          alert(`Now it is ${playerTwo}'s turn to guess.`);
          //incorrect answer
        } else {
          playerOneScore = playerOneScore - playerOneBet;
          //comment out to hide update
          //   playerOneScoreDiv.textContent = `$${playerOneScore}`;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(`Now it is ${playerTwo}'s turn to guess.`);
        }
      }

      //Player two logic
    } else if (whoseTurn == playerTwo) {
      if (playerTwoBetPlaced === false) {
        //protection against a score lower than zero
        if (playerTwoScore < 0) {
          playerTwoBet = 0;
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerThree;
          alert(
            `${playerTwo}, your score is less than 0.\nSo, your bet is defaulted to 0.\n${playerThree}'s turn to wager.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerTwoBet = 0;
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one

          betButton.disabled = true;
          whoseTurn = playerThree;
          alert(
            `${playerTwo}, you wagered less than 0.\nSo, your bet is defaulted to 0.\n${playerThree}'s turn to wager.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerTwoScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerTwo}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerTwoBet = parseInt(userAmountWager.value);
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerThree;
          alert(
            `${playerTwo}, you wager ${playerTwoBet}\n${playerThree}'s turn to wager.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          //updating player two's score
          playerTwoScore = playerTwoScore + playerTwoBet;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerThree;

          alert(`Now it is ${playerThree}'s turn to guess.`);

          //incorrect answer
        } else {
          //updating player two's score
          playerTwoScore = playerTwoScore - playerTwoBet;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerThree;

          alert(`Now it is ${playerThree}'s turn to guess.`);
        }
      }
      //player three logic
    } else {
      if (playerThreeBetPlaced === false) {
        //protection against a score lower than zero
        if (playerThreeScore < 0) {
          playerThreeBet = 0;
          playerThreeBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerThree}, your score is less than 0.\nSo, your bet is defaulted to 0.\nNow it is ${playerOne}'s time turn to answer.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerThreeBet = 0;
          playerThreeBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerThree}, you wagered less than 0.\nSo, your bet is defaulted to 0.\nNow it is ${playerOne}'s time turn to answer.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerThreeScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerThree}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerThreeBet = parseInt(userAmountWager.value);
          playerThreeBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerThree}, you wager ${playerThreeBet}.\nNow it is ${playerOne}'s time turn to answer.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          //updating player two's score
          playerThreeScore = playerThreeScore + playerThreeBet;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
          playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
          userGuess.value = "";
          finalQuestionDiv.innerHTML = "";

          //logic to alert the correct winner
          //finding the highest score value
          let winningScore = Math.max(
            playerOneScore,
            playerTwoScore,
            playerThreeScore
          );
          if (
            winningScore == playerOneScore &&
            winningScore != playerTwoScore &&
            winningScore != playerThreeScore
          ) {
            alert(
              `The answer was ${answer}. ${playerOne} wins, with a score of ${playerOneScore}!!!`
            );
          } else if (
            winningScore == playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerThreeScore
          ) {
            alert(
              `The answer was ${answer}. ${playerTwo} wins, with a score of ${playerTwoScore}!!!`
            );
          } else if (
            winningScore == playerThreeScore &&
            winningScore != playerTwoScore &&
            winningScore != playerOneScore
          ) {
            alert(
              `The answer was ${answer}. ${playerThree} wins, with a score of ${playerThreeScore}!!!`
            );
          } else {
            alert(
              `The answer was ${answer}. It was a tie, with a score of ${playerOneScore}!!!`
            );
          }

          //incorrect answer
        } else {
          //updating player two's score
          playerThreeScore = playerThreeScore - playerThreeBet;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
          playerThreeScoreDiv.textContent = `$${playerThreeScore}`;

          userGuess.value = "";
          finalQuestionDiv.innerHTML = "";

          //logic to alert the correct winner
          //finding the highest score value
          let winningScore = Math.max(
            playerOneScore,
            playerTwoScore,
            playerThreeScore
          );
          if (
            winningScore == playerOneScore &&
            winningScore != playerTwoScore &&
            winningScore != playerThreeScore
          ) {
            alert(
              `The answer was ${answer}. ${playerOne} wins, with a score of ${playerOneScore}!!!`
            );
          } else if (
            winningScore == playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerThreeScore
          ) {
            alert(
              `The answer was ${answer}. ${playerTwo} wins, with a score of ${playerTwoScore}!!!`
            );
          } else if (
            winningScore == playerThreeScore &&
            winningScore != playerTwoScore &&
            winningScore != playerOneScore
          ) {
            alert(
              `The answer was ${answer}. ${playerThree} wins, with a score of ${playerThreeScore}!!!`
            );
          } else {
            alert(
              `The answer was ${answer}. It was a tie, with a score of ${playerOneScore}!!!`
            );
          }
        }
      }
    }
    //-------------------------------logic for four player rounds---------------------
  } else {
    if (whoseTurn == playerOne) {
      if (playerOneBetPlaced === false) {
        //protection against a score lower than zero
        if (playerOneScore < 0) {
          playerOneBet = 0;
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, your score is less than 0.\nSo, your bet is defaulted to 0.\n${playerTwo}'s turn to wager.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerOneBet = 0;
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, you wagered less than 0.\nSo, your bet is defaulted to 0.\n${playerTwo}'s turn to wager.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerOneScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerOne}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerOneBet = parseInt(userAmountWager.value);
          playerOneBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player two
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(
            `${playerOne}, you wager ${playerOneBet}\n${playerTwo}'s turn to wager.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          playerOneScore = playerOneScore + playerOneBet;
          //commented out to not give away if right or wrong
          //   playerOneScoreDiv.textContent = `$${playerOneScore}`;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerTwo;

          alert(`Now it is ${playerTwo}'s turn to guess.`);
          //incorrect answer
        } else {
          playerOneScore = playerOneScore - playerOneBet;
          //comment out to hide update
          //   playerOneScoreDiv.textContent = `$${playerOneScore}`;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerTwo;
          alert(`Now it is ${playerTwo}'s turn to guess.`);
        }
      }

      //Player two logic
    } else if (whoseTurn == playerTwo) {
      if (playerTwoBetPlaced === false) {
        //protection against a score lower than zero
        if (playerTwoScore < 0) {
          playerTwoBet = 0;
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerThree;
          alert(
            `${playerTwo}, your score is less than 0.\nSo, your bet is defaulted to 0.\n${playerThree}'s turn to wager.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerTwoBet = 0;
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one

          betButton.disabled = true;
          whoseTurn = playerThree;
          alert(
            `${playerTwo}, you wagered less than 0.\nSo, your bet is defaulted to 0.\n${playerThree}'s turn to wager.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerTwoScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerTwo}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerTwoBet = parseInt(userAmountWager.value);
          playerTwoBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerThree;
          alert(
            `${playerTwo}, you wager ${playerTwoBet}\n${playerThree}'s turn to wager.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          //updating player two's score
          playerTwoScore = playerTwoScore + playerTwoBet;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerThree;

          alert(`Now it is ${playerThree}'s turn to guess.`);

          //incorrect answer
        } else {
          //updating player two's score
          playerTwoScore = playerTwoScore - playerTwoBet;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerThree;

          alert(`Now it is ${playerThree}'s turn to guess.`);
        }
      }
      //player three logic
    } else if (whoseTurn == playerThree) {
      if (playerThreeBetPlaced === false) {
        //protection against a score lower than zero
        if (playerThreeScore < 0) {
          playerThreeBet = 0;
          playerThreeBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerFour;
          alert(
            `${playerThree}, your score is less than 0.\nSo, your bet is defaulted to 0.\n${playerFour}'s turn to wager.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerThreeBet = 0;
          playerThreeBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerFour;
          alert(
            `${playerThree}, you wagered less than 0.\nSo, your bet is defaulted to 0.\n${playerFour}'s turn to wager.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerThreeScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerThree}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerThreeBet = parseInt(userAmountWager.value);
          playerThreeBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          betButton.disabled = true;
          whoseTurn = playerFour;
          alert(
            `${playerThree}, you wager ${playerThreeBet}\n${playerFour}'s turn to wager.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          //updating player two's score
          playerThreeScore = playerThreeScore + playerThreeBet;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerFour;

          alert(`Now it is ${playerFour}'s turn to guess.`);

          //incorrect answer
        } else {
          //updating player two's score
          playerThreeScore = playerThreeScore - playerThreeBet;
          userGuess.value = "";
          betButton.disabled = true;
          whoseTurn = playerFour;

          alert(`Now it is ${playerFour}'s turn to guess.`);
        }
      }
      //player four logic
    } else {
      if (playerFourBetPlaced === false) {
        //protection against a score lower than zero
        if (playerFourScore < 0) {
          playerFourBet = 0;
          playerFourBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerFour}, your score is less than 0.\nSo, your bet is defaulted to 0.\nNow it is ${playerOne}'s time turn to answer.`
          );
          //if wager is < 0
        } else if (parseInt(userAmountWager.value) < 0) {
          playerFourBet = 0;
          playerFourBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerFour}, you wagered less than 0.\nSo, your bet is defaulted to 0.\nNow it is ${playerOne}'s time turn to answer.`
          );
          //if the user wagers more than they have and checking NaN
        } else if (
          parseInt(userAmountWager.value) > playerFourScore ||
          isNaN(parseInt(userAmountWager.value)) === true
        ) {
          alert(`${playerFour}, wager a value lower than your score`);
          userAmountWager.value = "";
          //Wager is valid
        } else {
          playerFourBet = parseInt(userAmountWager.value);
          playerFourBetPlaced = true;
          userAmountWager.value = "";

          //setting the disables for guessing and passing back to player one
          userGuess.disabled = false;
          userAmountWager.disabled = true;
          betButton.disabled = true;
          finalQuestionDiv.innerHTML = question;
          whoseTurn = playerOne;
          alert(
            `${playerFour}, you wager ${playerFourBet}.\nNow it is ${playerOne}'s time turn to answer.`
          );
        }

        //Checking answer
      } else {
        userAnswer = userGuess.value;
        //correct answer
        if (userAnswer.toLowerCase() == answer.toLowerCase()) {
          //updating player two's score
          playerFourScore = playerFourScore + playerFourBet;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
          playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
          playerFourScoreDiv.textContent = `$${playerFourScore}`;
          userGuess.value = "";
          finalQuestionDiv.innerHTML = "";

          //logic to alert the correct winner
          //finding the highest score value
          let winningScore = Math.max(
            playerOneScore,
            playerTwoScore,
            playerThreeScore,
            playerFourScore
          );
          if (
            winningScore == playerOneScore &&
            winningScore != playerTwoScore &&
            winningScore != playerThreeScore &&
            winningScore != playerFourScore
          ) {
            alert(
              `The answer was ${answer}. ${playerOne} wins, with a score of ${playerOneScore}!!!`
            );
          } else if (
            winningScore == playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerThreeScore &&
            winningScore != playerFourScore
          ) {
            alert(
              `The answer was ${answer}. ${playerTwo} wins, with a score of ${playerTwoScore}!!!`
            );
          } else if (
            winningScore == playerThreeScore &&
            winningScore != playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerFourScore
          ) {
            alert(
              `The answer was ${answer}. ${playerThree} wins, with a score of ${playerThreeScore}!!!`
            );
          } else if (
            winningScore == playerFourScore &&
            winningScore != playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerThreeScore
          ) {
            alert(
              `The answer was ${answer}. ${playerFour} wins, with a score of ${playerFourScore}!!!`
            );
          } else {
            alert(
              `The answer was ${answer}. It was a tie, with a score of ${playerOneScore}!!!`
            );
          }

          //incorrect answer
        } else {
          //updating player two's score
          playerFourScore = playerFourScore - playerFourBet;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
          playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
          playerFourScoreDiv.textContent = `$${playerFourScore}`;

          userGuess.value = "";
          finalQuestionDiv.innerHTML = "";

          //logic to alert the correct winner
          //finding the highest score value
          let winningScore = Math.max(
            playerOneScore,
            playerTwoScore,
            playerThreeScore,
            playerFourScore
          );
          if (
            winningScore == playerOneScore &&
            winningScore != playerTwoScore &&
            winningScore != playerThreeScore &&
            winningScore != playerFourScore
          ) {
            alert(
              `The answer was ${answer}. ${playerOne} wins, with a score of ${playerOneScore}!!!`
            );
          } else if (
            winningScore == playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerThreeScore &&
            winningScore != playerFourScore
          ) {
            alert(
              `The answer was ${answer}. ${playerTwo} wins, with a score of ${playerTwoScore}!!!`
            );
          } else if (
            winningScore == playerThreeScore &&
            winningScore != playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerFourScore
          ) {
            alert(
              `The answer was ${answer}. ${playerThree} wins, with a score of ${playerThreeScore}!!!`
            );
          } else if (
            winningScore == playerFourScore &&
            winningScore != playerTwoScore &&
            winningScore != playerOneScore &&
            winningScore != playerThreeScore
          ) {
            alert(
              `The answer was ${answer}. ${playerFour} wins, with a score of ${playerFourScore}!!!`
            );
          } else {
            alert(
              `The answer was ${answer}. It was a tie, with a score of ${playerOneScore}!!!`
            );
          }
        }
      }
    }
  }
});
