var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var Level = 0;
var started = false;

var numberOfButtons = $(".drum").length;

$(document).keypress(function (event) {
  if (!started) {
    $("#level-title").text("Level " + Level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animateButton(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  Level += 1;

  $("#level-title").text("Level " + Level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
function animateButton(currentButton) {
  var userChosenColour = $("#" + currentButton);

  userChosenColour.addClass("pressed");

  setTimeout(function () {
    userChosenColour.removeClass("pressed");
  }, 100);
}
function playSound(currentButton) {
  var audio = new Audio("sounds/" + currentButton + ".mp3");
  audio.play();
}
function startOver() {
  Level = 0;
  gamePattern = [];
  started = false;
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
