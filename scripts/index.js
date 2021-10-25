//DOM Elements
let startGame = document.getElementById("startGame");

//Global variables
let numPlayers;
let nameArray;

//creating event listener on click of the start button
startGame.addEventListener("click", (evt) => {
  //calling function to get number of players and their names
  userPrompt();
  //alert to welcome the players
  alert(`Welcome ${nameArray.join(" & ")}`);
  //directing to round 1 url with fragments for the number of players and the names
  window.location.href = `round-1.html#numPlayers=${numPlayers}&names=${nameArray.join(
    "+"
  )}`;
});

//function to get the number of players and their names
function userPrompt() {
  let namePlayers;
  //do while loop to prompt the user for number of players, only 1-4 is allowed due to the while loop
  do {
    //prompt parseint'ed to turn string into number
    numPlayers = parseInt(prompt("How many players? (1-4)"));
  } while (
    numPlayers !== 1 &&
    numPlayers !== 2 &&
    numPlayers !== 3 &&
    numPlayers !== 4
  );
  //do while loop to prompt user for names, only accepts single word names separated by spaces that array.length matches the number of players
  do {
    namePlayers = prompt(
      "What are your names?\nNote: single name only, separated by a space."
    );
    //creating an array from the string
    nameArray = namePlayers.trim().split(" ");
  } while (nameArray.length !== numPlayers);
}
