// animate button for 100ms after mouse release
function animateButton(activeButton) {
  $(activeButton).addClass("btn-clicked");
  setTimeout(function () {
    $(activeButton).removeClass("btn-clicked");
  }, 100);
}

// add sound effect
function makeSound(activeButton) {

}



// Detecting button click
$(".btn").click( function() {
  animateButton(this);
  makeSound(this);
});
