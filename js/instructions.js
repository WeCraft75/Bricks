var displayed=false;
function toggleInstructions() {
  console.log(displayed);
  if (displayed) {
    document.getElementById('instructions').style.display = "none";
    displayed=false;
  } else {
    document.getElementById('instructions').style.display = "block";
    displayed=true;
  }
  console.log(displayed);
}
