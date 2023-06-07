var ghost ,ghostImg;
var tower , towerImg;
var ground , groundImg;
var wood , woodImg , woodG;
var stone , stoneImg , stoneG;
var boy , boyImg , boyb , boyG;
var girl , girlImg , girlb , girlG;
var invisibleGround;
var gameOver , gameOverImg , restart , restartImg;

var PLAY = 1;
var END = 0
var gameState = PLAY;
var score = 0;

function preload(){
  ghostImg = loadImage("ghost2.png");
  towerImg = loadImage("1.jpg");
  woodImg = loadImage("wood.png");
  stoneImg = loadImage("stone.png");
  boyb = loadAnimation("BOY.png" , "BOY1.png" , "BOY2.png" , "BOY3.png");
  gameOverImg = loadImage("g.png");
  restartImg = loadImage("RESTART.png");
}

function setup() {
  createCanvas(900 , 600);
  tower = createSprite(600,300);
  tower.addImage("tower",towerImg);
  tower.scale = 0.7;
  tower.velocityX = -5;

  ghost = createSprite(300 , 450);
  ghost.addImage(ghostImg);
  ghost.scale = 0.13;
  ghost.setCollider("rectangle",0,0,1200,ghost.height);
  ghost.debug = false;

  invisibleGround = createSprite(450,560,900,20);
  invisibleGround.visible = false;

  gameOver = createSprite(500,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,380);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.2;

  createBoy();

  woodG = new Group();
  stoneG = new Group();
}

function draw() {

  background(120);
  fill("black");
  if (gameState === PLAY) 
  {
    gameOver.visible = false;
    restart.visible = false;

    score = score + Math.round(getFrameRate()/120);

    if (tower.x < 230){
      tower.x = 500;
    }
    
    if(woodG.isTouching(ghost))
    {
      ghost.velocityY = -12;    
    }
  
    if(stoneG.isTouching(ghost))
    {
      ghost.velocityY = -12;    
    }
  
    if (keyDown("space")) {
      boy.velocityY =  -10;
      //ghost.velocityY = -10;
    }
  
    if(boy.isTouching(woodG))
    { 
      //boy.velocityX = 0;   
      gameState = END;
      boy.destroy();
      ghost.destroy();
    }
  
    if(boy.isTouching(stoneG))
    {
     // boy.velocityX = 0;
      gameState = END; 
      boy.destroy();
      ghost.destroy();  
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    boy.velocityY = boy.velocityY + 0.8;
  
    boy.collide(invisibleGround);
  
    ghost.collide(invisibleGround);
  
    createWood();
    createStone();
    
    
  } else if(gameState === END)
  {
    gameOver.visible = true;
    restart.visible = true;

    tower.velocityX = 0;

    woodG.destroyEach();
    stoneG.destroyEach();

    if(mousePressedOver(restart)) 
      {
        reset();
      }
  }
 
  text("Score:" +score , 50 , 50); 

 
  drawSprites();
}

function reset()
{

  score = 0;

  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  tower.velocityX = -5;

  woodG.destroyEach();
  stoneG.destroyEach();

  ghost = createSprite(300 , 450);
  ghost.addImage(ghostImg);
  ghost.scale = 0.13;
  ghost.setCollider("rectangle",0,0,1200,ghost.height);
  ghost.debug = false;

  createBoy();
}

   function createBoy() 
   {
    boy = createSprite( 600 ,450);
    boy.addAnimation( "boycreate", boyb);
    boy.scale = 0.7;
    boy.setCollider("rectangle",0,0,boy.width,boy.height);
    boy.debug = false;
    ghost.x = boy.x - 300;

   // boy.velocityX = 5;

  }

function createWood() {
  if (frameCount % 120 === 0) {
    wood = createSprite(1220 , Math.round(random(500 , 518)));
    wood.addImage(woodImg);
    wood.scale = 0.3;
    wood.velocityX = -5;
    wood.lifetime = 500;
    wood.collide(invisibleGround);
    ghost.depth = wood.depth;
    ghost.depth += 1;

    woodG.add(wood);
  }
}

function createStone() {
  if (frameCount % 300 === 0) {
    stone = createSprite(1220 , Math.round(random(500 , 518)));
    stone.addImage(stoneImg);
    stone.scale = 0.3;
    stone.velocityX = -5;
    stone.lifetime = 500;
    stone.collide(invisibleGround);
    ghost.depth = stone.depth;
    ghost.depth += 1;

    stoneG.add(stone);
  }
}