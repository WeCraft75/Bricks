/*  This file contains all necessary functions and function calls for the bircks game.  */
/*  settings for the program  */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle=getRandomColor();
ctx.fillStyle=getRandomColor();
ctx.font = "60px Helvetica";
var ballRadius=10;
var ballColor=getRandomColor();
var x=canvas.width/2;
var y=canvas.height-50;
var dx=2;
var dy=-2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleOffset = 10;
var paddleX = (canvas.width-paddleWidth) / 2;
var paddleColor=getRandomColor();
var rightPressed = false;
var leftPressed = false;
var lives = 3;
var run;
var countdown;
var timeToStart=3;


startCountdown();


/*  functions  */
//countdown
function startCountdown(){
  console.log("countdown started");
  countdown=setInterval(drawCountdown, 1000);
}
function drawCountdown() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
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
  run=setInterval(drawLoop, 10);
}
function drawLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
      dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius-paddleOffset-paddleHeight) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
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
  drawPaddle();
  drawBall();
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
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight-paddleOffset, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
