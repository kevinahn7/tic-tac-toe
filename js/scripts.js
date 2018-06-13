function Board() {
  this.coordinates = [];
}

function PlayerMoves() {
  this.coordinates = [];
}

function ComputerMoves() {
  this.coordinates = [];
}

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

PlayerMoves.prototype.populatePlayerBoard = function(square) {
  this.coordinates.push(square);
}

ComputerMoves.prototype.populateComputerBoard = function(square) {
  this.coordinates.push(square);
}

PlayerMoves.prototype.checkWin = function() {
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

ComputerMoves.prototype.checkWin = function() {
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


Board.prototype.checkSpaceAndPlay = function(mark, square) {
  if (mark === "X" || mark === "O") {
    return "Sorry, spot's already taken."
  } else {
    $("#" + square).text("X");
    this.coordinates.push(square);
    return "Good move!";
  }
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


$(document).ready(function() {

  var game = new Board();
  var playerMoves = new PlayerMoves();
  var computerMoves = new ComputerMoves();

  $(".space").click(function() {
    var currentMark = $(this).html();
    var currentSquare = $(this).attr("id");
    var phrase = game.checkSpaceAndPlay(currentMark, currentSquare);
    $(".comments").text(phrase)
    if (phrase === "Good move!") {
      playerMoves.populatePlayerBoard(currentSquare);
      var didPlayerWin = playerMoves.checkWin();
      if (didPlayerWin) {
        $(".result").show();
        $("div").off("click")
        $(".winner").text("you, good job, you beat a random number generator")
      }
      else {
        var openSpots = game.whatsAvailable();
        var decision = computerPlay(openSpots);
        $("#" + decision).text("O");
        game.coordinates.push(decision)
        computerMoves.populateComputerBoard(decision);
        var didComputerWin = computerMoves.checkWin();
        if (didComputerWin) {
          $(".result").show();
          $("div").off("click")
          $(".winner").text("the computer, you should be ashamed")
        }

      }

      //Computer's Turn

    }
  })
});
