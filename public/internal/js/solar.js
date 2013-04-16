//Functional methods:




//
/* draw a sprite with rotation
 * // [imageObject] this is image object which is returned loadImage
 * // [x] screen x coordinate
 * // [y] screen y coordinate
 * // [rotation] rotation angle in radians (normal value 0.0)
 * // [scale] sprite scale (normal value 1.0)
 */
function drawSprite(imageObject, x, y, rotation, scale)
{


    var w = imageObject.width;
    var h = imageObject.height;

    // save state
    ctx.save();

    // set screen position
    ctx.translate(x, y);

    // set rotation
    ctx.rotate(-rotation);

    // set scale value
    ctx.scale(scale, scale);

    // draw image to screen drawImage(imageObject, sourceX, sourceY, sourceWidth, sourceHeight,
    // destinationX, destinationY, destinationWidth, destinationHeight)
    ctx.drawImage(imageObject, 0, 0, w, h, -w/2, -h/2, w, h);
    
    // restore state
    ctx.restore();
}

















// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth + 5;//document.body.clientWidth;
canvas.height = window.innerHeight + 5;//document.body.clientHeight;
canvas.style.margin = "-10px";
document.body.appendChild(canvas);

// Background image1
var bg1Ready = false;
var bg1Image = new Image();
bg1Image.onload = function () {
  bg1Ready = true;
};
bg1Image.src = "internal/images/solar-bg.jpg";


// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
// heroImage.src = "images/plane.png";





// Game objects
var hero = {
    V_x: 0 // movement in pixels per second
  , V_y: 0
  ,   width: 170
  ,   height: 72
  , distance: 0
  , altitude: 0
  , angle: 0  //in degrees?
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
  hero.x = 50;
  hero.y = 50;//canvas.height-3/2*hero.height;
};



var updateInput = function (modifier) {
  if (38 in keysDown) { // Player holding up
    //hero.V_y -= 100 * modifier;
    hero.angle += .3*modifier;
  }
  if (40 in keysDown) { // Player holding down
    //hero.V_y += 100 * modifier;
    hero.angle -= .3*modifier;
  }
  if (37 in keysDown) { // Player holding left
    if (onGround) {
      hero.V_x -= engineStrength/3 * modifier;
    } else {
      //airbrakes: Just increases drag.
      hero.V_x -= airResistance*hero.V_x*hero.V_x*modifier*5
    }
  }
  if (39 in keysDown) { // Player holding right
    //TODO: alter this based on the angle
    hero.V_x += Math.cos(hero.angle)*engineStrength * modifier;
    hero.V_y -= Math.sin(hero.angle)*engineStrength * modifier;

  }
  if (87 in keysDown) {
    hero.angle += .3 * modifier;
  }
  if (83 in keysDown) {
    hero.angle -= .3 * modifier;
  }
}

//global physics vars
var gravity = 1;    // to be tuned
var massFactor = 1; // to be tuned

var updatePhysics = function(modifier) {
  
}
var updateCollisions = function(modifier) {

  
  // // Are they touching?
  // if (
  //   hero.x <= (monster.x + 32)
  //   && monster.x <= (hero.x + 32)
  //   && hero.y <= (monster.y + 32)
  //   && monster.y <= (hero.y + 32)
  // ) {
  //   ++monstersCaught;
  //   //reset();
  // }
}

// Update game objects
var update = function (modifier) {
  updateInput(modifier);
  updatePhysics(modifier);
  updateCollisions(modifier);
  
};

// Draw everything
var render = function () {
  

  // if (hero.x >= canvas.width)
  //   hero.x = 0;
  
  if (bg1Ready) {
    ctx.drawImage(bg1Image, -hero.x, hero.angle);
  }
  // if (bg2Ready) {
  //   ctx.drawImage(bg2Image, -hero.x + canvas.width, 0);
  // }

  // hero.position = hero.V_x + 32
  // if (heroReady) {
  //   //ctx.drawImage(heroImage, hero.V_x, hero.y);
    
  //   drawSprite(heroImage, hero.position, hero.y, hero.angle, 1)
  //   //      imageObject, x, y, rotation, scale)
  //   //XXX: do I need to convert angle from/to radians?
  // }

  // if (monsterReady) {
  //   ctx.drawImage(monsterImage, monster.x, monster.y);
  // }

  if (39 in keysDown && flamesReady) { // Engine goes!
    drawSprite(flamesImage, hero.position-Math.cos(hero.angle)*64, hero.y + Math.sin(hero.angle)*64, hero.angle, 1)

    //ctx.drawImage(flamesImage, hero.position - 64, hero.y+32);
  }
  
  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  // ctx.fillText("FP?: " + delta + "\nangle: " + hero.angle, 32, 10);//monstersCaught, 32, 32);
  // ctx.fillText("On ground?: "+ onGround, 32, 42);//monstersCaught, 32, 32);

};

// The main game loop
var now;
var delta;
var main = function () {
  now = Date.now();
  delta = now - then;

  update(delta / 1000);
  render();

  then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 30); // Execute as fast as possible