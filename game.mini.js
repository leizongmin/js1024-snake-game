(()=>{const t=30,e=30,i=~~(a.width/t),n=~~(a.height/e),o={97:{x:-1,y:0,o:100},115:{x:0,y:1,o:119},100:{x:1,y:0,o:97},119:{x:0,y:-1,o:115}};let l,f=[],y=x();function h(i,n){c.strokeStyle="#fff",c.strokeRect(i.x*t,i.y*e,t,e),c.fillStyle=n||"#aaa",c.fillRect(i.x*t,i.y*e,t,e)}function x(){const t={x:~~(Math.random()*i),y:~~(Math.random()*n)};return f.some(e=>t.x===e.x&&t.y===e.y)?x():t}function d(){f=[{x:~~(i/2),y:~~(n/2),d:119}],r()}function r(){const t=function(t){const e=o[t.d];return{x:t.x+e.x,y:t.y+e.y,d:t.d}}(f[0]);if(!(t.x>=0&&t.x<i&&t.y>=0&&t.y<n))return c.fillStyle="#e96900",c.font="bold 48px serif",c.fillText("Game Over",(a.width-96)/2,(a.height-24)/2),void setTimeout(d,2e3);f.unshift(t),y.x===t.x&&y.y===t.y?y=x():f.pop(),c.fillStyle="#f1fedd",c.fillRect(0,0,a.width,a.height),h(y,"#e96900"),h(f[0],"#2d64b3"),f.slice(1).forEach(t=>h(t)),l=setTimeout(r,150-1.5*f.length)}addEventListener("keypress",t=>{32==t.which&&(l?(clearTimeout(l),l=null):r());const e=o[t.which];if(e){const i=f[0];if(f.length>1&&e.o===i.d)return;i.d=t.which}}),d()})();