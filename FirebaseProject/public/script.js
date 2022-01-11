//Holds all of the codes for the colors, in the order of green,blue, yellow, red
normalColors = ['008000', '008CBA', 'ffcc00', 'f44336'];
//Holds all of the lighter version of colors in the same order, changes to these when clicked
lightColors = ['#67da67', '#63d6fd', '#ffeea8', '#fd9d96', '008000', '008CBA', 'ffcc00', 'f44336'];
buttons = ["greenButton", "blueButton", "yellowButton", "redButton"];
currentSequence = [];
currentSequenceIndex = 0; //index of list of sequences. Also represents number of buttons part of chain
playerMoves = [];
playerMovesIndex = 0; //index for player moves. Also represents number of playermoves made
gameIsRunning = false;
waitTime = currentSequence * 100;

//GAME CONTROL
function beginGame() {
  gameIsRunning = true;
  document.getElementById("mainTitle").innerHTML = "Game Starting weeee";
  currentSequence = [];
  currentSequenceIndex = 0;
  playerMoves = [];
  playerMovesIndex = 0;
  randomNum = parseInt(Math.random() * 4);

  setTimeout(() => {
    console.log("waiting: " + waitTime + "s");
    makeMove(randomNum);
  }, waitTime);

  //  currentSequence[currentSequenceIndex] = randomNum;
  playerMoves = [];
  playerMovesIndex = 0;
}


function sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

//Displays current sequence
// async function repeatSequence() {
//   currentSequenceIndex = currentSequence.length;
//   console.log("insideRepeatSequence, currentSequenceIndex =" + currentSequenceIndex);
//   if (currentSequenceIndex != 0) {
//     for (let i = 0; i < currentSequenceIndex; i++) {
//       await sleep(2000);
//       changeToLightColor(currentSequence[i])
//       console.log("changing color: " + currentSequence[i]);
//     }
//   }
// }


function delay(value) {
  for(i = 0; i < (10000*value); i++) {
      console.log("x");
  }
}

//Changes color of button of buttonIndex

function makeMove(colorIndex) {
  //repeatSequence();

  setTimeout(() => {
    changeToLightColor(colorIndex);
    console.log("Color Changed");
    currentSequence.push(colorIndex);
  }, 200);


  console.log("current sequence is now being updated");
  console.log("current sequence at the index of" + currentSequenceIndex + " is " + currentSequence)
  playerMoves = [];
  playerMovesIndex = 0;

}

function isMoveCorrect() {
  for (i = 0; i < playerMoves.length; i++) {
    if (playerMoves[i] != currentSequence[i]) {
      return false;
    }
  }
  return true;
}
//Checks whether player sequence of moves matches the computer sequence
//Current bugs
// system doesn't wait long enough for player to input answre before checking if wrong/starting new seqeuence
//following sequence doesn't include the entire sequence, only represents the new value added
function checkSeq() {
  console.log("playerMoves:");
  console.log(playerMoves);
  console.log("currentSequence:" + currentSequence);
  playerMovesIndex = playerMoves.length;
  currentSequenceIndex = currentSequence.length;

  if (playerMovesIndex < currentSequenceIndex && isMoveCorrect()) {
    console.log("game is not done.");
    return;
  }

  if (gameIsRunning == true) {
    isSequenceMatching = playerMoves.toString() === currentSequence.toString()

    if (!isSequenceMatching) {
      console.log("Bruh");
      document.getElementById("mainTitle").innerHTML = "You lost. Play again!";
      gameIsRunning = false;
    }
  }

  //does next move

  console.log("playerMovesIndex: " + playerMovesIndex);
  console.log("currentSequenceIndex: " + currentSequenceIndex);
  if (playerMovesIndex == currentSequenceIndex) {
    if (gameIsRunning == true) {
      randomNum = parseInt(Math.random() * 4);
      console.log(randomNum);
      document.getElementById("scores").innerHTML = "Current Score:" + (currentSequenceIndex);
      setTimeout(() => {
        makeMove(randomNum);
      }, currentSequenceIndex * 100);
    }
  }
  cheat();
}

function cheat() {
  colorMap = new Map([
    [0, "Green"],
    [1, "Blue"],
    [2, "Yellow"],
    [3, "Red"]
  ]);
  cheatArray = [];
  for( i = 0; i < currentSequence.length; i++) {
    cheatArray.push(colorMap.get(currentSequence[i]));
  }
  console.log("cheat: " + cheatArray);
}

//BUTTON COLOR CONTROL
function changeToLightColor(colorIndex) {
  if (gameIsRunning) {
    document.getElementById(buttons[colorIndex]).style.backgroundColor = lightColors[colorIndex];
    setTimeout(() => {
      revertColor(colorIndex);
    }, 190);
  }
}

function revertColor(colorIndex) {
  document.getElementById(buttons[colorIndex]).style.backgroundColor = normalColors[colorIndex];
}

document.getElementById("startButton").addEventListener("click", function() {
  beginGame();
});




document.getElementById("greenButton").addEventListener("click", function() {
  changeToLightColor(0);
  playerMoves.push(0);
  console.log("playerMovesIndex: " + playerMovesIndex);
  console.log("currentSequenceIndex: " + currentSequenceIndex);

  checkSeq();


});

document.getElementById("blueButton").addEventListener("click", function() {
  changeToLightColor(1);
  playerMoves.push(1);
  //  if(playerMovesIndex==currentSequenceIndex){
  checkSeq();
  //  }

  console.log(playerMoves);
});

document.getElementById("yellowButton").addEventListener("click", function() {
  changeToLightColor(2);
  playerMoves.push(2);
  //  if(playerMovesIndex==currentSequenceIndex){
  checkSeq();
  //  }

  console.log(playerMoves);
});

document.getElementById("redButton").addEventListener("click", function() {
  changeToLightColor(3);
  playerMoves.push(3);
  //  if(playerMovesIndex==currentSequenceIndex){
  checkSeq();
  //    }

  console.log(playerMoves);
});
