var houses=["house1.gif", "house2.gif"];
var imageHolder=document.getElementById('imageHolder');

setRandomHouse();
function setRandomHouse() {
  imageHolder.src="img/"+houses[getRndInteger(0,1)];
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
/*
var animationLength=[5500, 21000];  //time is in ms, from start to restart
var i=0;
var timer;
switchHouse();

function switchHouse() {
  console.log("switched house");
  imageHolder.src="../img/"+houses[i];
  i++;
  if (i>houses.length) {
    i=0;
  }
  clearInterval(timer);
  console.log("cleared interval");
  timer=setTimeout(switchHouse, animationLength[i]);
  console.log("set new interval");
}
*/
