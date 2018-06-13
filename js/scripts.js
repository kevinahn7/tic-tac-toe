//Business Logic
function Board() {
  this.coordinates = [];
}

Board.prototype.populateBoard = function(square) {
  this.coordinates.push(square);
}

Board.prototype.checkWin = function() {
  if (this.coordinates.includes("a1") && this.coordinates.includes("a2") && this.coordinates.includes("a3")) {
    return true;
  }
  if (this.coordinates.includes("b1") && this.coordinates.includes("b2") && this.coordinates.includes("b3")) {
    return true;
  }
  if (this.coordinates.includes("c1") && this.coordinates.includes("c2") && this.coordinates.includes("c3")) {
    return true;
  }
  if (this.coordinates.includes("a1") && this.coordinates.includes("b1") && this.coordinates.includes("c1"))  {
    return true;
  }
  if (this.coordinates.includes("a2") && this.coordinates.includes("b2") && this.coordinates.includes("c2"))  {
    return true;
  }
  if (this.coordinates.includes("a3") && this.coordinates.includes("b3") && this.coordinates.includes("c3"))  {
    return true;
  }
  if (this.coordinates.includes("a1") && this.coordinates.includes("b2") && this.coordinates.includes("c3")) {
    return true;
  }
  if (this.coordinates.includes("a3") && this.coordinates.includes("b2") && this.coordinates.includes("c1")) {
    return true;
  }
  else {
    return false;
  }
}

Board.prototype.isLegal = function(mark) {
  if (mark === "X" || mark === "O") {
    return false;
  } else {
    return true;
  }
}

Board.prototype.play = function(square) {
  $("#" + square).text("X");
  this.coordinates.push(square);
}

Board.prototype.whatsAvailable = function() {
  var possibilities = ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"];
  this.coordinates.forEach(function(coordinate) {
    for (x=0; x<possibilities.length; x++) {
      if (coordinate === possibilities[x]) {
        possibilities.splice(x, 1);
      }
    }
  });
  return possibilities;
}

function computerPlay(openSpots) {
  var randomNumber = Math.floor(Math.random() * Math.floor(openSpots.length))
  var computerDecision = openSpots[randomNumber];
  return computerDecision;
}

function endGame(phrase) {
  $(".result").show();
  $("div").off("click")
  $(".winner").text(phrase)
  $(".comments").hide();
}

function hideButton() {
  $(".theButtons").hide();
}


//UI Logic
$(document).ready(function() {

  $("#first").click(function(){
    hideButton()
    $(".game").show();
    var game = new Board();
    var playerMoves = new Board();
    var computerMoves = new Board();

    $(".space").click(function() {
      var currentMark = $(this).html(); //X or O
      var currentSquare = $(this).attr("id"); //"a3"
      var legality = game.isLegal(currentMark);
      var phrase = "Sorry, this spot is taken";

      if (legality === true) { //if the entry is valid, run game
        $(".comments").text("")
        playerMoves.populateBoard(currentSquare);
        game.play(currentSquare);
        var didPlayerWin = playerMoves.checkWin();
        if (didPlayerWin) {
          endGame("Great job, you win!")
        }
        else {
          var openSpots = game.whatsAvailable(); //get possibilities
          var decision = computerPlay(openSpots); //grab "a3" or whatever decision
          $("#" + decision).text("O"); //Put a O on that decision
          game.populateBoard(decision); //adds decision to game board
          computerMoves.populateBoard(decision); //adds decision to computer's move
          var didComputerWin = computerMoves.checkWin(); //checks if comp wins
          if (didComputerWin) {
            endGame("Oh crap, you lost to the computer!")
          }
        }
      }
      else if (legality === false) {
        $(".comments").text(phrase) //shows that phrase
      }
    })
  })

  $("#second").click(function(){
    hideButton();
    $(".game").show();
    var game = new Board();
    var playerMoves = new Board();
    var computerMoves = new Board();

    var openSpots = game.whatsAvailable(); //get possibilities
    var decision = computerPlay(openSpots); //grab "a3" or whatever decision
    $("#" + decision).text("O"); //Put a O on that decision
    game.populateBoard(decision); //adds decision to game board
    computerMoves.populateBoard(decision); //adds decision to computer's move
    $(".space").click(function() {
      var currentMark = $(this).html(); //X or O
      var currentSquare = $(this).attr("id"); //"a3"
      var legality = game.isLegal(currentMark);
      var phrase = "Sorry, this spot is taken";

      if (legality === true) { //if the entry is valid, run game
        $(".comments").text("")
        playerMoves.populateBoard(currentSquare);
        game.play(currentSquare);
        var didPlayerWin = playerMoves.checkWin();
        if (didPlayerWin) {
          endGame("Great job, you win!")
        }
        else {
          var openSpots = game.whatsAvailable(); //get possibilities
          var decision = computerPlay(openSpots); //grab "a3" or whatever decision
          $("#" + decision).text("O"); //Put a O on that decision
          game.populateBoard(decision); //adds decision to game board
          computerMoves.populateBoard(decision); //adds decision to computer's move
          var didComputerWin = computerMoves.checkWin(); //checks if comp wins
          if (didComputerWin) {
            endGame("Oh crap, you lost to the computer!")
          }
        }
      }
      else if (legality === false) {
        $(".comments").text(phrase) //shows that phrase
      }
    });
  })


});
