"use strict";

let iMainScore = 0;
let iScoreDuringRoll = 0;
let bStay = false;
const aThreeKind = [];
let bOpeningPointsEntry = false; //one tike set only after you have 500 or more points to get on board
// let createLowerDiceBoard;
// let createHoldingBoard;
let iDiceHeldIndex = 0;
let iGetRandomDice;
let iNumberOfDice = 6;
const aTheDice = [];
const aTopDice = [];

// const rolled = document.querySelector(".rolled");
// const keep = document.querySelector(".keep");
const stayBtn = document.querySelector(".stay-btn");
const rollBtn = document.querySelector(".roll-btn");
const scoreKeeper = document.querySelector(".score");
const possibleScore = document.querySelector(".possible-score");
const zilchWindow = document.querySelector(".zilch");
const zBtn = document.querySelector(".zBtn");

//NOTE I think this is to add points to score after every roll??????????????????????????????????????????????????????
//I think aTopDice was for score keeping to prevent three separate 1's getting turned from 100 to 1000 etc...?????
function preRollCheck() {
  if (aTopDice.length > 0) {
    addingPoints(checkForPoints(aTopDice));
    aTopDice.length = 0;
  }
}
let index = 0; //FIXME this is just for debugging issues

function rollDice(dice) {
  preRollCheck();
  clearDataAttributes();
  aTheDice.length = 0; //resets the dice to blank
  //DEBUG ============================================================================
  if (index === 0) {
    aTheDice.push(5, 4, 4, 4, 5, 5);
    rolledDiceOnTheBoard[0].textContent = 5;
    rolledDiceOnTheBoard[1].textContent = 4;
    rolledDiceOnTheBoard[2].textContent = 4;
    rolledDiceOnTheBoard[3].textContent = 4;
    rolledDiceOnTheBoard[4].textContent = 5;
    rolledDiceOnTheBoard[5].textContent = 5;
  } else {
    //DEBUG================================================================================
    for (let i = 0; i < dice; i++) {
      iGetRandomDice = Math.floor(Math.random() * 6 + 1);
      aTheDice.push(iGetRandomDice);
      rolledDiceOnTheBoard[i].textContent = iGetRandomDice;
    }
  }
  index++; //TODO this is just for testing purposes
  // aTheDice.push(i + 1);
  //So far this is the points you see above the buttons
  let tempPoints = checkForPoints(aTheDice);
  possibleScore.textContent = tempPoints;

  if (tempPoints == 0 && iDiceHeldIndex != 6) {
    zilchPopup();
    diceReset();
    iScoreDuringRoll = 0;
    console.log("Zilch");
  }
}

//NOTE This is for after you click on a die to keep it will refresh the rolled dice and shift down if necessary
function adjustDiceOnBoard(dieNumber) {
  for (let i = 0; i < 6; i++) {
    rolledDiceOnTheBoard[i].textContent = "";
  }
  for (let i = 0; i < dieNumber; i++) {
    rolledDiceOnTheBoard[i].textContent = aTheDice[i];
  }
}
function addingPoints(tempScore) {
  iScoreDuringRoll += tempScore;

  if (iScoreDuringRoll >= 500 && bStay && iNumberOfDice != 0) {
    //FIXME add this to the gameManager()
    bOpeningPointsEntry = true;
  }
  if (bOpeningPointsEntry && bStay && iNumberOfDice != 0) {
    iMainScore += iScoreDuringRoll;
    scoreKeeper.textContent = iMainScore;
    iScoreDuringRoll = 0;
    diceReset();
  } else if (iNumberOfDice == 0) {
    diceReset(); //TODO tell player they have to roll all the dice but keep what points they have
    console.log("Roll the dice");
  }
}
//TODO switch to a forEach() loop of maybe a map();
function clearTop() {
  for (let i = 0; i < 6; i++) {
    addingDice[i].textContent = "";
  }
}
//TODO maybe the same here as for clearTop()
function clearBottom() {
  for (let i = 0; i < 6; i++) {
    rolledDiceOnTheBoard[i].textContent = "";
  }
}
function clearBoard() {
  clearTop();
  clearBottom();
}

function diceToKeep() {
  //FIXME do something in here to group the dice and move them up to top and add the points
  if (this.getAttribute("data") == "group") {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.getAttribute("data") === "group") {
        addingDice[iDiceHeldIndex].textContent = die.textContent;
        aTopDice.push(aTheDice.splice(aTheDice.indexOf(+die.textContent), 1));
        die.textContent = "";

        iNumberOfDice--;

        iDiceHeldIndex++;
      }
      // console.log(testings);
    });
  } else if (this.getAttribute("data") == "group2") {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.getAttribute("data") === "group2") {
        addingDice[iDiceHeldIndex].textContent = die.textContent;
        aTopDice.push(aTheDice.splice(aTheDice.indexOf(+die.textContent), 1));
        die.textContent = "";

        iNumberOfDice--;

        iDiceHeldIndex++;
      }
      // console.log(testings);
    });
  } else {
    addingDice[iDiceHeldIndex].textContent = this.textContent;
    aTopDice.push(aTheDice.splice(aTheDice.indexOf(+this.textContent), 1));
    this.textContent = "";

    iNumberOfDice--;

    iDiceHeldIndex++;
  }
}
function diceReset() {
  aTopDice.length = 0;
  aTheDice.length = 0;

  bStay = false;
  iDiceHeldIndex = 0;
  iNumberOfDice = 6;

  clearBoard();
}
//FIXME still have to check in case there is two sets three. I have to make two separate datasets to
//help prevent that. That is the plan so far.
//BUG need to clear this after I move it to the keep stack
function setDataAttribute(str) {
  if (str == "") {
    rolledDiceOnTheBoard.forEach((die) => die.setAttribute("data", "group"));
  } else if (str == "set") {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.textContent == aThreeKind[0]) die.setAttribute("data", "group");
      if (die.textContent == aThreeKind[1]) die.setAttribute("data", "group2");
    });
  } else {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.textContent == str) die.setAttribute("data", "group");
    });
  }
}
function clearDataAttributes() {
  rolledDiceOnTheBoard.forEach((die) => die.removeAttribute("disabled"));
  rolledDiceOnTheBoard.forEach((die) => die.removeAttribute("data"));
}
function checkForStraight(diceScoreTest) {
  //NOTE diceScoreTest is an array that added each die and put that die in its proper array.as in
  //all ones rolled are in [0] while all 2's are in [1] etc.
  //The diceScoreTest[0] = 0 and diceScoreTest[4] = 0 is making sure the 1 and 5 are counted
  //separate since they are already being used elsewhere for points. prevents double dipping
  if (diceScoreTest.every((die) => die == 1)) {
    diceScoreTest.length = 0;
    setDataAttribute("");
    return 1500;
  }

  return 0;
}
function checkForSixOfaKind(diceScoreTest) {
  if (diceScoreTest.some((die) => die == 6)) {
    if (diceScoreTest[0] == 6) {
      diceScoreTest[0] = 0;
    } else if (diceScoreTest[4] == 6) {
      diceScoreTest[4] == 0;
    }
    diceScoreTest.length = 0; //FIXME testing if this works to keep from double dipping
    setDataAttribute("");
    return 4000;
  }
  return 0;
}
function checkForFiveOfaKind(diceScoreTest) {
  if (diceScoreTest[0] == 5) {
    diceScoreTest[0] = 0; //FIXME testing if this I can after check disable any buttons still left
    setDataAttribute("1");
    return 4000;
  } else if (diceScoreTest[1] == 5) {
    diceScoreTest[1] = 0;
    setDataAttribute("2");
    return 1000;
  } else if (diceScoreTest[2] == 5) {
    diceScoreTest[2] = 0;
    setDataAttribute("3");
    return 1500;
  } else if (diceScoreTest[3] == 5) {
    diceScoreTest[3] = 0;
    setDataAttribute("4");
    return 2000;
  } else if (diceScoreTest[4] == 5) {
    diceScoreTest[4] = 0;
    setDataAttribute("5");
    return 2500;
  } else if (diceScoreTest[5] == 5) {
    diceScoreTest[5] = 0;
    setDataAttribute("6");
    return 3000;
  }

  return 0;
}
function checkForFourOfaKind(diceScoreTest) {
  if (diceScoreTest[0] == 4) {
    diceScoreTest[0] = 0;
    setDataAttribute("1");
    return 3000;
  } else if (diceScoreTest[1] == 4) {
    diceScoreTest[1] = 0;
    setDataAttribute("2");
    return 800;
  } else if (diceScoreTest[2] == 4) {
    diceScoreTest[2] = 0;
    setDataAttribute("3");
    return 1200;
  } else if (diceScoreTest[3] == 4) {
    diceScoreTest[3] = 0;
    setDataAttribute("4");
    return 1600;
  } else if (diceScoreTest[4] == 4) {
    diceScoreTest[4] = 0;
    setDataAttribute("5");
    return 2000;
  } else if (diceScoreTest[5] == 4) {
    diceScoreTest[5] = 0;
    setDataAttribute("6");
    return 2400;
  }
  return 0;
}
//NOTE this one was a little more tricky for setting a data-group attribute since you can have 2 three of a kinds
//and you for some reason may only want to pick one
function checkForThreeOfaKind(diceScoreTest) {
  let temp = 0; //may have two sets of three
  if (diceScoreTest[0] == 3) {
    diceScoreTest[0] = 0;
    aThreeKind.push(1);
    temp += 1000;
  }
  if (diceScoreTest[1] == 3) {
    diceScoreTest[1] = 0;
    aThreeKind.push(2);
    temp += 200;
  }
  if (diceScoreTest[2] == 3) {
    diceScoreTest[2] = 0;
    aThreeKind.push(3);
    temp += 300;
  }
  if (diceScoreTest[3] == 3) {
    diceScoreTest[3] = 0;
    aThreeKind.push(4);
    temp += 400;
  }
  if (diceScoreTest[4] == 3) {
    diceScoreTest[4] = 0;
    aThreeKind.push(5);
    temp += 500;
  }
  if (diceScoreTest[5] == 3) {
    diceScoreTest[5] = 0;
    aThreeKind.push(6);
    temp += 600;
  }
  if (aThreeKind.length == 2) {
    setDataAttribute("set");
  }
  aThreeKind.length = 0;
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
      diceScoreTest.length = 0;
      setDataAttribute("");
      return 1500;
    }
  }
  //BUG I still need to add disable if no three sets
  return 0;
}

function checkForOnesFives(diceScoreTest) {
  let temp = 0;

  if (diceScoreTest[1] > 0) {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.textContent == 2) {
        die.setAttribute("disabled", "disabled");
      }
    });
  }
  if (diceScoreTest[2] > 0) {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.textContent == 3) {
        die.setAttribute("disabled", "disabled");
      }
    });
  }
  if (diceScoreTest[3] > 0) {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.textContent == 4) {
        die.setAttribute("disabled", "disabled");
      }
    });
  }
  if (diceScoreTest[5] > 0) {
    rolledDiceOnTheBoard.forEach((die) => {
      if (die.textContent == 6) {
        die.setAttribute("disabled", "disabled");
      }
    });
  }

  if (diceScoreTest[0] >= 1) {
    temp += diceScoreTest[0] * 100;
    rolledDiceOnTheBoard.forEach((die) => {
      console.log(die);
      if (die.textContent == 1) die.setAttribute("data", "one");
    }); //FIXME testing
  }
  if (diceScoreTest[4] >= 1) {
    temp += diceScoreTest[4] * 50;
  }
  return temp;
}

function checkForPoints(dice) {
  const diceScoreTest = [0, 0, 0, 0, 0, 0];
  // setDataAttribute();
  let points = 0;
  //TODO switch to either forEach or map maybe
  for (let i = 0; i < dice.length; i++) {
    if (dice[i] == 1) {
      diceScoreTest[0]++;
    } else if (dice[i] == 2) {
      diceScoreTest[1]++;
    } else if (dice[i] == 3) {
      diceScoreTest[2]++;
    } else if (dice[i] == 4) {
      diceScoreTest[3]++;
    } else if (dice[i] == 5) {
      diceScoreTest[4]++;
    } else if (dice[i] == 6) {
      diceScoreTest[5]++;
    }
  }

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
  bStay = true; //TODO maybe do the dice number check here
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

const rolledDiceOnTheBoard = document.querySelectorAll(".rolled-dice");
const addingDice = document.querySelectorAll(".kept");

rolledDiceOnTheBoard.forEach((die) =>
  die.addEventListener("click", diceToKeep)
);

stayBtn.addEventListener("click", () => {
  stayingBtnHit();
});
rollBtn.addEventListener("click", () => {
  adjustDiceOnBoard(iNumberOfDice);
  rollDice(iNumberOfDice);
});
zBtn.addEventListener("click", closeZilchPopup);

//problems to resolve
//1 keep score ------better but still bugged

//issues

//------------------------NOTES--------------------------------------------

//I haven't set a win yet. use css for that too
//definitely need to make the board prettier

//-------------------More Notes----------------------------------------

//I have cleaned it up more but still having some issues
//I'm getting zilch when I have all the dice on the upper rack
//I haven't got it quite right on how to continue rolling and keeping the points
//maybe somehow check if I have points to tell computer its not a zilch
//I was able to get rid of some more variables by passing arguments and returning
//If I understood classes better I know it would clean this up tremendously
