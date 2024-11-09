const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 15, y: 15 };

    document.addEventListener('keydown', changeDirection);

    function changeDirection(event) {
      const keyPressed = event.keyCode;
      const goingUp = direction.y === -1;
      const goingDown = direction.y === 1;
      const goingRight = direction.x === 1;
      const goingLeft = direction.x === -1;

      if (keyPressed === 37 && !goingRight) {
        direction = { x: -1, y: 0 };
      } else if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -1 };
      } else if (keyPressed === 39 && !goingLeft) {
        direction = { x: 1, y: 0 };
      } else if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: 1 };
      }
    }

    function gameLoop() {
      moveSnake();
      checkCollision();
      draw();
      setTimeout(gameLoop, 100);
    }

    function moveSnake() {
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        generateFood();
      } else {
        snake.pop();
      }
    }

    function checkCollision() {
      const head = snake[0];

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
      }

      for (let i = 4; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          resetGame();
        }
      }
    }

    function resetGame() {
      snake = [{ x: 10, y: 10 }];
      direction = { x: 0, y: 0 };
      generateFood();
    }

    function generateFood() {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };

      for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
          generateFood();
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'green';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });

      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    generateFood();
    gameLoop();
