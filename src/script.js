(function(){

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "souce-over"; //合成方法
 
  //stats.js
  const stats = new Stats();
  document.body.appendChild( stats.dom );

  let frameId;

  let tileSize = 10;


  let mouse = {
    x: null,
    y: null
  }
  let scrollY = window.pageYOffset;

  function drawRect(size,x,y,alpha){
    ctx.beginPath();
    ctx.rect( x, y, size, size )
    ctx.fillStyle = "rgba(0,0,0,"+ alpha + ")";
    ctx.fill();
  }

  // drawRect(100,0,0,0.08,scrollY*0.01,getRandom(0.5,1));

  //アニメーション
  function loop(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawRect(100,0,0,0.08,scrollY*0.01,getRandom(0.5,1));
    frameId = requestAnimationFrame(loop);
    if(frameId % 2 == 0) { return; }//60fpsを30fpsにする
    stats.update();
  }
  loop();

  for(let j = 0; j < Math.floor(canvas.width/tileSize+1); j++){
    for(let i = 0; i <Math.floor(canvas.height/tileSize+1); i++){
      drawRect(tileSize, tileSize*j, tileSize*i, Math.abs(Math.sin(scrollY*0.01+getRandom(0,360))*0.8 ));
    }
  }

  //全画面リサイズ
  window.addEventListener("resize", function(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0,0, canvas.width, canvas.height);  //画面の更新
    for(let j = 0; j < Math.floor(canvas.width/tileSize+1); j++){
      for(let i = 0; i <Math.floor(canvas.height/tileSize+1); i++){
        drawRect(tileSize, tileSize*j, tileSize*i, Math.abs(Math.sin(scrollY*0.01+getRandom(0,360))*0.8 ));
      }
    }   
  });
  
  //マウス動いた時
  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  //スクロールした時
  window.addEventListener('scroll', (event) => {
    scrollY = window.pageYOffset;
    ctx.clearRect(0,0, canvas.width, canvas.height);  //画面の更新
    for(let j = 0; j < Math.floor(canvas.width/tileSize+1); j++){
      for(let i = 0; i <Math.floor(canvas.height/tileSize+1); i++){
        drawRect(tileSize, tileSize*j, tileSize*i, Math.abs(Math.sin(scrollY*0.01+getRandom(0,360))*0.8 ));
      }
    }
  });

  //ランダム
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


})();