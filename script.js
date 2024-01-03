// script.js
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let snake = [{ x: 200, y: 200 }];
let dx = 10;
let dy = 0;

function drawSnakePart(snakePart) {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "darkgreen";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

// function main() {
//   setTimeout(function onTick() {
//     clearCanvas();
//     drawSnake();
//     moveSnake();
//     // 調用其他遊戲邏輯函數（稍後添加）
//     main();
//   }, 100);
// }

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokestyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// 新蛇部分的移動邏輯
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

main();

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

document.addEventListener("keydown", changeDirection);

let foodX;
let foodY;

function createFood() {
  foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, 10, 10);
}

function checkFoodCollision() {
  if (snake[0].x === foodX && snake[0].y === foodY) {
    createFood();
    snake.push({ x: snake[0].x + dx, y: snake[0].y + dy });
  }
}

createFood();

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didCollide) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function resetGame() {
  snake = [{ x: 200, y: 200 }];
  dx = 10;
  dy = 0;
  createFood();
}

function main() {
  if (didGameEnd()) {
    if (confirm("你輸了。要重新開始遊戲嗎？")) {
      resetGame();
    } else {
      return;
    }
  }
  setTimeout(function onTick() {
    clearCanvas();
    drawSnake();
    drawFood();
    moveSnake();
    checkFoodCollision();
    main();
  }, 100);
}
