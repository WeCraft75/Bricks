/*  This file contains all necessary functions and function calls for the bircks game.  */
/*  settings for the program  */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle=getRandomColor();
ctx.fillStyle=getRandomColor();
ctx.font = "60px Helvetica";
var ezmode=false;
var ballRadius=10;
var ballColor=getRandomColor();
var x=canvas.width/2;
var y=canvas.height-50;
var dx=2;
var dy=-2;
var paddleHeight = 10;
var paddleWidth = 85;
var paddleOffset = 10;
var paddleX = (canvas.width-paddleWidth) / 2;
var paddleColor=getRandomColor();
var rightPressed = false;
var leftPressed = false;
var lives = 3;
var run;
var countdown;
var timeToStart=3;
var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 13;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickRowColor=["#DA7C3D","#F44122","#870043"];
var bricks = [];
var hardness = [3,2,1];//top -> down
var maxScore=0;
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 , status: hardness[r]};
    maxScore=maxScore+hardness[r];
  }
}
var score=0;
var scoreCounter=document.getElementById('score');
var livesCounter=document.getElementById('lives');


startCountdown();

/*  functions  */
//countdown
function startCountdown(){
  drawCountdown();
  countdown=setInterval(drawCountdown, 1000);
}
function drawCountdown() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  if (timeToStart>0) {
    drawCounter();
    timeToStart--;
  }
  else{
    clearInterval(countdown);
    initiate();
  }
}
function drawCounter() {
  ctx.fillStyle="rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#000000";
  ctx.fillText(timeToStart+"",canvas.width/2 - 16 , canvas.height/2);
}
//game
function initiate(){
  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);
  document.addEventListener("mousemove", mouseHandler, false);
  run=setInterval(drawLoop, 10);
}
function drawLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (score>=maxScore) {
    alert("YOU WIN");
    clearInterval(run);
  }
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;//left or right hit
  }
  else if(y + dy < ballRadius) {
      dy = -dy;//top hit
  }
  else if(y + dy > canvas.height-ballRadius-paddleOffset-paddleHeight) {//bottom limit hit
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;//paddle hit
      var paddleCenterX=paddleX+paddleWidth/2;
      var relativity=x-paddleCenterX;//left is - , right is +
      dx=relativity*4/(paddleWidth/2);// rel * maxdx/(paddlew/2)
    }
    else if(lives>0){
      lives--;
      resetLevel();
    }
    else{
      alert("GAME OVER");
      clearInterval(run);
    }
  }
  collisionDetection();
  drawPaddle();
  drawBall();
  drawBricks();
  UIUpdate();
  x += dx;
  y += dy;
}

function drawBall(){
  ctx.fillStyle=ballColor;
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  else if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
      dy = -dy;
  }
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  if(rightPressed) {
    paddleX += 6;
    if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
  }
  else if(leftPressed) {
    paddleX -= 6;
    if (paddleX < 0){
        paddleX = 0;
    }
  }
  if(ezmode){//paddle is fixed on ball, slightly off center
    paddleX=x-paddleWidth/1.25;
  }
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight-paddleOffset, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status>0) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle=brickRowColor[bricks[c][r].status-1];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status>0) {
        if(x > b.x - ballRadius && x < b.x + brickWidth + ballRadius && y > b.y - ballRadius && y < b.y + brickHeight + ballRadius) {
          dy = -dy;
          b.status--;
          score++;
        }
      }
    }
  }
}

function UIUpdate() {
  scoreCounter.innerHtml="Score: "+score;
  livesCounter.innerHtml="Lives: "+lives;
}
function ez() {
  ezmode=true;//autocomplete level
}
function keyDown(e){
  if(e.key=="ArrowRight"){
    rightPressed = true;
  }
  else if (e.key=="ArrowLeft") {
    leftPressed = true;
  }
}
function keyUp(e){
  if(e.key=="ArrowRight"){
    rightPressed = false;
  }
  else if (e.key=="ArrowLeft") {
    leftPressed = false;
  }
}

function mouseHandler(e) {
  var cx=event.clientX;
  var cy=event.clientY;
  //mx+marginLeft < marginLeft+canvasw
  if(cx>=100 && cx<=100+canvas.clientWidth /*within x of canvas*/&&cy>=100 && cy<=100+canvas.clientHeight/*within y of canvas*/) {
    paddleX = cx - 100 - paddleWidth/2;
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getMaxScore() {

}
function resetLevel(){
  ctx.strokeStyle=getRandomColor();
  ctx.fillStyle=getRandomColor();
  x=canvas.width/2;
  y=canvas.height-50;
  dx=2;
  dy=-2;
  paddleX = (canvas.width-paddleWidth) / 2;
  rightPressed = false;
  leftPressed = false;
  clearInterval(run);
  timeToStart=3;
  startCountdown();
}
