var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running

 var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstaclesGroup

var score = 0;
var survivalTime;

var ground;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  dImage = loadImage("sprite_2.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  jump = loadSound("jump.mp3")
  
}



function setup() {
  createCanvas(400, 400);
  
 ground = createSprite (200, 350, 420, 20);
 ground.x = ground.width /2;
 
 monkey = createSprite(50, 310, 30, 30);
 monkey.addAnimation("moving", monkey_running);
 monkey.addAnimation("caught", dImage);
 monkey.scale = 0.1
 monkey .debug = false;
 monkey.setCollider("Rectangle", 0, 0, monkey.height, monkey.width) ;

  obstaclesGroup = createGroup();
  foodGroup = createGroup();

  
}


function draw() {
  background(rgb(191, 251, 254));
  
  if(gameState === PLAY){
  
  stroke("black");
  textSize(20);
  fill("ligtblue");
  text("Score : " + score, 300, 50)  
  
  stroke("black");
  textSize(25);
  fill("ligtblue");
  survivalTime = Math.ceil(frameCount/frameRate()/ 300)
  text("Survival Time : " + survivalTime, 100, 100);  
    
  if(monkey.isTouching(foodGroup)){
   score = score + 1;
   foodGroup.destroyEach();
}
  
  ground.velocityX = -4
    
  monkey.collide(ground);  
 
  if(ground.x < 200){
    ground.x = ground.width/2
  }

    if(keyDown("space")&& monkey.y > 310) {
        monkey.velocityY = -12;
        jump.play();
    }
    
   monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(obstaclesGroup)){
      
      monkey.collide(obstaclesGroup)
      gameState = END;
      
    }
  
  }
  
  if(gameState === END){
      
    stroke("black");
    textSize(35);
    fill("red");
    text("Game Over", 130, 200)
    
      ground.velocityX = 0;
      monkey.velocityY = 0;
      monkey.changeAnimation("caught", dImage);
      monkey.x = 50;
    
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0); 
   
    foodGroup.destroyEach();
    foodGroup.velocityX = 0;
  
  }
  
  obstacles();
  foods();
  
  drawSprites();
        
}

function obstacles(){
  
  if (frameCount % 250 === 0){
  var obstacle = createSprite(420, 320, 50, 50);
  obstacle.addImage(obstaceImage);
  obstacle.velocityX = -4;
  obstacle.lifetime = 350;
  obstacle.scale = 0.1;
  obstacle.debug = false;
  obstacle.setCollider("Rectangle", 0, 0,               obstacle.width, obstacle.height);
  
  obstaclesGroup.add(obstacle);
  }
       
}

function foods(){
  
  if (frameCount % 80 === 0){
  var food = createSprite(420, 320, 50, 50);
  food.y = Math.round(random(180, 270));
  food.addImage(bananaImage);
  food.velocityX = -4;
  food.lifetime = 350;
  food.scale = 0.1;
  food.debug = false;
  food.setCollider("Rectangle", 0, 0, food.width,       food.height);
  
  foodGroup.add(food) ;
  }
 
  }



