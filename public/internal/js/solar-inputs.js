
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);
var updateInput = function (modifier) {
  if (38 in keysDown) { // Player holding up

  }
  if (40 in keysDown) { // Player holding down

  }
  if (37 in keysDown) { // Player holding left

  }
  if (39 in keysDown) { // Player holding right

  }
  if (87 in keysDown) {
  }
  if (83 in keysDown) {
  }
}
//mouse
$("#canvas").on("click", function(event) {
  var w = 16;
  var x = event.pageX;
  var y = Math.floor(event.pageY-$(this).offset().top);
  
  planets.push(new planet(x,y,16, 0, 0, 255, 0, 0));
});
