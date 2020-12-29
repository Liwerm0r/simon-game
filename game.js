//////////////////////////////////////////////
///////////   HELPER FUNCTIONS   /////////////
//////////////////////////////////////////////

// animate button for 100ms after mouse release
function animateButton(activeButton) {
  $(activeButton).addClass("btn-clicked");
  setTimeout(function() {
    $(activeButton).removeClass("btn-clicked");
  }, 100);
}

// add sound effect
function makeSound(activeButton) {
  var audioFileName = `${$(activeButton).text()}.mp3`;
  audio = new Audio(`sounds/${audioFileName}`);
  audio.play();
}

// Detecting button click
function makeButtonsInteractive() {
  $(".btn").click(function() {
    makeSound(this);
    animateButton(this);
    checkSequence(this);
  });
}

function checkSequence(clickedButton) {

  if ( buttonSequence[globalKeyPress] === clickedButton ) {
    globalKeyPress++;
    if ( globalKeyPress === buttonSequence.length) {
      console.log("append new button");
      appendButtonAndAnimateAfterDelay();
      globalKeyPress = 0;
    }
  } else {
    // wipe globalKeyPress history and buttonSequence
    globalKeyPress = 0;
    buttonSequence = [];
    gameOver();
  }
}

function appendButtonAndAnimateAfterDelay() {
  var randomButton = generateRandomButton();
  buttonSequence.push(randomButton);
  // show and let hear to the user which element was picked
  setTimeout(function () {
    animateButton(randomButton);
    makeSound(randomButton);
  }, 1000);
}

// game over
function gameOver() {
  audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").css("background-color", "white");
}

// generate random button
function generateRandomButton() {
  // create available buttons list
  var availableButtons = $(".btn");
  // pick a random butom from the collection
  var randomButton = availableButtons[Math.floor(Math.random() * availableButtons.length)];
  // return appended sequence
  return randomButton;
}

////////////////////////////////////
///////////   SCRIPT   /////////////
////////////////////////////////////

// initialize game after any button press
$(document).keydown(() => {
  $(".title").text("Play");
  makeButtonsInteractive();
  appendButtonAndAnimateAfterDelay();
});

var globalKeyPress = 0;
var buttonSequence = [];
var checkedSequence = false;
