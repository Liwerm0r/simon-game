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
  console.log("clicked-button: " + $(clickedButton).text());
  console.log("global-key-press: " + globalKeyPress);
  console.log("current-button-sequence: " + $(buttonSequence).text());
  if ( buttonSequence[globalKeyPress] === clickedButton ) {
    globalKeyPress++;
    if ( globalKeyPress === buttonSequence.length) {
      appendButtonAndAnimateAfterDelay();
      globalKeyPress = 0;
    }
  } else {
    // if user choose wrong button then wipe globalKeyPress history and buttonSequence
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
    $(randomButton).fadeOut(300).fadeIn(300);
    makeSound(randomButton);
  }, 800);
  // set title - display current level of the game
  $(".title").text(`level ${globalKeyPress + 1}`);
}

// game over
function gameOver() {
  audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $(".title").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  // disable buttons interaction
  $(".btn").off("click");
  // enable keydown listener for game restart
  initialize();
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

function initialize() {
  $(document).keydown(() => {
    // make buttons fade out and fade in after appending to the list
    globalKeyPress = 0;
    buttonSequence = [];
    makeButtonsInteractive();
    appendButtonAndAnimateAfterDelay();
    // after initilize detach keydown listener
    $(document).off("keydown");
  });
}
////////////////////////////////////
///////////   SCRIPT   /////////////
////////////////////////////////////

initialize();
var globalKeyPress = 0;
var buttonSequence = [];
