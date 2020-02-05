function setup() {
  createCanvas(700, 500);
  background(220);
  drawBoard();
}

function drawBoard() {
    strokeWeight(4);
    stroke(0, 0, 255);
    line(2, 0, 2, 500);
    line(0, 70, 700, 70);
    line(100, 70, 100, 500);
    strokeWeight(2);  
    stroke(255, 0, 0);
    fill(255, 0, 0);
    textSize(50);
    text('A', 35, 50);
    text('B', 135, 50);
    text('C', 235, 50);
    text('D', 334, 50);
    text('E', 434, 50);
    text('F', 535, 50);
    text('G', 634, 50);
    strokeWeight(4);
    stroke(0, 0, 255);
    line(200, 70, 200, 500);
    line(300, 70, 300, 500);
    line(400, 70, 400, 500);
    line(500, 70, 500, 500);
    line(600, 70, 600, 500);
    line(698, 0, 698, 500);
    line(0, 131, 700, 131);
    line(0, 192, 700, 192);
    line(0, 253, 700, 253);
    line(0, 314, 700, 314);
    line(0, 375, 700, 375);
    line(0, 436, 700, 436);
    line(0, 498, 700, 498);
}

let human = 'h';
let computer = 'c';
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
for(let i = 0; i < 7; ++i) {
  board[i] = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
}
for(let i = 0; i < 7; ++i) {
  for(let j = 0; j < 7; ++j) {
    board[i][j] = ' ';
  }
}

function mouseClicked() {
  let col;
  if(mouseX > 0 && mouseX < 100) col = 0;
  else if(mouseX > 100 && mouseX < 200) col = 1;
  else if(mouseX > 200 && mouseX < 300) col = 2;
  else if(mouseX > 300 && mouseX < 400) col = 3;
  else if(mouseX > 400 && mouseX < 500) col = 4;
  else if(mouseX > 500 && mouseX < 600) col = 5;
  else if(mouseX > 600) col = 6;


  //*---------------------------------------------------------------------

  //* find first available location in the column and set it to human then break out of search
  //* if no open space is found then nothing should happen
  for(let i = 6; i >= 0; --i) {
      if(board[col][i] === ' ') {
        board[col][i] = human;
        computerMove();
        // isWinner();
        isWinner();
        break;
      }
  }
  //* if it gets here the column should be filed up
  columns[col] = false;
}

function loser() {
    createCanvas(1400, 1000);
    for(let i = 0; i < board.length; ++i) {
      for(let j = 0; j < board.length; ++j) {
          board[i][j] = ' ';
      }
    }
    textSize(100);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    text('YOU SUCK LOL!', 230, 100);
    text('BETTER LUCK NEXT TIME!', 8, 200);
}

function getY(x) {
    if(x === 0) return 100;
    else if(x === 1) return 162;
    else if(x === 2) return 222;
    else if(x === 3) return 283;
    else if(x === 4) return 344;
    else if(x === 5) return 406;
    else if(x === 6) return 468;
}

function getX(y) {
    if(y === 0) return 50;
    else if(y === 1) return 150;
    else if(y === 2) return 250;
    else if(y === 3) return 350;
    else if(y === 4) return 450;
    else if(y === 5) return 550;
    else if(y === 6) return 650;
}

function printVect() {
  for(let i = 0; i < 7; ++i) {
    for(let j = 0; j < 7; ++j) {
        if(board[i][j] !== ' ') {
            if(board[i][j] === human) {
                fill(0, 0, 255);
                let x = getX(i);
                let y = getY(j);
                ellipse(x, y, 50);
            }
            else if(board[i][j] === computer) {
              fill(255, 0, 0);
              let x = getX(i);
              let y = getY(j);
              ellipse(x, y, 50);
            }
        }
    }
  }
}

let columns = {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true};

let winner;

function horizontalcheck() {
  for(let i = 0; i < 4; ++i) {
    for(let j = 6; j >= 0; --j) {
		if(board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j] && (board[i][j] === human || board[i][j] === computer)) {
		  if(board[i][j] === human) winner = 'h';
		  else winner = computer;
		  return true;
		  }
	}
  }
  return false;
}

function vertical() {
  for(let i = 0; i < 7; ++i) {
    for(let j = 6; j >= 3; --j) {
      if(board[i][j] === board[i][j-1] && board[i][j] === board[i][j-2] && board[i][j] === board[i][j-3] && (board[i][j] === human || board[i][j] === computer)) {
        if(board[i][j] === human) winner = 'h';
        else winner = computer;
        return true;
      }
    }
  }
  return false;
}

/*
a a a a a a a 
a a a a a a a 
a a a a a a a 
a a a a a a a 
a a a a a a a
a a a a a a a
a a a a a a a
*/

function diag() {
	for(let i = 3; i < 7; ++i) {
		for(let j = 0; j <= 3; ++j) {
			if(board[i][j] === board[i-1][j+1] && board[i][j] === board[i-2][j+2] && board[i][j] === board[i-3][j+3] && (board[i][j] === human || board[i][j] === computer)) {
				if(board[i][j] === human) winner = 'h';
				else winner = computer;
				return true;
			}
		}
	}
	return false;
}

function youWin() {
  for(let i = 0; i < 7; ++i) {
    for(let j = 0; j < 7; ++j) {
        board[i][j] = ' ';
    }
  }
  createCanvas(1400, 1000);
  textSize(100);
  fill(0, 0, 255);
  text('SUPER NICE JOB MAN!', 75, 100);
}

function someoneWon() {
    if(winner === 'h') youWin();
    else loser();
}

function isWinner() {
  if(horizontalcheck() || vertical() || diag()) {
    console.log('SUPER NICE SUPER NICE SUPER NICE SUPREMELY NICE');
    someoneWon();
  }
  console.log('NOT NICE');
}

//* computer's move is gonna be a random move for now
function computerMove() {
  let x = floor(random(7));
  let counter = 0;
  while(!columns[x] && counter < 14) {
    x = floor(random(7));
    ++counter;
  }
  for(let i = 6; i >= 0; --i) {
    if(board[x][i] === ' ') {
      board[x][i] = computer;
      return true;
    }
  }
  columns[x] = false;
}

function draw() {
  noStroke();
  fill(0, 0, 255);
  printVect();
}
