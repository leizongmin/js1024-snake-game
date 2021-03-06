(() => {
  const pointSize = 30;
  const screenWidth = ~~(a.width / pointSize) * pointSize;
  const screenHeight = ~~(a.height / pointSize) * pointSize;
  const horizontalSize = ~~(screenWidth / pointSize);
  const verticalSize = ~~(screenHeight / pointSize);
  const keyCodeMap = {
    97: { x: -1, y: 0, o: 100 }, // key [A] => [Left]
    115: { x: 0, y: 1, o: 119 }, // key [S] => [Down]
    100: { x: 1, y: 0, o: 97 }, // key [D] => [Right]
    119: { x: 0, y: -1, o: 115 }, // key [W] => [Up]
  };
  let body;
  let food;
  let tid; // timer id, used to pause or resume the game
  addEventListener("keypress", (e) => {
    // press [Space] to pause or resume
    if (e.which == 32) {
      tid ? (clearTimeout(tid), (tid = null)) : loop();
    }
    // press the direction key [A] [S] [D] [W]
    const key = keyCodeMap[e.which];
    if (key) {
      const head = body[0];
      if (body.length > 1 && key.o == head.d) {
        // no backsliding allowed
        return;
      }
      head.d = e.which;
    }
  });
  function drawPoint(p, color) {
    c.strokeStyle = "#fff";
    c.strokeRect(p.x * pointSize, p.y * pointSize, pointSize, pointSize);
    c.fillStyle = color || "#aaa";
    c.fillRect(p.x * pointSize, p.y * pointSize, pointSize, pointSize);
  }
  function randomFood() {
    const p = {
      x: ~~(Math.random() * horizontalSize),
      y: ~~(Math.random() * verticalSize),
    };
    // if it overlaps with the body, try the make a new point
    return body.some((p2) => p.x == p2.x && p.y == p2.y) ? randomFood() : p;
  }
  function start() {
    body = [{ x: ~~(horizontalSize / 2), y: ~~(verticalSize / 2), d: 119 }]; // start at the screen midpoint, upward
    food = randomFood();
    loop(); // enter game loop
  }
  function gameOver() {
    c.fillStyle = "#e60";
    c.font = "bold 48px serif";
    c.fillText(
      "Game Over",
      (screenWidth - 24 * 4) / 2,
      (screenHeight - 24) / 2
    );
    setTimeout(start, 2000);
  }
  function nextPosition(point) {
    const direction = keyCodeMap[point.d];
    return {
      x: point.x + direction.x,
      y: point.y + direction.y,
      d: point.d,
    };
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
    body.unshift(head); // ??????????????????????????????????????????????????????
    if (food.x == head.x && food.y == head.y) {
      // if it's already eaten the food, then make next food
      food = randomFood();
    } else {
      // or else, move the body forward
      body.pop();
    }
    c.fillStyle = "#eee";
    c.fillRect(0, 0, screenWidth, screenHeight);
    drawPoint(food, "#e60"); // draw food
    drawPoint(body[0], "#429"); // draw snake's head
    body.slice(1).forEach((p) => drawPoint(p)); // draw snake's body
    tid = setTimeout(loop, 150 - body.length * 1.5); // compute speed
  }
  start();
})();
