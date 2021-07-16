# Snake Game

Snake Game, press [A] [S] [D] [W] to control, press [Space] to pause/resume

Online demo: https://js1024.fun/demos/2021/10

![preview](preview.gif)

JS1024 Classic Canvas Mode Download shim

* a = the canvas element
* b = the body element
* c = the 2d context
* d = the document element

```javascript
(()=>{var t=30,e=~~(a.width/t)*t,n=~~(a.height/t)*t,o=~~(e/t),i=~~(n/t),l={97:{x:-1,y:0,o:100},115:{x:0,y:1,o:119},100:{x:1,y:0,o:97},119:{x:0,y:-1,o:115}};let y,f,x;function r(e,n){c.strokeStyle="#fff",c.strokeRect(e.x*t,e.y*t,t,t),c.fillStyle=n||"#aaa",c.fillRect(e.x*t,e.y*t,t,t)}function s(){var t={x:~~(Math.random()*o),y:~~(Math.random()*i)};return y.some(e=>t.x==e.x&&t.y==e.y)?s():t}function h(){y=[{x:~~(o/2),y:~~(i/2),d:119}],f=s(),u()}function u(){var t=function(t){var e=l[t.d];return{x:t.x+e.x,y:t.y+e.y,d:t.d}}(y[0]);if(!(t.x>=0&&t.x<o&&t.y>=0&&t.y<i))return c.fillStyle="#e60",c.font="bold 48px serif",c.fillText("Game Over",(e-96)/2,(n-24)/2),void setTimeout(h,2e3);y.unshift(t),f.x==t.x&&f.y==t.y?f=s():y.pop(),c.fillStyle="#eee",c.fillRect(0,0,e,n),r(f,"#e60"),r(y[0],"#429"),y.slice(1).forEach(t=>r(t)),x=setTimeout(u,150-1.5*y.length)}addEventListener("keypress",t=>{32==t.which&&(x?(clearTimeout(x),x=null):u());var e=l[t.which];if(e){var c=y[0];if(y.length>1&&e.o==c.d)return;c.d=t.which}}),h()})();
```
