var dog, dogIMG, happyDogIMG;
var database, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj, milk, milkIMg;
var bedroomIMG, gardenIMG, washroomIMG;
var readState, time;

function preload(){
  dogIMG = loadImage("Images/Dog.png");
  happyDogIMG = loadImage("Images/Happy.png");
  milkIMG = loadImage("Images/Milk.png");
  bedroomIMG = loadImage("Images/Bed Room.png");
  gardenIMG = loadImage("Images/Garden.png");
  washroomIMG = loadImage("Images/Wash Room.png");  
}

function setup(){
  database = firebase.database();
  createCanvas(500, 600);
  
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });

  dog = createSprite(280,500,150,150);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  milk = createSprite(195,520,50,50);
  milk.addImage(milkIMG);
  milk.visible = false;
  milk.scale = 0.1;

  feedPet = createButton("FEED THE DOG");
  feedPet.position(430, 65);
  feedPet.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(550, 65);
  addFood.mousePressed(addFoods);
}

function draw(){
  background(46, 139, 87);
 
  time = hour();
  if(time ===(lastFed+1)){
    update("Playing");
    foodObj.garden();  
  }
  else if(time ===(lastFed+2) || (time>(lastFed+8) && time<(lastFed + 12)) ){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(time >(lastFed+2) && time <=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
	
  if(gameState!="Hungry"){
    feedPet.hide();
    addFood.hide();
    milk.remove();
    dog.remove();
  }  
  else{
    feedPet.show();
    addFood.show();
    dog.addImage("dogG", dogIMG);
  }
  fill("black");
  textSize(20);
  if(lastFed>12){
    text("Last Feed: " + lastFed%12 + " PM", 30, 30);
  }
  else if(lastFed === 0){
    text("Last Feed: 12 AM", 30, 30);
  }
  else{
    text("Last Feed: " + lastFed + " PM", 30, 30);
  }
  drawSprites();
  text("Food Stock: " + foodS, 30, 60);
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogIMG);
  milk.visible = true;
  if(foodS>0){
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour(), 
      gameState: "Hungry"
    })
  }
}

function addFoods(){
  if(foodS<50){
    foodS++;
    database.ref('/').update({
      Food: foodS
    })
  }
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}
