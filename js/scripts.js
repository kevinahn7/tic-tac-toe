function Board() {
  this.coordinates = [];
}

function PlayerBoard() {
  this.row = [];
  this.column = [];
  this.diagonal = [];
}

function ComputerBoard() {
  this.row = [];
  this.column = [];
  this.diagonal = [];
}

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

PlayerBoard.prototype.populatePlayerBoard = function(square) {
  this.row.push(square);
  this.column.push(square);
  this.diagonal.push(square);
}
// Board.prototype.

// Board.prototype.checkWin = function() {
//
// }

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

function computerGo(openSpots) {
  var randomNumber = Math.floor(Math.random() * Math.floor(openSpots.length))
  var computerDecision = openSpots[randomNumber];
  console.log(computerDecision);
  return computerDecision;
}


$(document).ready(function() {

  var game = new Board();
  var playerGame = new PlayerBoard();

  $(".space").click(function() {
    var currentMark = $(this).html();
    var currentSquare = $(this).attr("id");
    var checked = game.checkSpaceAndPlay(currentMark, currentSquare);
    $(".comments").text(checked)
    if (checked === "Good move!") {
      playerGame.populatePlayerBoard(currentSquare);
      console.log(game.coordinates)

      // var didSomeoneWin = checkWin();


      var openSpots = game.whatsAvailable();
      var decision = computerGo(openSpots);
      $("#" + decision).text("O");
      game.coordinates.push(decision)
      console.log(openSpots);
    }
  })
});
