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
  $("#orderAndDifficulty").hide();
}

function computerFirstMoveHard (openSpots) {
  if (openSpots.includes("b2")) {
    return "b2";
  }
  else if (openSpots.length === 8){
    var corners = ["a1", "a3", "c1", "c3"];
    var randomNumber = Math.floor(Math.random() * Math.floor(4))
    var cornerPick = corners[randomNumber];
    return cornerPick;
  }
  else {
    return computerPlay(openSpots);
  }
}


//UI Logic
$(document).ready(function() {

  $("#orderAndDifficulty").submit(function(event){

    event.preventDefault();
    var order = $(".theOrder:checked").val();
    var difficulty = $(".theDifficulty:checked").val();

    if (order === "first" && difficulty === "easy") {
      //Player goes first on easy mode
      hideButton();
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
          if (didPlayerWin) { endGame("Great job, you win!") }
          else if (!didPlayerWin) {
            var openSpots = game.whatsAvailable(); //get possibilities
            var decision = computerPlay(openSpots); //grab "a3" or whatever decision
            $("#" + decision).text("O"); //Put a O on that decision
            game.populateBoard(decision); //adds decision to game board
            computerMoves.populateBoard(decision); //adds decision to computer's move
            var didComputerWin = computerMoves.checkWin(); //checks if comp wins
            if (didComputerWin) { endGame("Oh crap, you lost to the computer!") }
          }
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0 && !didPlayerWin && !didComputerWin) { endGame("Cat's Game MEEEOOOWWW!!!") }
        }
        else if (legality === false) { $(".comments").text(phrase) } //shows that phrase
      });
    }

    else if (order === "second" && difficulty === "easy") {
      //Player goes second on easy mode
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
          else if (!didPlayerWin) {
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
          var openSpots = game.whatsAvailable();
          if (openSpots.length === 0 && !didPlayerWin && !didComputerWin) { endGame("Cat's Game MEEEOOOWWW!!!") }
        }
        else if (legality === false) {
          $(".comments").text(phrase) //shows that phrase
        }
      });
    }



    else if (order === "first" && difficulty === "normal") {
      //Player goes first on normal mode
      hideButton()
      $(".game").show();
      var game = new Board();
      var playerMoves = new Board();
      var computerMoves = new Board();

      $(".space").click(function() {
        var currentMark = $(this).html(); //creates a variable that determines the current mark
        var currentSquare = $(this).attr("id"); // grabs the id of the space clicked eg: "a3"
        var legality = game.isLegal(currentMark); //checks if there is a mark on the current space
        var phrase = "Sorry, this spot is taken"; //phrase for if there is already a mark

        if (legality === true) { //if the entry is valid, run game
          $(".comments").text("") //clears phrase
          playerMoves.populateBoard(currentSquare); //adds the current clicked space to the player's moves obj
          game.play(currentSquare); //marks the space and pushes the selected space to the game board object
          var didPlayerWin = playerMoves.checkWin(); //checks if the player has won
          if (didPlayerWin) {
            endGame("Great job, you win!") //ends the game if the player won
          }
          else { //continues if the player didn't win and computer goes
            var openSpots = game.whatsAvailable(); //get possibilities
            var decision = computerFirstMoveHard(openSpots); //grabs a random space from the possibilities array eg "a3"
            // setTimeout(function() { $("#" + decision).text("O"); }, 1000);
            $("#" + decision).text("O"); //Put a O on that decision
            game.populateBoard(decision); //adds decision to game board
            computerMoves.populateBoard(decision); //adds decision to computer's board obj
            var didComputerWin = computerMoves.checkWin(); //checks if comp wins
            if (didComputerWin) { //ends the game if comp won
              endGame("Oh crap, you lost to the computer!")
            }
          } //otherwise end turn
        }
        else if (legality === false) {
          $(".comments").text(phrase) //shows that phrase
        }
      })
    }



    else if (order === "second" && difficulty === "normal") {
      //Player goes second on normal mode
      hideButton();
      $(".game").show();
      var game = new Board();
      var playerMoves = new Board();
      var computerMoves = new Board();

      var openSpots = game.whatsAvailable(); //get possibilities
      var decision = "b2"; //grab "a3" or whatever decision
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
    }



    else {
      alert("Please select an order and difficulty before beginning the game.")
    }



  });

});
