var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern =[];
var level =0;

var started=false;

//programme

$(document).keydown(function(event){
if(!started){nextSeuence();
  started=true;
}
});


$(".btn").click(function(){
var userChosenColor =$(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound("sounds/"+userChosenColor+".mp3");
animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1);
});




//functions

function playSound(name){
  var audio =new Audio(name);
  audio.play();
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}




function nextSeuence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound("sounds/"+randomChosenColor+".mp3");
  $("#level-title").text("Level "+level);
  level++;
}




function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");


    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSeuence();
      },1000);
    }
  }
  else{
  playSound("sounds/wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over. Press any Key to Restart");
  startOver();
  }
}



function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}
