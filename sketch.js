var dog,dogImage,happyDogImage;
var database;
var Food,foodStock;
var milk,milkImg
var addFood,feed,addFoods,feedDog
var food
var fedTime,lastFeedTime
var data
function preload()
{
	dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1200, 500);
dog=createSprite(800,300)
dog.addImage(dogImage)
dog.scale=0.2
database=firebase.database();
foodStock=database.ref("food")
foodStock.on("value",readStock)
addFood=createButton("ADD FOOD")
addFood.position(800,95)
addFood.mousePressed( addFoods )
feed =createButton("FEED THE DOG")
feed.position(900,95)
feed.mousePressed(feedDog)
foodStock=database.ref("food")
foodStock.on("value",readStock)
food=new Foods();
}


function draw() {  
  background("green")
  fedTime=database.ref("feedTime")
  fedTime.on("value",function( data ){
    lastFeedTime=data.val()
  })
  drawSprites();
  food.display();
  fill("black")
  textSize(30)
  text("Last Feed Time :"+ lastFeedTime,100,80)
}

function readStock(data){
 Food=data.val();
 food.updateFood(Food)
}
function writeStrock(x){
  if(x<=0){
    x = 1
  }
  x=x-1;
database.ref('/').update({
  food:x
})
}
function addFoods(){
  Food++
  dog.addImage(dogImage)
  database.ref('/').update({
    food:Food,
  })
    
  
}
function feedDog(){
  if(Food>0){
  Food--;
  dog.addImage(happyDogImage)
  database.ref('/').update({
    food:Food,
    feedTime:hour()
  })
}
}















