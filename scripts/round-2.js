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
let guessButton = document.getElementById("guessResponse");
let passButton = document.getElementById("passResponse");
let userInput = document.getElementById("answer");
let timerCountdown = document.getElementById("roundTimeLeft");
let clickableQuestions = document.getElementById("jeopardyBoard");
let boardEmptyCheck = Array.from(
  document.getElementsByClassName("jeopardyBox")
);
let clickedValueCat1 = Array.from(
  document.getElementsByClassName("jeopardyBox cat1")
);
let clickedValueCat2 = Array.from(
  document.getElementsByClassName("jeopardyBox cat2")
);
let clickedValueCat3 = Array.from(
  document.getElementsByClassName("jeopardyBox cat3")
);
let clickedValueCat4 = Array.from(
  document.getElementsByClassName("jeopardyBox cat4")
);
let clickedValueCat5 = Array.from(
  document.getElementsByClassName("jeopardyBox cat5")
);
let clickedValueCat6 = Array.from(
  document.getElementsByClassName("jeopardyBox cat6")
);


//setting global variables
//taking fragment and using it to find names and number of players
let frag = window.location.hash.substr(1);
let numPlayersField = frag.split("=");
let numPlayers = parseInt(numPlayersField[1].toString().split("&")[0]);
let nameField;
let scoreField;

//declaring variables used for player names
let playerOne;
let playerTwo;
let playerThree;
let playerFour;
let nameArray = [];

//declaring player score variables
let scoreArray = [];
let playerOneScore = 0;
let playerTwoScore = 0;
let playerThreeScore = 0;
let playerFourScore = 0;

//declaring round timer and whose turn variables
let roundTimeTotal = 300;
let whoseTurn;

//declaring global variables for questions and answers
let fill;
let valueClicked;
let answer;
let userAnswer;

//global variables for guess and pass logic
let guessed = false;
let passed = false;

//global variables for guess timers
let guessTimerTotal = 10;
let intervalIdGuess;

//-------------------------------JSON FETCH SECTION---------------------------------
//fetching the musical and theatre json and setting the global corrected variable to store data from the fetch
let jsonMusicalCorrected;
fetch("/JSON/musicals-theatres.json")
  .then((res) => res.json())
  .then((jsonMusical) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    //setting the corrected (randomized) array
    jsonMusicalCorrected = shuffle(jsonMusical);
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonMusicalCorrected;
  });

//fetching the mythology json and setting the global corrected variable to store data from the fetch
let jsonMythologyCorrected;
fetch("/JSON/mythology.json")
  .then((res) => res.json())
  .then((jsonMythology) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    jsonMythologyCorrected = shuffle(jsonMythology);
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonMythologyCorrected;
  });

//fetching the science and nature json and setting the global corrected variable to store data from the fetch
let jsonScienceCorrected;
fetch("/JSON/science-nature.json")
  .then((res) => res.json())
  .then((jsonScience) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    jsonScienceCorrected = shuffle(jsonScience);
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonScienceCorrected;
  });

//fetching the sports json and setting the global corrected variable to store data from the fetch
let jsonSportsCorrected;
fetch("/JSON/sports.json")
  .then((res) => res.json())
  .then((jsonSports) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    jsonSportsCorrected = shuffle(jsonSports);
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonSportsCorrected;
  });

//fetching the television json and setting the global corrected variable to store data from the fetch
let jsonTelevisionCorrected;
fetch("/JSON/television.json")
  .then((res) => res.json())
  .then((jsonTelevision) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    jsonTelevisionCorrected = shuffle(jsonTelevision);
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonTelevisionCorrected;
  });

//fetching the video games json and setting the global corrected variable to store data from the fetch
let jsonVideoGamesCorrected;
fetch("/JSON/video-games.json")
  .then((res) => res.json())
  .then((jsonVideoGames) => {
    //utilizing a Fisher-Yates Shuffle to randomize the order of the objects in the json array
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    jsonVideoGamesCorrected = shuffle(jsonVideoGames);
    //NOTE: returning from JSON fetch is difficult, but will be available shortly after page load (ie in event listener)
    return jsonVideoGamesCorrected;
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
  //disabling the guess and pass buttons upon page load
  guessButton.disabled = true;
  passButton.disabled = true;

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
  alert(`${playerOne} it is your turn!\nSelect a question to start.`);

  //starting the round timer
  roundTimer(roundTimeTotal);
});

//----------------------------GUESS, PASS, & QUESTION EVENTS------------------

//creating a guess event listener
guessButton.addEventListener("click", (evt) => {
  //setting the users answer equal to the value in the input field
  userAnswer = userInput.value;
  //CORRECT answer
  if (userAnswer.toLowerCase() == answer.toLowerCase()) {
    if (whoseTurn == playerOne) {
      playerOneScore = playerOneScore + valueClicked;
      playerOneScoreDiv.textContent = `$${playerOneScore}`;
    } else if (whoseTurn == playerTwo) {
      playerTwoScore = playerTwoScore + valueClicked;
      playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
    } else if (whoseTurn == playerThree) {
      playerThreeScore = playerThreeScore + valueClicked;
      playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
    } else {
      playerFourScore = playerFourScore + valueClicked;
      playerFourScoreDiv.textContent = `$${playerFourScore}`;
    }

    //resetting input field and clearing the div
    fill.textContent = "";
    userInput.value = "";
    //re-disabling the guess and pass button
    guessButton.disabled = true;
    passButton.disabled = true;
    //re-enabling the divs
    clickableQuestions.style.pointerEvents = "auto";
    alert("Correct! Pick another question.");

    //resetting guess timer
    clearInterval(intervalIdGuess);
    guessTimerTotal = 10;

    //INCORRECT answer
  } else {
    //INCORRECT answer with 1 player
    if (numPlayers == 1) {
      playerOneScore = playerOneScore - valueClicked;
      playerOneScoreDiv.textContent = `$${playerOneScore}`;

      //resetting input field and clearing the div
      fill.textContent = "";
      userInput.value = "";
      //re-disabling the guess and pass button
      guessButton.disabled = true;
      passButton.disabled = true;
      //re-enabling the divs
      clickableQuestions.style.pointerEvents = "auto";
      whoseTurn = playerOne;

      //resetting guess timer
      clearInterval(intervalIdGuess);
      guessTimerTotal = 10;
      alert(`Wrong! The answer was ${answer}.\nPick a new question`);

      //INCORRECT answer for FIRST guess
    } else if (guessed === false) {
      //Updating the scores for an incorrect guess
      if (whoseTurn == playerOne) {
        playerOneScore = playerOneScore - valueClicked;
        playerOneScoreDiv.textContent = `$${playerOneScore}`;
      } else if (whoseTurn == playerTwo) {
        playerTwoScore = playerTwoScore - valueClicked;
        playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
      } else if (whoseTurn == playerThree) {
        playerThreeScore = playerThreeScore - valueClicked;
        playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
      } else {
        playerFourScore = playerFourScore - valueClicked;
        playerFourScoreDiv.textContent = `$${playerFourScore}`;
      }

      //changing the turn to the next player
      if (numPlayers == 1) {
        if (whoseTurn == playerOne) {
          whoseTurn = playerOne;
        }
      } else if (numPlayers == 2) {
        if (whoseTurn == playerOne) {
          whoseTurn = playerTwo;
        } else {
          whoseTurn = playerOne;
        }
      } else if (numPlayers == 3) {
        if (whoseTurn == playerOne) {
          whoseTurn = playerTwo;
        } else if (whoseTurn == playerTwo) {
          whoseTurn = playerThree;
        } else {
          whoseTurn = playerOne;
        }
      } else {
        if (whoseTurn == playerOne) {
          whoseTurn = playerTwo;
        } else if (whoseTurn == playerTwo) {
          whoseTurn = playerThree;
        } else if (whoseTurn == playerThree) {
          whoseTurn = playerFour;
        } else {
          whoseTurn = playerOne;
        }
      }
      guessed = true;

      //resetting guess timer
      clearInterval(intervalIdGuess);
      guessTimerTotal = 10;
      alert(`Wrong!\nNow it is ${whoseTurn}'s turn to guess.`);
      guessTimer(guessTimerTotal);

      //INCORRECT guess if there has already been a guess
    } else {
      //updating the player score whose turn it currently is
      if (whoseTurn == playerOne) {
        playerOneScore = playerOneScore - valueClicked;
        playerOneScoreDiv.textContent = `$${playerOneScore}`;
      } else if (whoseTurn == playerTwo) {
        playerTwoScore = playerTwoScore - valueClicked;
        playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
      } else if (whoseTurn == playerThree) {
        playerThreeScore = playerThreeScore - valueClicked;
        playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
      } else {
        playerFourScore = playerFourScore - valueClicked;
        playerFourScoreDiv.textContent = `$${playerFourScore}`;
      }

      //resetting input field and clearing div
      fill.textContent = "";
      userInput.value = "";
      //re-disabling the guess and pass button
      guessButton.disabled = true;
      passButton.disabled = true;
      //re-enabling the divs
      clickableQuestions.style.pointerEvents = "auto";

      //changing whose turn it is
      if (numPlayers == 1) {
        if (whoseTurn == playerOne) {
          whoseTurn = playerOne;
        }
      } else if (numPlayers == 2) {
        if (whoseTurn == playerOne) {
          whoseTurn = playerTwo;
        } else {
          whoseTurn = playerOne;
        }
      } else if (numPlayers == 3) {
        if (whoseTurn == playerOne) {
          whoseTurn = playerTwo;
        } else if (whoseTurn == playerTwo) {
          whoseTurn = playerThree;
        } else {
          whoseTurn = playerOne;
        }
      } else {
        if (whoseTurn == playerOne) {
          whoseTurn = playerTwo;
        } else if (whoseTurn == playerTwo) {
          whoseTurn = playerThree;
        } else if (whoseTurn == playerThree) {
          whoseTurn = playerFour;
        } else {
          whoseTurn = playerOne;
        }
      }
      guessed = false;

      //resetting guess timer
      clearInterval(intervalIdGuess);
      guessTimerTotal = 10;
      alert(`Wrong! The answer was ${answer}.\nNow it is ${whoseTurn}'s turn.`);
    }
  }

  //check if all divs are empty function
  function isEmpty(element, index, array) {
    return element.innerHTML == "";
  }
  //logic to check if the divs are all empty and send the game to round 2 with appropriate hash
  if (boardEmptyCheck.every(isEmpty) === true) {
    alert(`All questions answered, moving to next round`);
    if (numPlayers == 1) {
      scoreArray = [`${playerOneScore}`];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray}`;
    } else if (numPlayers == 2) {
      scoreArray = [`${playerOneScore}`, `${playerTwoScore}`];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    } else if (numPlayers == 3) {
      scoreArray = [
        `${playerOneScore}`,
        `${playerTwoScore}`,
        `${playerThreeScore}`,
      ];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    } else {
      scoreArray = [
        `${playerOneScore}`,
        `${playerTwoScore}`,
        `${playerThreeScore}`,
        `${playerFourScore}`,
      ];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    }
  }
});

//creating a pass button event listener
passButton.addEventListener("click", (evt) => {
  //PASS for 1 player
  if (numPlayers == 1) {
    fill.textContent = "";
    userInput.value = "";
    guessButton.disabled = true;
    passButton.disabled = true;
    clickableQuestions.style.pointerEvents = "auto";

    //resetting guess timer
    clearInterval(intervalIdGuess);
    guessTimerTotal = 10;
    alert(`Select a new question.\nIt is still ${whoseTurn}'s turn.`);

    //PASS but a guess has already been made
  } else if (guessed === true) {
    fill.textContent = "";
    userInput.value = "";
    guessButton.disabled = true;
    passButton.disabled = true;
    clickableQuestions.style.pointerEvents = "auto";

    guessed = false;

    //resetting guess timer
    clearInterval(intervalIdGuess);
    guessTimerTotal = 10;
    alert(`Select a new question.\nIt is still ${whoseTurn}'s turn.`);

    //PASS first time pass
  } else if (passed === false) {
      //setting whose turn after pass
    if (numPlayers == 1) {
      if (whoseTurn == playerOne) {
        whoseTurn = playerOne;
      }
    } else if (numPlayers == 2) {
      if (whoseTurn == playerOne) {
        whoseTurn = playerTwo;
      } else {
        whoseTurn = playerOne;
      }
    } else if (numPlayers == 3) {
      if (whoseTurn == playerOne) {
        whoseTurn = playerTwo;
      } else if (whoseTurn == playerTwo) {
        whoseTurn = playerThree;
      } else {
        whoseTurn = playerOne;
      }
    } else {
      if (whoseTurn == playerOne) {
        whoseTurn = playerTwo;
      } else if (whoseTurn == playerTwo) {
        whoseTurn = playerThree;
      } else if (whoseTurn == playerThree) {
        whoseTurn = playerFour;
      } else {
        whoseTurn = playerOne;
      }
    }
    passed = true;

    //resetting guess timer
    clearInterval(intervalIdGuess);
    guessTimerTotal = 10;
    alert(`The question is passed to ${whoseTurn}`);
    guessTimer(guessTimerTotal);

    //PASS second time passed
  } else {
    fill.textContent = "";
    userInput.value = "";
    guessButton.disabled = true;
    passButton.disabled = true;
    passed = false;
    clickableQuestions.style.pointerEvents = "auto";

    //resetting guess timer
    clearInterval(intervalIdGuess);
    guessTimerTotal = 10;
    alert(`Select a new question.\nIt is still ${whoseTurn}'s turn.`);
  }

  //check if all divs are empty
  function isEmpty(element, index, array) {
    return element.innerHTML == "";
  }
  //check if all divs are empty and sending to second round with correct hash
  if (boardEmptyCheck.every(isEmpty) === true) {
    alert(`All questions answered, moving to next round`);
    if (numPlayers == 1) {
      scoreArray = [`${playerOneScore}`];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray}`;
    } else if (numPlayers == 2) {
      scoreArray = [`${playerOneScore}`, `${playerTwoScore}`];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    } else if (numPlayers == 3) {
      scoreArray = [
        `${playerOneScore}`,
        `${playerTwoScore}`,
        `${playerThreeScore}`,
      ];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    } else {
      scoreArray = [
        `${playerOneScore}`,
        `${playerTwoScore}`,
        `${playerThreeScore}`,
        `${playerFourScore}`,
      ];
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    }
  }
});

//----------------------------------EVENT LISTENERS FOR THE BOARD-----------------------

//creating an event listener for category one
clickedValueCat1.forEach((element, key) => {
  element.addEventListener("click", (evt) => {
    let clickedField = element.id;

    //getting the value of the clicked field for updating scores later
    valueClicked = parseInt(element.textContent.replace("$", ""));

    //id of the div
    fill = document.getElementById(clickedField);

    //setting the question and answer for each of the keys to be used in guess listener
    let question = jsonMusicalCorrected[key].question;
    answer = jsonMusicalCorrected[key].correct_answer;

    //console logs of question and answer to aid in testing
    console.log(question);
    console.log(answer);

    //updating div to display question and resizing the font to ensure fit
    fill.innerHTML = question;
    fill.style.fontSize = "1.5vw";

    //re-enabling the guess and pass button
    guessButton.disabled = false;
    passButton.disabled = false;

    //setting the element to no longer be clickable
    element.style.pointerEvents = "none";
    clickableQuestions.style.pointerEvents = "none";

    //starting the guess timer
    guessTimer(guessTimerTotal);
  });
});

clickedValueCat2.forEach((element, key) => {
  element.addEventListener("click", (evt) => {
    let clickedField = element.id;
    valueClicked = parseInt(element.textContent.replace("$", ""));
    fill = document.getElementById(clickedField);
    let question = jsonMythologyCorrected[key].question;
    answer = jsonMythologyCorrected[key].correct_answer;

    console.log(question);
    console.log(answer);
    fill.innerHTML = question;
    fill.style.fontSize = "1.5vw";

    guessButton.disabled = false;
    passButton.disabled = false;

    element.style.pointerEvents = "none";
    clickableQuestions.style.pointerEvents = "none";
    guessTimer(guessTimerTotal);
  });
});

clickedValueCat3.forEach((element, key) => {
  element.addEventListener("click", (evt) => {
    let clickedField = element.id;
    valueClicked = parseInt(element.textContent.replace("$", ""));
    fill = document.getElementById(clickedField);
    let question = jsonScienceCorrected[key].question;
    answer = jsonScienceCorrected[key].correct_answer;

    console.log(question);
    console.log(answer);
    fill.innerHTML = question;
    fill.style.fontSize = "1.5vw";

    guessButton.disabled = false;
    passButton.disabled = false;

    element.style.pointerEvents = "none";
    clickableQuestions.style.pointerEvents = "none";
    guessTimer(guessTimerTotal);
  });
});

clickedValueCat4.forEach((element, key) => {
  element.addEventListener("click", (evt) => {
    let clickedField = element.id;
    valueClicked = parseInt(element.textContent.replace("$", ""));
    fill = document.getElementById(clickedField);
    let question = jsonSportsCorrected[key].question;
    answer = jsonSportsCorrected[key].correct_answer;

    console.log(question);
    console.log(answer);
    fill.innerHTML = question;
    fill.style.fontSize = "1.5vw";

    guessButton.disabled = false;
    passButton.disabled = false;

    element.style.pointerEvents = "none";
    clickableQuestions.style.pointerEvents = "none";
    guessTimer(guessTimerTotal);
  });
});

clickedValueCat5.forEach((element, key) => {
  element.addEventListener("click", (evt) => {
    let clickedField = element.id;
    valueClicked = parseInt(element.textContent.replace("$", ""));
    fill = document.getElementById(clickedField);
    let question = jsonTelevisionCorrected[key].question;
    answer = jsonTelevisionCorrected[key].correct_answer;

    console.log(question);
    console.log(answer);
    fill.innerHTML = question;
    fill.style.fontSize = "1.5vw";

    guessButton.disabled = false;
    passButton.disabled = false;

    element.style.pointerEvents = "none";
    clickableQuestions.style.pointerEvents = "none";
    guessTimer(guessTimerTotal);
  });
});

clickedValueCat6.forEach((element, key) => {
  element.addEventListener("click", (evt) => {
    let clickedField = element.id;
    valueClicked = parseInt(element.textContent.replace("$", ""));
    fill = document.getElementById(clickedField);
    let question = jsonVideoGamesCorrected[key].question;
    answer = jsonVideoGamesCorrected[key].correct_answer;

    console.log(question);
    console.log(answer);
    fill.innerHTML = question;
    fill.style.fontSize = "1.5vw";

    guessButton.disabled = false;
    passButton.disabled = false;

    element.style.pointerEvents = "none";
    clickableQuestions.style.pointerEvents = "none";
    guessTimer(guessTimerTotal);
  });
});

//-------------------------------------TIMER FUNCTIONS-----------------------------

//creating the guess timer function
function guessTimer(guessTimerTotal) {
  intervalIdGuess = setInterval(tick, 1000);
  function tick() {
    if (guessTimerTotal <= 0) {
      //using same logic as in the guess INCORRECT sections to update scores, turn, etc.
      if (numPlayers == 1) {
        playerOneScore = playerOneScore - valueClicked;
        playerOneScoreDiv.textContent = `$${playerOneScore}`;

        fill.textContent = "";
        userInput.value = "";
        guessButton.disabled = true;
        passButton.disabled = true;
        clickableQuestions.style.pointerEvents = "auto";
        whoseTurn = playerOne;
        alert(`Times Up! The answer was ${answer}.\nPick a new question`);
        //person chose question times out, had to add passed
      } else if (guessed === false && passed === false) {
        if (whoseTurn == playerOne) {
          playerOneScore = playerOneScore - valueClicked;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
        } else if (whoseTurn == playerTwo) {
          playerTwoScore = playerTwoScore - valueClicked;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
        } else if (whoseTurn == playerThree) {
          playerThreeScore = playerThreeScore - valueClicked;
          playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
        } else {
          playerFourScore = playerFourScore - valueClicked;
          playerFourScoreDiv.textContent = `$${playerFourScore}`;
        }

        if (numPlayers == 1) {
          if (whoseTurn == playerOne) {
            whoseTurn = playerOne;
          }
        } else if (numPlayers == 2) {
          if (whoseTurn == playerOne) {
            whoseTurn = playerTwo;
          } else {
            whoseTurn = playerOne;
          }
        } else if (numPlayers == 3) {
          if (whoseTurn == playerOne) {
            whoseTurn = playerTwo;
          } else if (whoseTurn == playerTwo) {
            whoseTurn = playerThree;
          } else {
            whoseTurn = playerOne;
          }
        } else {
          if (whoseTurn == playerOne) {
            whoseTurn = playerTwo;
          } else if (whoseTurn == playerTwo) {
            whoseTurn = playerThree;
          } else if (whoseTurn == playerThree) {
            whoseTurn = playerFour;
          } else {
            whoseTurn = playerOne;
          }
        }
        guessed = true;
        clearInterval(intervalIdGuess);
        guessTimerTotal = 10;
        alert(`Times Up!\nNow it is ${whoseTurn}'s turn to guess.`);
        //NOTE: The timer total is resetting to 10 above, but it does not re-call this function. so the timer does not restart, giving the player unlimited time after another player runs out the guess timer.
        guessTimer(guessTimerTotal);
      } else {
        if (whoseTurn == playerOne) {
          playerOneScore = playerOneScore - valueClicked;
          playerOneScoreDiv.textContent = `$${playerOneScore}`;
        } else if (whoseTurn == playerTwo) {
          playerTwoScore = playerTwoScore - valueClicked;
          playerTwoScoreDiv.textContent = `$${playerTwoScore}`;
        } else if (whoseTurn == playerThree) {
          playerThreeScore = playerThreeScore - valueClicked;
          playerThreeScoreDiv.textContent = `$${playerThreeScore}`;
        } else {
          playerFourScore = playerFourScore - valueClicked;
          playerFourScoreDiv.textContent = `$${playerFourScore}`;
        }

        fill.textContent = "";
        userInput.value = "";
        guessButton.disabled = true;
        passButton.disabled = true;
        clickableQuestions.style.pointerEvents = "auto";

        if (numPlayers == 1) {
          if (whoseTurn == playerOne) {
            whoseTurn = playerOne;
          }
        } else if (numPlayers == 2) {
          if (whoseTurn == playerOne) {
            whoseTurn = playerTwo;
          } else {
            whoseTurn = playerOne;
          }
        } else if (numPlayers == 3) {
          if (whoseTurn == playerOne) {
            whoseTurn = playerTwo;
          } else if (whoseTurn == playerTwo) {
            whoseTurn = playerThree;
          } else {
            whoseTurn = playerOne;
          }
        } else {
          if (whoseTurn == playerOne) {
            whoseTurn = playerTwo;
          } else if (whoseTurn == playerTwo) {
            whoseTurn = playerThree;
          } else if (whoseTurn == playerThree) {
            whoseTurn = playerFour;
          } else {
            whoseTurn = playerOne;
          }
        }
        guessed = false;
        passed = false;
        clearInterval(intervalIdGuess);
        guessTimerTotal = 10;
        alert(
          `Times Up! The answer was ${answer}.\nNow it is ${whoseTurn}'s turn.`
        );
      }

      //clearing the interval and resetting the timer
      clearInterval(intervalIdGuess);
      guessTimerTotal = 10;

      //incrementing and console logging the timer
    } else {
      guessTimerTotal = guessTimerTotal - 1;
      console.log(guessTimerTotal);
    }
  }
}

//creating a round timer function using set interval
function roundTimer(roundTimeTotal) {
  let intervalId = setInterval(tick, 1000);
  function tick() {
    //creating new variables for minutes and seconds
    minutes = Math.floor(roundTimeTotal / 60);
    seconds = roundTimeTotal % 60;
    //if statement to add left padded zeros to single digit values
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    //updating div with timer in it with the current time left
    timerCountdown.textContent =
      "Round Time Left: " + minutes + " : " + seconds;

    //if statement for when count hits zero
    if (roundTimeTotal <= 0) {
      timerCountdown.textContent = "Times Up!";
      clearInterval(intervalId);
      alert("Round time is up! Moving to next round.");
      //Updating the scores array to pass into the next round
      if (numPlayers == 1) {
        scoreArray = [`${playerOneScore}`];
      } else if (numPlayers == 2) {
        scoreArray = [`${playerOneScore}`, `${playerTwoScore}`];
      } else if (numPlayers == 3) {
        scoreArray = [
          `${playerOneScore}`,
          `${playerTwoScore}`,
          `${playerThreeScore}`,
        ];
      } else {
        scoreArray = [
          `${playerOneScore}`,
          `${playerTwoScore}`,
          `${playerThreeScore}`,
          `${playerFourScore}`,
        ];
      }
      //loading the next page with a fragment for the num players, names, and scores
      window.location.href = `final-jeopardy.html#numPlayers=${numPlayers}&names=${nameArray.join(
        "+"
      )}&scores=${scoreArray.join("^")}`;
    }
    //incrementing round time
    roundTimeTotal = roundTimeTotal - 1;
  }
}