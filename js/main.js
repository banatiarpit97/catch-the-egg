var chickWidth = $("#chicken1").width();
var basketWidth = $("#basket").width();
var basketInitial = ($(window).width()/2)-(basketWidth/2);
$("#basket").css("left", basketInitial)
var maxX = $(window).width()-basketWidth;
console.log(maxX)
$(document).keydown(function(e){
	if(e.keyCode == '39'){
    moveRight();
	}
	else if(e.keyCode == '37'){
    moveLeft();
	}
});

function moveRight(){
  basketLeft = $("#basket").position().left;
  basketLeft+=30;
  console.log(basketLeft)

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
    mouseX = event.pageX;
    imgWidth = $("#basket").width();
    mouseX = mouseX - (imgWidth/2);
    $("#basket").css("left", mouseX);
});

function generateEgg(){
  randomChickNumber = (Math.floor(Math.random()*4))+1;
  randomChickId = "chicken"+randomChickNumber;
  chickLeft = document.getElementById(randomChickId).offsetLeft;
  EggLeft = chickLeft+(chickWidth/2);
  $("#egg").removeClass("hidden").css({"left": EggLeft, "top":"18%"});
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
    clearInterval(interval);
    $("#egg").addClass("hidden");
    generateEgg();
  }
  else if(($("#egg").position().top)>=($("#basket").position().top+55)){
    clearInterval(interval);
    $("#egg").addClass("hidden");
    $("#brokenegg").removeClass("hidden").css("left", EggLeft);
    afterBroken = setTimeout(function(){
      $("#brokenegg").addClass("hidden");
      generateEgg();
    }, 300)
  }
}