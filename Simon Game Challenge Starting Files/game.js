var userClickedPattern=[];
var randomNumber;
var userChosenColor;
var started=false;
var level=0;
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
    userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}
);

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+ currentColor).removeClass("pressed");
},100
);
}
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
}
);
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000
            );
        }
    }
    else{
         playSound("wrong");
         $("body").addClass("game-over");
         setTimeout(function(){
             $("body").removeClass("game-over")
         },200
         );
         $("#level-title").text("Game over, Press Any Key to Restart");
         startOver();
    }
}
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

















