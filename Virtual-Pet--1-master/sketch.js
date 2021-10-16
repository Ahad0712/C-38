//Create variables here
var dog, dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(800, 700);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  textSize(20);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  readStock();
  writeStock();

  drawSprites();
  //add styles here
  fill("white");
  stroke("black");
  text("Food reamining : "+foodS,170,200);
  textSize(15);
  text("Note : press up arrow key to feed milk",130,10,300,20);


}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
  if (x<=0) {
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food: x
  })
}
