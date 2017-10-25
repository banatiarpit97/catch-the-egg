var chickWidth = $("#chicken1").width();
var basketWidth = $("#basket").width();
var basketInitial = ($(window).width()/2)-(basketWidth/2);
$("#basket").css("left", basketInitial)
var maxX = $(window).width()-basketWidth;
var game = true;
var score = 0;
var lives = 3;
$(document).keydown(function(e){
	if(e.keyCode == '39' && game){
    moveRight();
	}
	else if(e.keyCode == '37' && game){
    moveLeft();
	}
  else if(e.keyCode == '32'){
    pause();
  }
});

function moveRight(){
  basketLeft = $("#basket").position().left;
  basketLeft+=30;
  if(basketLeft>maxX){
    console.log("hh")
    $("#basket").css("left", 0);
    return;
  }
  $("#basket").css("left", basketLeft);
}

function moveLeft(){
  basketLeft = $("#basket").position().left;
  basketLeft-=30;
  if(basketLeft<0){
    console.log("ll")
    $("#basket").css("left", maxX);
    return;
  }
  $("#basket").css("left", basketLeft);
}

$(document).mousemove(function(event){
  if(game){
    mouseX = event.pageX;
    imgWidth = $("#basket").width();
    mouseX = mouseX - (imgWidth/2);
    $("#basket").css("left", mouseX);
  }  
});

function generateEgg(){
  randomChickNumber = (Math.floor(Math.random()*4))+1;
  randomChickId = "chicken"+randomChickNumber;
  chickLeft = document.getElementById(randomChickId).offsetLeft;
  EggLeft = chickLeft+(chickWidth/2);
  $("#egg").removeClass("hidden").css({"left": EggLeft, "top":"20%"});
  interval = setInterval(moveDown, 150);
};

generateEgg();

function moveDown(){
  EggTop = $("#egg").position().top;
  EggTop+=30;
  $("#egg").css("top", EggTop);
  checkDown();
}

function checkDown(){
  if((($("#egg").position().top)>=($("#basket").position().top+55))&&($("#egg").position().left>=$("#basket").position().left)&&($("#egg").position().left<=($("#basket").position().left+basketWidth))){
    score++;
    $("#score").html(score);
    clearInterval(interval);
    $("#egg").addClass("hidden");
    generateEgg();
  }
  else if(($("#egg").position().top)>=($("#basket").position().top+55)){
    lives--;
    $(".life").eq(lives).addClass("hidden")
    clearInterval(interval);
    $("#egg").addClass("hidden");
    document.getElementById("hit").play();
    $("#brokenegg").removeClass("hidden").css("left", EggLeft);
    afterBroken = setTimeout(function(){
      $("#brokenegg").addClass("hidden");
      generateEgg();
    }, 300)
  }
}

function pause(){
  if(game){
    clearInterval(interval);
    game = false;
  }
  else{
    game = true;
    interval = setInterval(moveDown, 150);
  }
}
