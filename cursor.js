var offsetX = 50;
var offsetY = 50;
var boardLength = 600;
var gridNumber = 15;
var gridLength = 600 / gridNumber;
var halfGridLength = gridLength / 2;
var turn = 'white';
var pieces = [];
var gridX = undefined;
var gridY = undefined;
var indX = undefined;
var indY = undefined;
var currentRound = 0;

function setup(){
  createCanvas(700,700);
}

function draw() {
  drawBoard();
  drawPieces();
  drawMousePiece();
}


function drawPieces() {
  for (var i in pieces) {
    var piece = pieces[i];
    var pos = indToPos(piece.x, piece.y);
    fill(turnColour(piece.turn));
    noStroke();
    ellipse(pos.x, pos.y, gridLength, gridLength);
  }
}

function drawMousePiece() {
  if (isValid()) {
    fill(turnColour(turn));
    stroke(232,72,72);
    nearestMousePoint = findNearestPoint();
    gridX = nearestMousePoint.x;
    gridY = nearestMousePoint.y;
    var index = posToInd(gridX, gridY);
    indX = index.x;
    indY = index.y;
    ellipse(gridX, gridY, gridLength, gridLength);
  }
}

function drawBoard() {
  background(217,164,70);
  noFill();
  quad(offsetX,offsetY,
    offsetX + boardLength, offsetY,
    offsetX + boardLength, offsetY + boardLength,
    offsetX, offsetY + boardLength);
    for (var i = 0; i < gridNumber; ++i) {
      var delta = gridLength * i;
      line(offsetX, offsetY + delta,
        offsetX + boardLength, offsetY + delta);
        line(offsetX + delta, offsetY,
          offsetX + delta, offsetY + boardLength)
        }
      }
      


function turnColour(t) {
  return 'white' === t ? 255 : 0;
}

function posToInd(x, y) {
  return {
    x: (x - offsetX) / gridLength,
    y: (y - offsetY) / gridLength
  }
}

function indToPos(indexX, indexY) {
  return {
    x: offsetX + indexX * gridLength,
    y: offsetY + indexY * gridLength
  }
}

function pushPiece() {
  var index = posToInd(gridX, gridY);
  pieces.push({
    x: index.x,
    y: index.y,
    turn: turn,
    round: currentRound
  });
  currentRound++;
  flipTurn();
}

function flipTurn() {
  turn = (turn === 'white' ? 'black' : 'white');
}

// override
function mousePressed() {
  if (isValid() && !hasTaken()) {
    console.log(gridX)
    console.log(gridY)
    pushPiece();
  }
}

function hasTaken() {
  for (var i in pieces) {
    var piece = pieces[i];
    if (piece.x === indX && piece.y === indY) {
      return true;
    }
  }
  return false;
}

function isValid() {
  var halfGridLength = gridLength / 2;
  return mouseX > offsetX - halfGridLength &&
    mouseX < offsetX + boardLength + halfGridLength &&
    mouseY > offsetY - halfGridLength &&
    mouseY < offsetY + boardLength + halfGridLength;
}

function findNearestPoint() {
  return {
    valid: true,
    x : Math.round((mouseX - offsetX) / gridLength) * gridLength + offsetX,
    y : Math.round((mouseY - offsetY) / gridLength) * gridLength + offsetY
  }
}
