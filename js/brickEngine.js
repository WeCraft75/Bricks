/*
  This file contains all necessary functions and function calls for the bircks game.
*/
/*  settings for the program  */
var ctx=document.getElementById('canvas').getContext('2d');
ctx.strokeStyle="#000000";
initiate();
/*  functions  */
function initiate(){
  ctx.moveTo(0,0);
  ctx.lineTo(100,100);
  ctx.stroke();
}
