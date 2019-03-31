var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var evilBird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var snowball = new Image();

evilBird.src = "images/evilBird.png"
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
snowball.src = "images/snowball.png";




// some variables

var gap = 100;
var constant;

var bX = 10;
var bY = 150;

var sX = bX;
var sY = bY;

var gravity = 1.5;

var score = 0;

var circle  ={
    color:"red",
    width: 8,
    height: 22,
    position:
    {
        x:10,
        y:bY + 20
    }
    
}



// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp,false);
var shooting = false;

function moveUp(e){

    switch(e.keyCode){
        case 32:
        shoot();
        break;
        case 37:
        break;
        case 38:
        bY -= 25;
        break;
        case 39:
        break;
        case 40:
        break;
    }

    e.preventDefault();
    
    // fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};
//bullet
var bullet = [];

bullet[0] = {
    x : bX,
    y : bY
};


// draw images


var bullets = [];  
var bulletSpeed = 5;

function shoot(){  
  var snowball = new Image();
  snowball.src = "images/snowball.png";
  sX = bX;
  sY = bY;
  ctx.drawImage(snowball,sX,sY);
  bullets.push(snowball);
}

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        if(i >3 && i %2)//after the fourth pipe every other pipe has an evil bird
        ctx.drawImage(evilBird,pipe[i].x,pipe[i].y+constant-40);
    
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 

        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    sX +=bulletSpeed;

    

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();

