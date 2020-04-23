/*  This file contains all necessary functions and function calls for the bircks game.  */
/*  settings for the program  */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle=getRandomColor();
ctx.fillStyle=getRandomColor();
var ballRadius=10;
var x=canvas.width/2;
var y=canvas.height-50;
var dx=2;
var dy=-2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

initiate();

/*  functions  */
function initiate(){
  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);
  setInterval(drawLoop, 10);
}
function drawLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawPaddle();
  drawBall();
  x += dx;
  y += dy;
}

function drawBall(){
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
  ctx.rect(paddleX, canvas.height-paddleHeight-10, paddleWidth, paddleHeight);
  ctx.fillStyle = "#202020";
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
