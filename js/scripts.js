//Business Logic
function Board() {
  this.coordinates = [];
}

Board.prototype.populateBoard = function(square) {
  this.coordinates.push(square);
}

Board.prototype.checkWin = function() {
  if (this.coordinates.includes("a1") && this.coordinates.includes("a2") && this.coordinates.includes("a3")) return true;
  if (this.coordinates.includes("b1") && this.coordinates.includes("b2") && this.coordinates.includes("b3")) return true;
  if (this.coordinates.includes("c1") && this.coordinates.includes("c2") && this.coordinates.includes("c3")) return true;
  if (this.coordinates.includes("a1") && this.coordinates.includes("b1") && this.coordinates.includes("c1")) return true;
  if (this.coordinates.includes("a2") && this.coordinates.includes("b2") && this.coordinates.includes("c2")) return true;
  if (this.coordinates.includes("a3") && this.coordinates.includes("b3") && this.coordinates.includes("c3")) return true;
  if (this.coordinates.includes("a1") && this.coordinates.includes("b2") && this.coordinates.includes("c3")) return true;
  if (this.coordinates.includes("a3") && this.coordinates.includes("b2") && this.coordinates.includes("c1")) return true;
  else return false;
}

Board.prototype.isLegal = function(mark) {
  if (mark === "X" || mark === "O") return false;
  else return true;
}

Board.prototype.play = function(square) {
  $("#" + square).text("X");
  this.coordinates.push(square);
}

Board.prototype.whatsAvailable = function() {
  var possibilities = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  this.coordinates.forEach(function(coordinate) {
    for (x=0; x<possibilities.length; x++) {
      if (coordinate === possibilities[x]) possibilities.splice(x, 1);
    }
  });
  return possibilities;
}

function computerPlay(openSpots) {
  var randomNumber = Math.floor(Math.random() * Math.floor(openSpots.length))
  return openSpots[randomNumber];
}

function endGame(phrase) {
  $(".result").show();
  $("div").off("click")
  $(".winner").text(phrase)
  $(".comments").hide();
}

function hideButton() {
  $("#orderAndDifficulty").hide();
}

function computerFirstMoveHard(openSpots) {
  if (openSpots.includes("b2")) return "b2";
  else if (openSpots.length === 8) {
    var corners = ["a1", "a3", "c1", "c3"];
    var randomNumber = Math.floor(Math.random() * Math.floor(4))
    return corners[randomNumber];
  } else return computerPlay(openSpots);
}

function squareMove(one, two, three, decision, attackOrBlock) {
  if ($("#" + one).html() === attackOrBlock && $("#" + two).html() === attackOrBlock && $("#" + three).html() === "") return three;
  if ($("#" + two).html() === attackOrBlock && $("#" + three).html() === attackOrBlock && $("#" + one).html() === "") return one;
  if ($("#" + one).html() === attackOrBlock && $("#" + three).html() === attackOrBlock && $("#" + two).html() === "") return two;
  else return decision
}

function computerMove(decision, XOrO) {
  decision = squareMove("a1", "a2", "a3", decision, XOrO);
  decision = squareMove("b1", "b2", "b3", decision, XOrO);
  decision = squareMove("c1", "c2", "c3", decision, XOrO);
  decision = squareMove("a1", "b1", "c1", decision, XOrO);
  decision = squareMove("a2", "b2", "c2", decision, XOrO);
  decision = squareMove("a3", "b3", "c3", decision, XOrO);
  decision = squareMove("a1", "b2", "c3", decision, XOrO);
  decision = squareMove("a3", "b2", "c1", decision, XOrO);
  return decision;
}
//UI Logic
$(document).ready(function() {
  $("#orderAndDifficulty").submit(function(event){
    var order = $(".theOrder:checked").val();
    var difficulty = $(".theDifficulty:checked").val();
    if (order && difficulty) {
      hideButton();
      $(".game").show();
    }
    var game = new Board();
    var playerMoves = new Board();
    var computerMoves = new Board();
    event.preventDefault();
    var phrase = "Sorry, this spot is taken";
    if (order === "first" && difficulty === "easy") {
      $(".space").click(function() {
        var currentMark = $(this).html();
        var currentSquare = $(this).attr("id");
        var legality = game.isLegal(currentMark);
        if (legality === true) {
          $(".comments").text("")
          playerMoves.populateBoard(currentSquare);
          game.play(currentSquare);
          if (playerMoves.checkWin()) endGame("This was just a random number generator, so don\'t feel good about yourself. Try normal mode next!")
          else {
            var openSpots = game.whatsAvailable();
            var decision = computerPlay(openSpots);
            $("#" + decision).text("O");
            game.populateBoard(decision);
            computerMoves.populateBoard(decision);
            if (computerMoves.checkWin()) endGame("You lost to a random number generator, good job!")
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0) endGame("Cat's Game! Why is it even called that??")
        }
        else $(".comments").text(phrase)
      });
    }
    else if (order === "second" && difficulty === "easy") {
      var openSpots = game.whatsAvailable();
      var decision = computerPlay(openSpots);
      $("#" + decision).text("O");
      game.populateBoard(decision);
      computerMoves.populateBoard(decision);
      $(".space").click(function() {
        var currentMark = $(this).html();
        var currentSquare = $(this).attr("id");
        var legality = game.isLegal(currentMark);
        if (legality === true) {
          $(".comments").text("")
          playerMoves.populateBoard(currentSquare);
          game.play(currentSquare);
          if (playerMoves.checkWin()) endGame("This was just a random number generator, so don\'t feel good about yourself. Try normal mode next!")
          else {
            var openSpots = game.whatsAvailable();
            var decision = computerPlay(openSpots);
            $("#" + decision).text("O");
            game.populateBoard(decision);
            computerMoves.populateBoard(decision);
            if (computerMoves.checkWin()) endGame("You lost to a random number generator, good job!")
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0) endGame("Cat's Game! Why is it even called that??")
        }
        else $(".comments").text(phrase)
      });
    }
    else if (order === "first" && difficulty === "normal") {
      $(".space").click(function() {
        var currentMark = $(this).html();
        var currentSquare = $(this).attr("id");
        var legality = game.isLegal(currentMark);
        if (legality === true) {
          $(".comments").text("")
          playerMoves.populateBoard(currentSquare);
          game.play(currentSquare);
          if (playerMoves.checkWin()) endGame("Good job! Try hard mode next!")
          else {
            var openSpots = game.whatsAvailable();
            var decision = computerFirstMoveHard(openSpots);
            decision = computerMove(decision, "X");
            $("#" + decision).text("O");
            game.populateBoard(decision);
            computerMoves.populateBoard(decision);
            if (computerMoves.checkWin()) endGame("Oh crap, you lost to the computer!")
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0) endGame("Cat's Game! Why is it even called that??")
        }
        else $(".comments").text(phrase)
      })
    }
    else if (order === "second" && difficulty === "normal") {
      var openSpots = game.whatsAvailable();
      var decision = "b2";
      $("#" + decision).text("O");
      game.populateBoard(decision);
      computerMoves.populateBoard(decision);
      $(".space").click(function() {
        var currentMark = $(this).html();
        var currentSquare = $(this).attr("id");
        var legality = game.isLegal(currentMark);
        if (legality === true) {
          $(".comments").text("")
          playerMoves.populateBoard(currentSquare);
          game.play(currentSquare);
          if (playerMoves.checkWin()) endGame("Good job! Try hard mode next!")
          else {
            var openSpots = game.whatsAvailable();
            var decision = computerPlay(openSpots);
            decision = computerMove(decision, "X");
            $("#" + decision).text("O");
            game.populateBoard(decision);
            computerMoves.populateBoard(decision);
            if (computerMoves.checkWin()) endGame("Oh crap, you lost to the computer!")
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0) endGame("Cat's Game! Why is it even called that??")
        }
        else $(".comments").text(phrase)
      });
    }
    else if (order === "first" && difficulty === "hard") {
      $(".space").click(function() {
        var currentMark = $(this).html();
        var currentSquare = $(this).attr("id");
        var legality = game.isLegal(currentMark);
        if (legality === true) {
          $(".comments").text("")
          playerMoves.populateBoard(currentSquare);
          game.play(currentSquare);
          if (playerMoves.checkWin()) endGame("Great job, you win! Try going second with the hard mode if you're brave enough!")
          else {
            var openSpots = game.whatsAvailable();
            var decision = computerFirstMoveHard(openSpots);
            decision = computerMove(decision, "X");
            decision = computerMove(decision, "O");
            $("#" + decision).text("O");
            game.populateBoard(decision);
            computerMoves.populateBoard(decision);
            if (computerMoves.checkWin()) endGame("It seems like humanity is doomed!")
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0) endGame("Cat's Game! Why is it even called that??")
        }
        else $(".comments").text(phrase)
      })
    }
    else if (order === "second" && difficulty === "hard") {
      var openSpots = game.whatsAvailable();
      var decision = "b2";
      $("#" + decision).text("O");
      game.populateBoard(decision);
      computerMoves.populateBoard(decision);
      $(".space").click(function() {
        var currentMark = $(this).html();
        var currentSquare = $(this).attr("id");
        var legality = game.isLegal(currentMark);
        if (legality === true) {
          $(".comments").text("")
          playerMoves.populateBoard(currentSquare);
          game.play(currentSquare);
          if (playerMoves.checkWin()) endGame("Great job, you won! I can\'t believe my eyes!")
          else {
            var openSpots = game.whatsAvailable();
            var decision = computerPlay(openSpots);
            decision = computerMove(decision, "X");
            decision = computerMove(decision, "O");
            $("#" + decision).text("O");
            game.populateBoard(decision);
            computerMoves.populateBoard(decision);
            if (computerMoves.checkWin()) endGame("It seems like humanity is doomed!")
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0) endGame("Cat's Game! Why is it even called that??")
        }
        else $(".comments").text(phrase)
      });
    }
    else alert("Please select an order and difficulty before beginning the game.")
  });
});
