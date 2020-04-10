const config={
	width:1280,
	height: 720,
	parent : "container",
	type: Phaser.AUTO,
	scene: {
		preload: preload,
		create: create,
		update: update
	}

}



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

var pinStates=[0,0,0,0,0,0];  //states for the dice
const waiting=0;		
const moving=1;
const moveWithPolice=2;
const rollAgain=3;

var remaining=[0,0,0,0,0,0];	//when a player gets more than what he needs to go to the goal

var toiletes=[0,0,0,0,0,0];		//the variable is 0 if the player loses his next turn


var currentPos=	[0,0,0,0,0];
var nextPos =	[0,0,0,0,0,0];
const numberOfPlayers=3;
var turn=0;

var movementStop=0;

var diceSpeed=0;
var currentDice=0;
var valDice=0;

var game=new Phaser.Game(config);

function preload(){
	this.load.image("pin_1","./assets/images/Pedina-bianca.png");		//load the cups
	this.load.image("pin_2","./assets/images/Pedina-blu.png");
	this.load.image("pin_3","./assets/images/Pedina-gialla.png");
	this.load.image("pin_4","./assets/images/Pedina-rossa.png");
	this.load.image("pin_5","./assets/images/Pedina-verde.png");
	this.load.image("pin_6","./assets/images/Pedina-viola.png");

	this.load.image("board","./assets/images/gioco_dell_uva_bg_2.jpg");		//load the board

	this.load.image("info_1","./assets/images/info_1.jpg");			//load the info images
	this.load.image("info_2","./assets/images/info_2.jpg");
	this.load.image("info_3","./assets/images/info_3.jpg");
	this.load.image("info_4","./assets/images/info_4.jpg");
	this.load.image("info_5","./assets/images/info_5.jpg");
	this.load.image("info_6","./assets/images/info_6.jpg");
	this.load.image("info_7","./assets/images/info_7.jpg");

	this.load.image("dice_1" ,"./assets/images/dice_1.png");		//load the dice images
	this.load.image("dice_2" ,"./assets/images/dice_2.png");
	this.load.image("dice_3" ,"./assets/images/dice_3.png");
	this.load.image("dice_4" ,"./assets/images/dice_4.png");
	this.load.image("dice_5" ,"./assets/images/dice_5.png");
	this.load.image("dice_6" ,"./assets/images/dice_6.png");
	this.load.image("dadi" , "./assets/images/rotolare_dadi.png");

}

function create(){

	const background=this.add.image(0,0,"board").setOrigin(0,0);
	// background.setInteractive();
	// background.on('pointerdown', () => { boxes.push([game.input.mousePointer.x,game.input.mousePointer.y])});

	for(var i=1;i<=numberOfPlayers;i++){	//create all the cups for the number of players
		const pin=this.add.image(boxes[0][0],boxes[0][1],"pin_"+(i)).setOrigin(0.5,0.9).setScale(0.5,0.5);
		Pins.push(pin);
	}

	for(var i=1;i<=7;i++){			//create all the info boxes
		const info=this.add.image(1280/2,720/2,"info_"+i);
		info.setInteractive();
		info.on('pointerdown' , ()=>{info.visible=false; info.setScale(1,1) });
		info.on('pointerover', ()=> {	info.setScale(1.1,1.1);});
		info.on('pointerout', ()=> {	info.setScale(1,1);});
		info.visible=false;
		Infos.push(info);
	}

	for(var i=1;i<=6;i++){			//create all the dice images
		const dice=this.add.image(150,400,"dice_"+i);
		dice.setScale(0.4,0.4);
		dice.visible=false;
		dice.depth=1;
		Dices.push(dice);
	}
	Dices[0].visible=true;


	const dadiButton = this.add.image(150, 400, 'dadi').setScale(0.5,0.5);		//button to roll the dice
	dadiButton.setInteractive();
	dadiButton.on('pointerdown', ()=> {	movePin(turn);});
	dadiButton.on('pointerover', ()=> {	dadiButton.setScale(0.6,0.6);});
	dadiButton.on('pointerout', ()=> {	dadiButton.setScale(0.5,0.5);});

}

function update(time,delta){
	rollTheDice();
	movement();

}

function getRandomNumber(){
	return Math.floor(Math.random() * 6)+1;  

}

function movePin(pinNumber){

	if(diceSpeed<0.4){
		diceSpeed=40;
		valDice=getRandomNumber();
		nextPos[pinNumber]=currentPos[pinNumber]+valDice;
		if(nextPos[pinNumber]>62){
			remaining[pinNumber]=nextPos[pinNumber]-62;
			nextPos[pinNumber]=62;
		}
		pinStates[pinNumber]=moving;}

	}

	function distance(x1,y1,x2,y2){
		return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

	}

	function renderMovement(pinNumber,dirX,dirY){

		var velocity=5;

		if(nextPos[pinNumber]!==currentPos[pinNumber] ){
			Pins[pinNumber].x+=velocity*dirX;
			Pins[pinNumber].y+=velocity*dirY;

		}


	}

	function getDirection(x1,y1,x2,y2){
		var _distance=distance(x1,y1,x2,y2);
		var vector=[(x2-x1)/_distance,(y2-y1)/_distance];
		return vector;

	}

	function nextTurn(){
		if (turn===numberOfPlayers-1){
			turn=0;
		}
		else turn++;

		if(toiletes[turn]===1){
			toiletes[turn]=0;
			nextTurn();
		}
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
					nextPos[turn]=specialBoxes["B" + (currentPos[turn]+1)].returnTo;
					pinStates[turn]=moveWithPolice;
					
				}
				else if(specialBox.type==="dice"){
					console.log("player " + turn + " roll the dice again");
					pinStates[turn]=rollAgain;
					//roll the dice again, nothing happens
				}
				else if (specialBox.type==="toilet"){
					console.log('Player ' + turn + " loses the next turn");
					toiletes[turn]=1;
					pinStates[turn]=waiting;
					nextTurn();
				}
				else if(specialBox.type==="drink"){
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
						// WIIIIN
						console.log("the winner is!");
					}
				}

			}
			else{

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

function stopPins(){
	if(movementStop>0){
		movementStop--;
		return false;
	}
	return true;
}