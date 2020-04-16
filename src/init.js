//------------------------------------------------------------------------------------------------------
//------------------------------------------ M E N U -----------------------------------
//------------------------------------------------------------------------------------------------------


var mainMenu = document.getElementById("mainMenu");

var inputNumberPlayers=document.getElementById("inputNumberOfPlayers");

var N1=document.getElementById("N1");
var N2=document.getElementById("N2");
var N3=document.getElementById("N3");
var N4=document.getElementById("N4");
var N5=document.getElementById("N5");
var N6=document.getElementById("N6");

names=[N1.value,N2.value,N3.value,N4.value,N5.value,N6.value]

var containerN1=document.getElementById("containerN1");
var containerN2=document.getElementById("containerN2");
var containerN3=document.getElementById("containerN3");
var containerN4=document.getElementById("containerN4");
var containerN5=document.getElementById("containerN5");
var containerN6=document.getElementById("containerN6");

var containers=[containerN1,containerN2,containerN3,containerN4,containerN5,containerN6];
var gameContainer=document.getElementById("container");
var menuContainer=document.getElementById("menu");

var rulesImage;
var button_rules;

var numberOfPlayers=2;

showNames();

inputNumberPlayers.addEventListener('change', (event)=>{showNames()})


function openNumberPlayers(){
	mainMenu.style.display = 'none';
	menu.style.display = 'block'
}


function startGame(){
	menu.style.display = 'none';
	names=[N1.value,N2.value,N3.value,N4.value,N5.value,N6.value]
	initGame();
	
}

function showNames(){
	
	if(parseInt(inputNumberPlayers.value)>6) inputNumberPlayers.value=6;
	if(parseInt(inputNumberPlayers.value)<2) inputNumberPlayers.value=2;

	for(var i=0;i<6;i++){

		containers[i].style.display="none";
		
	}
	for (var i=0;i<inputNumberPlayers.value;i++){
		containers[i].style.display="block";
	}

	numberOfPlayers=parseInt(inputNumberPlayers.value);

}

function GoToMenu(){
	menu.style.display = 'block';
	gameContainer.style.display = 'none';
}



//------------------------------------------------------------------------------------------------------
//------------------------------------- G A M E    V A R I A B L E S -----------------------------------
//------------------------------------------------------------------------------------------------------





var boxes=[[ 230, 93 ] ,[ 294, 88 ] ,[ 358, 86 ] ,[ 430, 82 ] ,[ 508, 75 ] ,[ 595, 73 ] ,[ 681, 75 ] ,[ 771, 89 ] ,[ 844, 101 ] ,[ 925, 130 ] ,[ 986, 174 ] ,[ 1013, 242 ] ,[ 1030, 306 ] ,[ 1040, 378 ] ,[ 1051, 451 ] ,[ 1035, 524 ] ,[ 1000, 587 ] ,[ 940, 622 ] ,[ 860, 646 ] ,[ 740, 653 ] ,[ 635, 647 ] ,[ 571, 640 ] ,[ 479, 622 ] ,[ 364, 579 ] ,[ 341, 462 ] ,[ 340, 343 ] ,[ 358, 235 ] ,[ 422, 159 ] ,[ 482, 135 ] ,[ 557, 126 ] ,[ 642, 127 ] ,[ 715, 137 ] ,[ 790, 156 ] ,[ 876, 198 ] ,[ 936, 295 ] ,[ 958, 414 ] ,[ 938, 514 ] ,[ 862, 571 ] ,[ 783, 584 ] ,[ 695, 584 ] ,[ 570, 569 ] ,[ 458, 520 ] ,[ 439, 417 ] ,[ 449, 319 ] ,[ 489, 216 ] ,[ 634, 188 ] ,[ 779, 218 ] ,[ 854, 318 ] ,[ 861, 428 ] ,[ 790, 512 ] ,[ 661, 513 ] ,[ 552, 470 ] ,[ 537, 341 ] ,[ 598, 254 ] ,[ 702, 260 ] ,[ 788, 342 ] ,[ 772, 432 ] ,[ 687, 445 ] ,[ 614, 424 ] ,[ 613, 341 ] ,[ 683, 320 ] ,[ 730, 368 ] ,[ 668, 376 ]]

var specialBoxes={
	B5:{type:"dice"},
	B6:{type:"toilet"},
	B9:{type:"drink" , imageNumber:0},
	B18:{type:"drink" , imageNumber:1},
	B19:{type:"toilet"},
	B27:{type:"drink" , imageNumber:2},
	B31:{type:"drink" , imageNumber:3},
	B36:{type:"police" , returnTo:13},
	B42:{type:"drink" , imageNumber:4},
	B45:{type:"dice"},
	B50:{type:"toilet"},
	B53:{type:"police" , returnTo:24},
	B54:{type:"drink" , imageNumber:5},
	B56:{type:"police" , returnTo:47},
	B58:{type:"drink" , imageNumber:6},
	B63:{type:"win"}
};

var Pins=[];
var Infos=[];
var Dices=[];
var namesTexts=[];

var pinStates=[0,0,0,0,0,0];  //states for the dice
const waiting=0;		
const moving=1;
const moveWithPolice=2;
const rollAgain=3;

var remaining=[0,0,0,0,0,0];	//when a player gets more than what he needs to go to the goal

var toiletes=[0,0,0,0,0,0];		//the variable is 0 if the player loses his next turn


var currentPos=	[0,0,0,0,0,0];
var nextPos =	[0,0,0,0,0,0];

var turn=0;

var movementStop=0;

var diceSpeed=0;
var currentDice=0;
var valDice=0;
var canRoll=true;

//sounds
var diceSound;
var cupsSound;
var pawnSound;
var policeSound;
var rollAgainSound;
var toiletSound;
var winSound;

//turn
var textTurn="";
var cupTurn=[];

//buttons
var buttonPlayAgain;
var buttonMenu;

var buttonPlayAgain_2;
var buttonMenu_2;

function getRandomNumber(){
	return Math.floor(Math.random() * 6)+1;  

}

function movePin(pinNumber){

	if(diceSpeed<0.01 && canRoll){
		closeAllInfos();
		closeRules();	
		diceSound.play();
		diceSpeed=40;
		valDice=getRandomNumber();
		nextPos[pinNumber]=currentPos[pinNumber]+valDice;
		if(nextPos[pinNumber]>62){
			remaining[pinNumber]=nextPos[pinNumber]-62;
			nextPos[pinNumber]=62;
		}
		pinStates[pinNumber]=moving;
	}
	
}

function distance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

}

function renderMovement(pinNumber,dirX,dirY){

	var velocity=5;

	if(nextPos[pinNumber]!==currentPos[pinNumber] ){
		Pins[pinNumber].x+=velocity*dirX;
		Pins[pinNumber].y+=velocity*dirY;

		namesTexts[pinNumber].x+=velocity*dirX;
		namesTexts[pinNumber].y+=velocity*dirY;
	}


}

function getDirection(x1,y1,x2,y2){
	var _distance=distance(x1,y1,x2,y2);
	var vector=[(x2-x1)/_distance,(y2-y1)/_distance];
	return vector;

}

function nextTurn(){
	cupTurn[turn].setVisible(false);
	if (turn===numberOfPlayers-1){
		turn=0;
	}
	else turn++;

	if(toiletes[turn]===1){
		toiletes[turn]=0;
		nextTurn();
	}
	cupTurn[turn].setVisible(true);
	textTurn.text=names[turn];
}

function rollTheDice(delta){

	if(diceSpeed>0){
		diceSpeed*=0.95;

		var aaa=Math.random();

		if(diceSpeed>5){
			if(Math.random()>0.9){

				Dices[currentDice].visible=false;
				currentDice = currentDice<5 ? currentDice+1: 0;
				Dices[currentDice].visible=true;
			}
		}
		else{
			Dices[currentDice].visible=false;
			currentDice=valDice-1;
			Dices[currentDice].visible=true;
		}

		for(var i=0;i<6;i++){
			Dices[i].angle+=diceSpeed;
		}

		if(diceSpeed<0){ 
			diceSpeed=0;			
		}
	}
}

function movement(){
	if(pinStates[turn]===moving && diceSpeed<2){

		if( distance(Pins[turn].x , Pins[turn].y , boxes[nextPos[turn]][0] , boxes[nextPos[turn]][1]  ) >10){


			if(remaining[turn]!==-1){
				//Move to the next box
				if(distance(Pins[turn].x , Pins[turn].y , boxes[currentPos[turn]+1][0] , boxes[currentPos[turn]+1][1]  ) <10){
					pawnSound.play();
					currentPos[turn]+=1;
					movementStop=10;
				}

				var direction= getDirection(Pins[turn].x , Pins[turn].y , boxes[currentPos[turn]+1][0] , boxes[currentPos[turn]+1][1] );
				
			}
			else{
				//move to the previous box
				if(distance(Pins[turn].x , Pins[turn].y , boxes[currentPos[turn]-1][0] , boxes[currentPos[turn]-1][1]  ) <10){
					currentPos[turn]-=1;
					movementStop=10;
				}
				var direction= getDirection(Pins[turn].x , Pins[turn].y , boxes[currentPos[turn]-1][0] , boxes[currentPos[turn]-1][1] );
			}
			if(stopPins())
				renderMovement(turn,direction[0],direction[1]);
		}
		else{ //reaches the destination

			currentPos[turn]=nextPos[turn];
			if(remaining[turn]===-1) remaining[turn]=0;

			var specialBox=specialBoxes["B"+(currentPos[turn]+1)];		//If the player gets to a special box
			if(specialBox!==undefined){
				if(specialBox.type=="police"){
					policeSound.play();
					nextPos[turn]=specialBoxes["B" + (currentPos[turn]+1)].returnTo;
					pinStates[turn]=moveWithPolice;
					
				}
				else if(specialBox.type==="dice"){
					rollAgainSound.play();
					pinStates[turn]=rollAgain;
				}
				else if (specialBox.type==="toilet"){
					checkOverlay();
					toiletSound.play();
					toiletes[turn]=1;
					pinStates[turn]=waiting;
					nextTurn();
				}
				else if(specialBox.type==="drink"){
					cupsSound.play();
					Infos[specialBox.imageNumber].visible=true;
					pinStates[turn]=waiting;
					nextTurn();
				}
				else if(specialBox.type==="win"){
					
					if(remaining[turn]>0){
						nextPos[turn]-=remaining[turn];
						remaining[turn]=-1;
					}
					else if(remaining[turn]==0){
						winSound.play();
						showVictory();
						nextTurn();
					}
				}

			}
			else{
				pawnSound.play();
				checkOverlay();
				pinStates[turn]=waiting;
				nextTurn();
			}	
		}
	}
	else if(pinStates[turn]===moveWithPolice){
		if( distance(Pins[turn].x , Pins[turn].y , boxes[nextPos[turn]][0] , boxes[nextPos[turn]][1]  ) >10){
			var direction= getDirection(Pins[turn].x , Pins[turn].y , boxes[nextPos[turn]][0] , boxes[nextPos[turn]][1] );
			renderMovement(turn,direction[0],direction[1]);
		}
		else{
			currentPos[turn]=nextPos[turn];
			pinStates[turn]=waiting;
			nextTurn();
		}
	}
}


function checkOverlay(){
	for (var i=0;i<numberOfPlayers;i++){
		if (currentPos[turn]===currentPos[i] && i!== turn){
			cupsSound.play();
			Infos[7].visible=true;
			return true;
		}
	}
	return false;
}

function stopPins(){
	if(movementStop>0){
		movementStop--;
		return false;
	}
	return true;
}


const config={
	width:1280,
	height: 720,
	parent : "container",
	type: Phaser.AUTO,
	scene: [mainScene]
}

function showVictory(){
	Infos[8].visible=true;
	buttonMenu.visible=true;
	buttonPlayAgain.visible=true;
	console.log("the winner is " + names[turn]);
	canRoll=false;
}

function initGame(){
	var Game=new Phaser.Game(config);
}

function goToMenu(){
	location.reload();
}


function closeAllInfos(){
	for(var i=0;i<Infos.length;i++){
		Infos[i].visible=false;
	}
}

function restart(){
	currentPos=[0,0,0,0,0,0];
	nextPos=[0,0,0,0,0,0];
	var pinStates=[0,0,0,0,0,0]; 
	turn=0;
	canRoll=true;

	for (var i=0;i<numberOfPlayers;i++){
		Pins[i].x=boxes[0][0];
		Pins[i].y=boxes[0][1];
		namesTexts[i].x=boxes[0][0];
		namesTexts[i].y=boxes[0][1];
	}
	closeAllInfos();
	buttonPlayAgain.visible=false;
	buttonMenu.visible=false;

}

function overlayNames(){
	//return all the names to their respective positions
	for (var i=0;i<numberOfPlayers;i++){
		namesTexts[i].setOrigin(0.5,0);
	}
	for (var i=0;i<numberOfPlayers-1;i++){
		var offset=1.1;
		for (var j=i+1; j< numberOfPlayers;j++){
			if(currentPos[i]===currentPos[j]){
				namesTexts[i].setOrigin(0.5,0+offset);
				offset+=1.1;
			}
		}
	}
}

function showRules(){
	rulesImage.setVisible(true);
}

function closeRules(){
	rulesImage.setVisible(false);
}