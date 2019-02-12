var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var spaceship =
{
    color: "red",
    width: 8,
    height: 22,
    position:
    {
        x: 20,
        y: 20
    },
    velocity:
    {
        x: 0,
        y: 0
    },
    angle: Math.PI / 2,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
    crashed: false,
    thrust: -.05
}
var lander = {
    color:"red",
    width: 200,
    height: 10,
    x:170,
    y:490,
}

function isHit(){
    if (lander.y < spaceship.position.y && (spaceship.position.x > lander.x && spaceship.position.x < (lander.x +lander.width))){
       alert("Hit!")
       document.location.reload();
       clearInterval(interval);

}
    
}
function isMiss(){
    if(spaceship.position.y > lander.y+10){
        alert("Miss!")
        document.location.reload();
        clearInterval(interval);

    }      

}
function drawLander(){
    context.save();
    context.beginPath();
    context.moveTo(0,500)
    context.rect(lander.x, lander.y, lander.width, lander.height);
    context.fillStyle = lander.color;
    context.fill();
    context.closePath();
}

var stars = [];
for (var i = 0; i < 500; i++) {
    stars[i] = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.sqrt(Math.random() * 2),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random()*0.05,
    };
  }

  function drawStars() {
    context.save();
    context.fillStyle = "#111"
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
      context.closePath();
      context.fillStyle = "#bbb";
      context.fill();
    }
    context.restore();
  }

function drawSpaceship()
{
    context.save();
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();

    // Draw the flame if engine is on
    if(spaceship.engineOn)
    {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 10);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    context.restore();
}


var gravity = 0.01;

function updateSpaceship()
{   
    
    spaceship.position.x += spaceship.velocity.x;
    spaceship.position.y += spaceship.velocity.y;
    if(spaceship.rotatingRight)
    {
        spaceship.angle += Math.PI / 180;
    }
    else if(spaceship.rotatingLeft)
    {
        spaceship.angle -= Math.PI / 180;
    }

    if(spaceship.engineOn)
    {
        spaceship.velocity.x += spaceship.thrust * Math.sin(-spaceship.angle);
        spaceship.velocity.y += spaceship.thrust * Math.cos(spaceship.angle);
    }
    spaceship.velocity.y += gravity;
    
    isHit();
    isMiss();
}




function keyLetGo(event)
{
    console.log(spaceship);
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = false;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = false;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            break;
    }
}

document.addEventListener('keyup', keyLetGo);

function keyPressed(event)
{
    console.log(spaceship);
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = true;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = true;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = true;
            break;
    }
}

function draw()
{
    // Clear entire screen
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateSpaceship();
    drawLander();
    // Begin drawing
    drawSpaceship();

    /* other draw methods (to add later) */
   
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyPressed);
drawLander();
draw();
