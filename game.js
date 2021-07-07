var w = 20,
  h = 20,
  pw = a.width / w,
  ph = a.height / h;
var keyCode = {
  97: { x: -1, y: 0 },
  115: { x: 0, y: 1 },
  100: { x: 1, y: 0 },
  119: { x: 0, y: -1 },
}; // A:97, S:115, D:100, W:119
var pb = [],
  pf = rndp();
addEventListener("keypress", function (e) {
  if (e.which == 32) {
    tid ? (clearTimeout(tid), (tid = null)) : loop();
  }
  if (keyCode[e.which]) pb[0].d = e.which;
});
function drawPoint(p, a, b, color) {
  c.strokeStyle = "#fff";
  c.strokeRect(p.x * pw, p.y * ph, pw, ph);
  c.fillStyle = color || "#aaa";
  c.fillRect(p.x * pw, p.y * ph, pw, ph);
}
function rndp() {
  var p = {
    x: parseInt(Math.random() * w, 10),
    y: parseInt(Math.random() * h, 10),
  };
  return pb.some(function (p2) {
    return p.x === p2.x && p.y === p2.y;
  })
    ? rndp()
    : p;
}
function start() {
  pb = [{ x: parseInt(w / 2, 10), y: parseInt(h / 2, 10), d: 119 }];
  loop();
}
function gameOver() {
  c.fillStyle = "#e96900";
  c.font = "bold 48px serif";
  c.fillText("Game Over", (a.width - 24 * 4) / 2, (a.height - 24) / 2);
  setTimeout(start, 2000);
}
function nxp(p) {
  var d = keyCode[p.d];
  return { x: p.x + d.x, y: p.y + d.y, d: p.d };
}
function loop() {
  var hp = nxp(pb[0]); // 计算前进后蛇头的位置，如果不在屏幕区域内，或者与蛇身重合，则游戏结束
  if (!(hp.x >= 0 && hp.x < w && hp.y >= 0 && hp.y < h)) return gameOver();
  for (var i = 0; i < pb.length; i++)
    if (hp.x === pb[i].x && hp.y === pb[i].y) return gameOver();
  pb.unshift(hp); // 没有吃到食物，蛇头前进时，蛇尾要收缩
  pf.x === hp.x && pf.y === hp.y ? (pf = rndp()) : pb.pop();
  c.fillStyle = "#f1fedd";
  c.fillRect(0, 0, a.width, a.height);
  drawPoint(pf, 0, 0, "#e96900"); // Food
  drawPoint(pb[0], 0, 0, "#2d64b3"); // snake's head
  pb.slice(1).forEach(drawPoint); // snake's body
  tid = setTimeout(loop, 200 - pb.length * 1.5); // speed
}
start();
var tid;
