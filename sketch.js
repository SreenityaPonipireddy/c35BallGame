var ball;
//first step
var database;
var position;

function setup(){
    //connecting with firebase 
    database=firebase.database();
    createCanvas(500,500);
    //Your sprite
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //Creating reference to database
    //position has x and y values
    //.ref is used to create reference to the location of the database value
    var ballP=database.ref('ball/position');
    //.on creates listener which keeps listening to the changes in the database only because of that, 
    //we can see the changes
    //listen to the VALUE
    ballP.on("value",readPosition);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
//Writing back (updating) to the DB
function writePosition(x,y){
    //.set is a keyword that sets value in the database
    //writing back in the DB
   database.ref('ball/position').set({
       //DB positions (x,y)
       'x' : position.x+x,
       'y' : position.y+y
   })
}
function readPosition(data){
    //val is an inbuilt function to retrieve data from the stored database
    position=data.val();
    //ball- your sprites 
    //and positions refers to DB
    ball.x=position.x;
    ball.y=position.y;
}

