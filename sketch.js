var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog,dogImg,bone1;
var groundImage;
var bone,boneImage,boneGroup;
var stone,stoneImage,stoneGroup;



var score;

function preload(){
  dog_running = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png");
  groundImage = loadImage("road img.jpg")
  boneImage = loadImage("bone.png")
  stoneImage = loadImage("stone.png")

  gameOverImage = loadImage("game over.png")
  restartImg = loadImage("restart.png")
}

function setup(){
  createCanvas(800,400);

  ground = createSprite(300,180);
  ground.addImage("ground",groundImage);
  ground.scale = 4
  //ground.x = ground.width /2;
  
  dog = createSprite(800,170,800,50);
  dog.addAnimation("running", dog_running);
  edges = createEdgeSprites();
  dog.scale = 0.5;
  dog.x = 650

   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);

  restart = createSprite(300,10);
  restart.addImage(restartImg);
  restart.scale = 0.2

  boneGroup = createGroup();
  stoneGroup = createGroup(); 

  score = 0;

}


function draw(){
  
  background(900);
  //display score
  text("Score: "+ score, 500,50);

  //console.log("this is ",gamestate)

  if(gameState===PLAY)
  {
    gameOver.visible = false
    restart.visible = false

     //move the ground
  ground.velocityX = 4;

  //scoring
  score = score + Math.round(frameCount/60);

  if(ground.x>=400){
    ground.x=ground.width/2
  }
   
  //jump when the space key is preesed
  if(keyDown("space")&& dog.y >=100){
    dog.velocityY = -12;
  }

  //add gravity
  //dog.velocityY = dog.velocityY + 0.8

  //spawn the bones
 spawnBone();

 //spawn the stones
 spawnStone();

 if(stoneGroup.isTouching(dog)){
   gameState = END;
 }
 }
 else if (gameState === END){
  gameOver.visible = true;
  restart.visible = true;
 
   ground.velocityX = 0;
   dog.velocityY = 0;
 }

  drawSprites();
}

function spawnBone(){
  // write your code here 
  if(frameCount%100 === 0){
    bone=createSprite(600,100,40,90)
    bone.addImage(boneImage)
    bone.y=Math.round(random(10,60))
    bone.scale=0.20
    bone.velocityX=-3
 
    bone.depth=dog.depth
    dog.depth=dog.depth+1

    boneGroup.add(bone);

    bone.lifetime = 134;
    
  }
 }

 function spawnStone(){
   //adding stones
   if(frameCount % 60 === 0){
     stone = createSprite(600,100,40,90)
     stone.addImage(stoneImage)
     stone.y = Math.round(random(10,100));
     stone.scale = 0.20
     stone.velocityX = -3

     stone.depth = dog.depth
     dog.depth = dog.depth+1

     stoneGroup.add(stone);

     stone.lifetime = 134;
   }
 }