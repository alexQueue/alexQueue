//Game logic and boilerplate code

// Create the canvas
// var canvas = document.createElement("canvas");
var canvas = document.getElementById("canvas");
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

function planet(x,y,radius,r,g,b, V_x, V_y)
{
  this.x=x;
  this.y=y;
  this.radius=radius;
  this.r=r;
  this.g=g;
  this.b=b;
  this.V_x=V_x;
  this.V_y=V_y;
  this.A_x = 0;
  this.A_y = 0;

  // function updateAcceleration() {
  //   updateAcceleration(this);
  // }
}
// function planet(position, velocity, radius, r,g,b) {
//   this.position = position;
//   this.velocity = velocity;
//   this.acceleration = new vector(0, 0);
//   this.radius = radius;
//   this.r = r;
//   this.g = g;
//   this.b = b;
// }
function vector(x, y) {
  this.x=x;
  this.y=y;
}
var system = {};
var planets = [
    new planet(100,100,50, 0, 0, 255, 0, 0)
  ];

// Reset the game when the player catches a monster
var reset = function () {
  console.log('reset');
};


//Physics
//global physics vars
var gravity = 1;    // to be tuned
var massFactor = 1; // to be tuned

var updatePhysics = function(modifier) {
  updateEulerHalfstep(modifier);
  updateCollisions(modifier);
};
function updateAcceleration (system) {
  // system is any planetary system. Can be global planets object or a derivation of it.
  for (j=0;j<system.length;j++) {
    for (k=j;k<system.length;k++) {
      var gravity_vector = new vector(0, 0);
      var distance_vector = new vector((system[j].x - system[k].x), (system[j].y - system[k].y) );

      var distance = Math.sqrt( Math.pow((system[j].x - system[k].x), 2) - Math.pow((system[j].y - system[k].y), 2) );
      if (2*distance < system[j].radius || 2*distance < system[k].radius) {
        gravity_vector = {x: 0, y: 0};
      } else {
        var C = gravity * system[j].mass * system[k].mass / Math.pow(distance, 3);
        gravity_vector = {x: C * distance_vector.x}
      }
      system[j].addForce(gravity_vector);
      // Circle(planets[i].x, planets[i].y, planets[i].radius, planets[i].r, planets[i].g, planets[i].b);
    }
  }
}
var updateEulerHalfstep = function(modifier) {
  dt = modifier;
  /* 
     Step 1:
        Advance position by half a timestep:
        p_(n+1/2) = p_n + v_n*dt/2
     Step 2:
        Calculate accelerations at these positions: 
        a_(n+1/2) = f(p_n+1/2)
     Step 3:
        Advance velocity using new a_n+1/2: 
        v_(n+1) = v_n + a_(n+1/2) * dt
     Step 4:
        Advance position with an average of velocities:
        p_(n+1) = p_n + (v_n + v_(n+1)) * dt/2
     */

  // Step 1: Advance position by half a timestep
  var halfStep = jQuery.extend({},planets);

  for (i=0; i<halfStep.length; i++) {
    halfStep[i].x = halfStep[i].x + halfStep[i].V_x*dt/2.0;
    halfStep[i].y = halfStep[i].y + halfStep[i].V_y*dt/2.0;
  }

  // NOT DONE
  /*
    //Step 3: Advance velocity using new a_n+1/2
    for (int i = 0; i < [self.planets count]; i++) {
        Planet *current = [self.planets objectAtIndex:i];
        Planet *halfStepPlanet = [halfStep.planets objectAtIndex:i];
        
        [current setVelocity:GLKVector2Add(current.velocity, GLKVector2MultiplyScalar(halfStepPlanet.acceleration, dt))];
    }
    //Step 4: Advance position with an average of velocities
    // Note: Since I haven't changed velocities in halfStep system, I can those as my V_n, where self is V_(n+1)
    for (int i = 0; i < [self.planets count]; i++) {
        Planet *current = [self.planets objectAtIndex:i];
        if (!current.paused) {
            Planet *halfStepPlanet = [halfStep.planets objectAtIndex:i];
            [current setPosition:GLKVector2Add(current.position, GLKVector2MultiplyScalar( GLKVector2Add(current.velocity, halfStepPlanet.velocity), dt/2.0))];
        }
    } */

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
};

// Update game objects
var update = function (modifier) {
  updateInput(modifier);
  updatePhysics(modifier);
  updateCollisions(modifier);
  
};

// Draw everything
var render = function () {
  
  if (bg1Ready) {
    ctx.drawImage(bg1Image, 0, 0);
  }
  for (i=0;i<planets.length;i++) {
    Circle(planets[i].x, planets[i].y, planets[i].radius, planets[i].r, planets[i].g, planets[i].b);
    // console.log("Key is "+i+" and Value is "+array[i]);
  }
  // Circle(100,100,50, 255, 0, 0 );
  
  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("FP?: " + delta + "\nblah", 32, 32);//monstersCaught, 32, 32);

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