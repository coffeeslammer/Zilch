"use strict";

let mainScore = 0;
let scoreDuringRoll = 0;
let stay = false;
let openingPointsEntry = false; //one tike set only after you have 500 or more points to get on board
let createLowerDiceBoard;
let createHoldingBoard;
let diceHeldIndex = 0;
let numberOfDice = 6;
let getRandomDice;
const theDice = [];
const topDice = [];

const rolled = document.querySelector(".rolled");
const keep = document.querySelector(".keep");
const stayBtn = document.getElementById("stay-btn");
const rollBtn = document.getElementById("roll-btn");
const scoreKeeper = document.getElementById("score");
const possibleScore = document.getElementById("possible-score");
const zilchWindow = document.getElementById("zilch");
const zBtn = document.getElementById("zBtn");

function settingUpTheBoard() {
  for (let i = 0; i < 6; i++) {
    createHoldingBoard = document.createElement("div");
    createHoldingBoard.classList.add("kept");
    keep.append(createHoldingBoard);
    createLowerDiceBoard = document.createElement("div");
    createLowerDiceBoard.classList.add("rolled-dice");
    rolled.append(createLowerDiceBoard);
  }
}
function preRollCheck() {
  if (topDice.length > 0) {
    addingPoints(checkForPoints(topDice));
    topDice.length = 0;
  }
}
function rollDice(numDice) {
  preRollCheck();

  theDice.length = 0;
  for (let i = 0; i < numDice; i++) {
    getRandomDice = Math.floor(Math.random() * 6 + 1);
    theDice.push(getRandomDice);
    rolledDiceOnTheBoard[i].textContent = getRandomDice;
  }

  let tempPoints = checkForPoints(theDice);
  possibleScore.textContent = tempPoints;

  if (tempPoints == 0 && diceHeldIndex != 6) {
    zilchPopup();
    diceReset();
    scoreDuringRoll = 0;
    console.log("Zilch");
  }
}
//This is for after you click on a die to keep it will refresh the rolled dice and shift down if necessary
function adjustDiceOnBoard(dieNumber) {
  for (let i = 0; i < 6; i++) {
    rolledDiceOnTheBoard[i].textContent = "";
  }
  for (let i = 0; i < dieNumber; i++) {
    rolledDiceOnTheBoard[i].textContent = theDice[i];
  }
}
function addingPoints(tempScore) {
  scoreDuringRoll += tempScore;

  if (scoreDuringRoll >= 500 && stay && numberOfDice != 0) {
    openingPointsEntry = true;
  }
  if (openingPointsEntry && stay && numberOfDice != 0) {
    mainScore += scoreDuringRoll;
    scoreKeeper.textContent = mainScore;
    scoreDuringRoll = 0;
    diceReset();
  } else if (numberOfDice == 0) {
    diceReset(); //TODO tell player they have to roll all the dice but keep what points they have
    console.log("Roll the dice");
  }
}
function clearTop() {
  for (let i = 0; i < 6; i++) {
    addingDice[i].textContent = "";
  }
}
function clearBottom() {
  for (let i = 0; i < 6; i++) {
    rolledDiceOnTheBoard[i].textContent = "";
  }
}
function clearBoard() {
  clearTop();
  clearBottom();
}
//BUG right now I can put anything up top
function diceToKeep(e) {
  addingDice[diceHeldIndex].textContent = e.target.textContent;
  topDice.push(
    theDice.splice(Array.from(rolledDiceOnTheBoard).indexOf(e.target), 1)
  );
  numberOfDice--;
  adjustDiceOnBoard(numberOfDice);
  diceHeldIndex++;
}
function diceReset() {
  topDice.length = 0;
  theDice.length = 0;

  stay = false;
  diceHeldIndex = 0;
  numberOfDice = 6;

  clearBoard();
}
function checkForStraight(diceScoreTest) {
  if (
    diceScoreTest[0] == 1 &&
    diceScoreTest[1] == 1 &&
    diceScoreTest[2] == 1 &&
    diceScoreTest[3] == 1 &&
    diceScoreTest[4] == 1 &&
    diceScoreTest[5] == 1
  ) {
    return 1500;
  }
  return 0;
}
function checkForSixOfaKind(diceScoreTest) {
  if (
    diceScoreTest[0] == 6 ||
    diceScoreTest[1] == 6 ||
    diceScoreTest[2] == 6 ||
    diceScoreTest[3] == 6 ||
    diceScoreTest[4] == 6 ||
    diceScoreTest[5] == 6
  ) {
    if (diceScoreTest[0] == 6) {
      diceScoreTest[0] = 0;
    } else if (diceScoreTest[4] == 6) {
      diceScoreTest[4] == 0;
    }
    return 4000;
  }
  return 0;
}
function checkForFiveOfaKind(diceScoreTest) {
  if (diceScoreTest[0] == 5) {
    diceScoreTest[0] = 0;
    return 4000;
  } else if (diceScoreTest[1] == 5) {
    return 1000;
  } else if (diceScoreTest[2] == 5) {
    return 1500;
  } else if (diceScoreTest[3] == 5) {
    return 2000;
  } else if (diceScoreTest[4] == 5) {
    diceScoreTest[4] = 0;
    return 2500;
  } else if (diceScoreTest[5] == 5) {
    return 3000;
  }

  return 0;
}
function checkForFourOfaKind(diceScoreTest) {
  if (diceScoreTest[0] == 4) {
    diceScoreTest[0] = 0;
    return 3000;
  } else if (diceScoreTest[1] == 4) {
    return 800;
  } else if (diceScoreTest[2] == 4) {
    return 1200;
  } else if (diceScoreTest[3] == 4) {
    return 1600;
  } else if (diceScoreTest[4] == 4) {
    diceScoreTest[4] = 0;
    return 2000;
  } else if (diceScoreTest[5] == 4) {
    return 2400;
  }
  return 0;
}
function checkForThreeOfaKind(diceScoreTest) {
  let temp = 0; //may have two sets of three
  if (diceScoreTest[0] == 3) {
    diceScoreTest[0] = 0;
    temp += 1000;
  }
  if (diceScoreTest[1] == 3) {
    temp += 200;
  }
  if (diceScoreTest[2] == 3) {
    temp += 300;
  }
  if (diceScoreTest[3] == 3) {
    temp += 400;
  }
  if (diceScoreTest[4] == 3) {
    diceScoreTest[4] = 0;
    temp += 500;
  }
  if (diceScoreTest[5] == 3) {
    temp += 600;
  }
  return temp;
}
function checkForSetsOfTwo(diceScoreTest) {
  if (
    diceScoreTest[0] == 2 ||
    diceScoreTest[1] == 2 ||
    diceScoreTest[2] == 2 ||
    diceScoreTest[3] == 2 ||
    diceScoreTest[4] == 2 ||
    diceScoreTest[5] == 2
  ) {
    let temp = 0;
    if (diceScoreTest[0] == 2) {
      temp += 1;
    }
    if (diceScoreTest[1] == 2) {
      temp += 1;
    }
    if (diceScoreTest[2] == 2) {
      temp += 1;
    }
    if (diceScoreTest[3] == 2) {
      temp += 1;
    }
    if (diceScoreTest[4] == 2) {
      temp += 1;
    }
    if (diceScoreTest[5] == 2) {
      temp += 1;
    }
    if (temp == 3) {
      if (diceScoreTest[0] == 2) {
        diceScoreTest[0] = 0;
      }
      if (diceScoreTest[4] == 2) {
        diceScoreTest[4] = 0;
      }
      return 1500;
    }
  }
  return 0;
}

function checkForOnesFives(diceScoreTest) {
  let temp = 0;
  if (diceScoreTest[0] >= 1) {
    temp += diceScoreTest[0] * 100;
  }
  if (diceScoreTest[4] >= 1) {
    temp += diceScoreTest[4] * 50;
  }
  return temp;
}

function checkForPoints(dice) {
  const diceScoreTest = [];
  let howManyOnes = 0;
  let howManyTwos = 0;
  let howManyThrees = 0;
  let howManyFours = 0;
  let howManyFives = 0;
  let howManySixes = 0;
  let points = 0;

  for (let i = 0; i < dice.length; i++) {
    if (dice[i] == 1) {
      howManyOnes++;
    } else if (dice[i] == 2) {
      howManyTwos++;
    } else if (dice[i] == 3) {
      howManyThrees++;
    } else if (dice[i] == 4) {
      howManyFours++;
    } else if (dice[i] == 5) {
      howManyFives++;
    } else if (dice[i] == 6) {
      howManySixes++;
    }
  }
  diceScoreTest.push(
    howManyOnes,
    howManyTwos,
    howManyThrees,
    howManyFours,
    howManyFives,
    howManySixes
  );
  console.log(diceScoreTest); //TODO remove after testing
  points += checkForStraight(diceScoreTest);
  points += checkForSixOfaKind(diceScoreTest);
  points += checkForFiveOfaKind(diceScoreTest);
  points += checkForFourOfaKind(diceScoreTest);
  points += checkForThreeOfaKind(diceScoreTest);
  points += checkForSetsOfTwo(diceScoreTest);
  points += checkForOnesFives(diceScoreTest);

  return points;
}
function stayingBtnHit() {
  stay = true; //TODO maybe do the dice number check here
  preRollCheck();
}
function zilchPopup() {
  zilchWindow.style.visibility = "visible";
}
function closeZilchPopup() {
  console.log("here");
  zilchWindow.style.visibility = "hidden";
}
//-------------------------------------------starting line----------------------------

settingUpTheBoard();

const rolledDiceOnTheBoard = document.querySelectorAll(".rolled-dice");
const addingDice = document.querySelectorAll(".kept");

rolledDiceOnTheBoard.forEach((die) =>
  die.addEventListener("click", diceToKeep)
);

stayBtn.addEventListener("click", () => {
  stayingBtnHit();
});
rollBtn.addEventListener("click", () => {
  rollDice(numberOfDice);
});
zBtn.addEventListener("click", closeZilchPopup);

//problems to resolve
//1 keep score ------better but still bugged

//issues

//------------------------NOTES--------------------------------------------

//I haven't set a win yet. use css for that too
//definitely need to make the board prettier
//need a break from this one. been on it for a few days fixing bug after bug
//need a new project to try different ideas out

//-------------------More Notes----------------------------------------

//I have cleaned it up more but still having some issues
//I'm getting zilch when I have all the dice on the upper rack
//I haven't got it quite right on how to continue rolling and keeping the points
//maybe somehow check if I have points to tell computer its not a zilch
//I was able to get rid of some more variables by passing arguments and returning
//If I understood classes better I know it would clean this up tremendously