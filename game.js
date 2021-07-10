(() => {
  const horizontalSize = 20;
  const verticalSize = 20;
  const pointWidth = a.width / horizontalSize;
  const pointHeight = a.height / verticalSize;
  const keyCodeMap = {
    97: { x: -1, y: 0 },
    115: { x: 0, y: 1 },
    100: { x: 1, y: 0 },
    119: { x: 0, y: -1 },
  }; // A:97, S:115, D:100, W:119
  let body = [];
  let food = randomFood();
  let tid; // timer id, used to pause or continue the game
  addEventListener("keypress", (e) => {
    if (e.which == 32) {
      tid ? (clearTimeout(tid), (tid = null)) : loop();
    }
    if (keyCodeMap[e.which]) {
      body[0].d = e.which;
    }
  });
  function drawPoint(p, color) {
    c.strokeStyle = "#fff";
    c.strokeRect(p.x * pointWidth, p.y * pointHeight, pointWidth, pointHeight);
    c.fillStyle = color || "#aaa";
    c.fillRect(p.x * pointWidth, p.y * pointHeight, pointWidth, pointHeight);
  }
  function randomFood() {
    const p = {
      x: ~~(Math.random() * horizontalSize),
      y: ~~(Math.random() * verticalSize),
    };
    // if it overlaps with the body, try the make a new point
    return body.some((p2) => p.x === p2.x && p.y === p2.y) ? randomFood() : p;
  }
  function start() {
    body = [{ x: ~~(horizontalSize / 2), y: ~~(verticalSize / 2), d: 119 }]; // start at the screen midpoint, upward
    loop(); // enter game loop
  }
  function gameOver() {
    c.fillStyle = "#e96900";
    c.font = "bold 48px serif";
    c.fillText("Game Over", (a.width - 24 * 4) / 2, (a.height - 24) / 2);
    setTimeout(start, 2000);
  }
  function nextPosition(point) {
    const direction = keyCodeMap[point.d];
    return { x: point.x + direction.x, y: point.y + direction.y, d: point.d };
  }
  function loop() {
    const head = nextPosition(body[0]); // get the next position
    // if it's out of bounds, then game over
    if (
      !(
        head.x >= 0 &&
        head.x < horizontalSize &&
        head.y >= 0 &&
        head.y < verticalSize
      )
    ) {
      return gameOver();
    }
    // for (let i = 0; i < pb.length; i++) {
    //   if (head.x === pb[i].x && head.y === pb[i].y) {
    //     return gameOver();
    //   }
    // }
    body.unshift(head); // 没有吃到食物，蛇头前进时，蛇尾要收缩
    if (food.x === head.x && food.y === head.y) {
      // if it's already eaten the food, then make next food
      food = randomFood();
    } else {
      // or else, move the body forward
      body.pop();
    }
    c.fillStyle = "#f1fedd";
    c.fillRect(0, 0, a.width, a.height);
    drawPoint(food, "#e96900"); // draw food
    drawPoint(body[0], "#2d64b3"); // draw snake's head
    body.slice(1).forEach((p) => drawPoint(p)); // draw snake's body
    tid = setTimeout(loop, 200 - body.length * 1.5); // compute speed
  }
  start();
})();
