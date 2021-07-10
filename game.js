(() => {
  var w = 20;
  var h = 20;
  var pw = a.width / w;
  var ph = a.height / h;
  var keyCode = {
    97: { x: -1, y: 0 },
    115: { x: 0, y: 1 },
    100: { x: 1, y: 0 },
    119: { x: 0, y: -1 },
  }; // A:97, S:115, D:100, W:119
  var body = [];
  var food = randomFood();
  addEventListener("keypress", (e) => {
    if (e.which == 32) {
      tid ? (clearTimeout(tid), (tid = null)) : loop();
    }
    if (keyCode[e.which]) {
      body[0].d = e.which;
    }
  });
  function drawPoint(p, color) {
    c.strokeStyle = "#fff";
    c.strokeRect(p.x * pw, p.y * ph, pw, ph);
    c.fillStyle = color || "#aaa";
    c.fillRect(p.x * pw, p.y * ph, pw, ph);
  }
  function randomFood() {
    var p = {
      x: ~~(Math.random() * w),
      y: ~~(Math.random() * h),
    };
    // if it overlaps with the body, try the make a new point
    return body.some((p2) => p.x === p2.x && p.y === p2.y) ? randomFood() : p;
  }
  function start() {
    body = [{ x: ~~(w / 2), y: ~~(h / 2), d: 119 }]; // start at the screen midpoint, upward
    loop(); // enter game loop
  }
  function gameOver() {
    c.fillStyle = "#e96900";
    c.font = "bold 48px serif";
    c.fillText("Game Over", (a.width - 24 * 4) / 2, (a.height - 24) / 2);
    setTimeout(start, 2000);
  }
  function nextPosition(p) {
    var d = keyCode[p.d];
    return { x: p.x + d.x, y: p.y + d.y, d: p.d };
  }
  function loop() {
    var head = nextPosition(body[0]); // get the next position
    // if it's out of bounds, then game over
    if (!(head.x >= 0 && head.x < w && head.y >= 0 && head.y < h)) {
      return gameOver();
    }
    // for (var i = 0; i < pb.length; i++) {
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
  var tid;
  start();
})();
