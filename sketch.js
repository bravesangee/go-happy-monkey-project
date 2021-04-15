var bananaImg, bananaGroup;
var obstacleImage, obstaclesGroup;
var scene, backgroundImg, score, ground;
var player, monkey;

function preload() {

  backgroundImg = loadImage("jungle.jpg");

  player = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  obstacleImage = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
}

function setup() {
  createCanvas(500, 400);

  scene = createSprite(0, 20, 400, 400);
  scene.addImage(backgroundImg);
  scene.x = scene.width / 2;

  monkey = createSprite(40, 280, 20, 20);
  monkey.addAnimation("Player", player);
  monkey.scale = 0.1;

  ground = createSprite(200, 320, 600, 5);
  ground.visible = false;

  obstaclesGroup = new Group();
  bananaGroup = new Group();

  score = 0;
}

function draw() {

  scene.velocityX = -8;
  if (scene.x < 0) {
    scene.x = scene.width / 2;
  }
  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -17;
  }
  console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(ground);

  
  if(frameCount%60===0){
  obstacle=createSprite(390,670,20,20)
  obstacle.velocityX=-8     
  obstacle.addImage("rrs",obstacleImage)
  obstacle.y=Math.round(random(280,280))
  obstacle.scale=0.2
    obstaclesGroup.add(obstacle)
  }
  
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, random(110, 190), 20, 20);
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -8;
    banana.lifetime = 64;
    bananaGroup.add(banana);
  }
 

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 5;
    
  }

  switch (score) {
    case 1:
      monkey.scale = 0.12;
      break;
    case 2:
      monkey.scale = 0.13; 
      break;
    case 3:
      monkey.scale = 0.14;
      break;
    case 4:
      monkey.scale = 0.15;
      break;
    case 5:
      monkey.scale = 0.16;
      break;
    default:
      break;
  }

  drawSprites();
  if(obstaclesGroup.isTouching(monkey)){
    monkey.velocityX=0;
    textSize(40);
    text("gameOver",200,200)
    scene.velocityX=0;
    bananaGroup.setVelocityEachX(0)
    obstaclesGroup.setVelocityEachX(0)
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
  stroke("white");
  textSize(22);
  fill("white");
  text("Score : " + score, 300, 80)
}