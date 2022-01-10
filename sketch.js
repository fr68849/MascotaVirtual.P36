var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var addFeed;

//crea aquí las variables feed y lastFed 
var feed, lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro

  addFeed= createButton("Alimenta al perro");
  addFeed.position(800,150);
  addFeed.mousePressed(feedDog);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,190);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  feed=database.ref("FeedTime");
  feed.on("value",function(data){
    lastFeed=data.val();
  });

  fill(0);
  textSize(18);
  //escribe el código para mostrar el texto lastFed time aquí
  if(lastFeed>=12){
    text("Última hora en la que se alimentó: "+lastFeed%12 + "PM",350,30);
  }else if(lastFeed===0){
    text("Última hora en que se alimentó: 12 AM",350,30);
  } else{
    text("Última hora en que se alimentó: "+lastFeed+ "AM",350,30);
  }
  
    
  

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  } else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
  })

}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
