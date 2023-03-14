"use strict";
//check the points of the dice that were kept

//if all the dice are rolled reroll them all
//know when to stop and set the score to keep
let mainScore = 0;
let scoreDuringRoll = 0;
//use this to show what the lower board has and a way to check for zilch
let stay = false; //stay button flag
let openingPointsEntry = false; //one tike set only after you have 500 or more points to get on board
let clickFlag = false; //testing to use this to tell program I have chose dice to keep
let createLowerDiceBoard;
let removeDiceIndex;
let createHoldingBoard;
let diceHeldIndex = 0;
let topIndex = 0; //not in use
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
    // checkForPoints(topDice);
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
  // checkForPoints(theDice); //TODO decide the best place to put this
  let tempPoints = checkForPoints(theDice);
  possibleScore.textContent = tempPoints;
  if (tempPoints == 0 && topDice.length != 6) {
    diceReset(); //TODO we need to set up a way to tell the player they lost their points
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

function diceToKeep(e) {
  addingDice[diceHeldIndex].textContent = e.target.textContent;
  removeDiceIndex = Array.from(rolledDiceOnTheBoard).indexOf(e.target);
  topDice.push(theDice.splice(removeDiceIndex, 1));
  numberOfDice--;
  adjustDiceOnBoard(numberOfDice); //FIXME make a way to wait till the next roll to call this
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
function checkForStraight(diceScoreTest, tScore) {
  if (
    diceScoreTest[0] == 1 &&
    diceScoreTest[1] == 1 &&
    diceScoreTest[2] == 1 &&
    diceScoreTest[3] == 1 &&
    diceScoreTest[4] == 1 &&
    diceScoreTest[5] == 1
  ) {
    return (tScore += 1500);
  }
  return 0;
}
function checkForSixOfaKind(diceScoreTest, tScore) {
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
    return (tScore += 4000);
  }
  return 0;
}
function checkForFiveOfaKind(diceScoreTest, tScore) {
  if (diceScoreTest[0] == 5) {
    tScore += 3000;
    diceScoreTest[0] = 0;
  } else if (diceScoreTest[1] == 5) {
    tScore += 2 * 100 * 3;
  } else if (diceScoreTest[2] == 5) {
    tScore += 3 * 100 * 3;
  } else if (diceScoreTest[3] == 5) {
    tScore += 4 * 100 * 3;
  } else if (diceScoreTest[4] == 5) {
    tScore += 5 * 100 * 3;
    die5.length = 0;
  } else if (diceScoreTest[5] == 5) {
    tScore += 6 * 100 * 3;
  }
  if (tScore == NaN) {
    return 0;
  }
  return tScore;
}
function checkForFourOfaKind(diceScoreTest, tScore) {
  //TODO the four could be sets of three but I will leave it for now
  if (diceScoreTest[0] == 4) {
    tScore += 2000;
    diceScoreTest[0] = 0;
  } else if (diceScoreTest[1] == 4) {
    tScore += 2 * 100 * 2;
  } else if (diceScoreTest[2] == 4) {
    tScore += 3 * 100 * 2;
  } else if (diceScoreTest[3] == 4) {
    tScore += 4 * 100 * 2;
  } else if (diceScoreTest[4] == 4) {
    tScore += 5 * 100 * 2;
    diceScoreTest[4] = 0;
  } else if (diceScoreTest[5] == 4) {
    tScore += 6 * 100 * 2;
  }
  if (tScore == NaN) {
    return 0;
  }
  return tScore;
}
function checkForThreeOfaKind(diceScoreTest, tScore) {
  if (diceScoreTest[0] == 3) {
    tScore += 1000;
    diceScoreTest[0] = 0;
  }
  if (diceScoreTest[1] == 3) {
    tScore += 2 * 100;
  }
  if (diceScoreTest[2] == 3) {
    tScore += 3 * 100;
  }
  if (diceScoreTest[3] == 3) {
    tScore += 4 * 100;
  }
  if (diceScoreTest[4] == 3) {
    tScore += 5 * 100;
    diceScoreTest[4] = 0;
  }
  if (diceScoreTest[5] == 3) {
    tScore += 6 * 100;
  }
  if (tScore == NaN) {
    return 0;
  }
  return tScore;
}
function checkForSetsOfTwo(diceScoreTest, tScore) {
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
      return (tScore += 1500);
    }
  }
  return 0;
}

function checkForOnesFives(diceScoreTest, tScore) {
  if (diceScoreTest[0] >= 1) {
    tScore += diceScoreTest[0] * 100;
  }
  if (diceScoreTest[4] >= 1) {
    tScore += diceScoreTest[4] * 50;
  }
  if (tScore == NaN) {
    return 0;
  }
  return tScore;
}

function checkForPoints(dice) {
  const diceScoreTest = [];
  let potentialScore = 0;
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
  console.log(diceScoreTest);
  points += checkForStraight(diceScoreTest, potentialScore);
  points += checkForSixOfaKind(diceScoreTest, potentialScore);
  points += checkForFiveOfaKind(diceScoreTest, potentialScore);
  points += checkForFourOfaKind(diceScoreTest, potentialScore);
  points += checkForThreeOfaKind(diceScoreTest, potentialScore);
  points += checkForSetsOfTwo(diceScoreTest, potentialScore);
  points += checkForOnesFives(diceScoreTest, potentialScore);
  // scoreCheckReset(diceScoreTest);
  return points;
}
function stayingBtnHit() {
  stay = true; //TODO maybe do the dice number check here
  preRollCheck();
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
}); //TODO add points up to score when clicked
rollBtn.addEventListener("click", () => {
  rollDice(numberOfDice);
});

//problems to resolve
//1 keep score ------better but still bugged
//2 check if any points on roll board to see if there is a Zilch or not----need to notify if zilch
//add dice to upper board then check the points to add to main-----think I got this
//3 if the lower board is empty reset the dice to start a new roll while keeping record of points for the round --done maybe
//4 where and how to reset----think I got this one

//issues

//Maybe I need to make a different function to evaluate what to do before rolling
//right now rolling is doing all that when all it should do is roll the dice.
//maybe have a flag for when I click on the dice to tell the program its ok to now check upper score

//------------------------NOTES--------------------------------------------
//I still have bugs. Crazy I got 6 of a kind in a roll but didn't get the points
//I think it might have been on how I clicked. I clicked the same die to add to the top since it was
//easier to do that instead of click each one. That is one theory but haven't tested to see
//I need to add some css for when I zilch it will popup and tell the player they lost their points
//I haven't set a win yet. use css for that too
//definitely need to make the board prettier
//need a break from this one. been on it for a few days fixing bug after bug
//need a new project to try different ideas out
