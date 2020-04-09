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
	B9:{type:"drink" , imageName:""},
	B18:{type:"drink" , imageName:""},
	B19:{type:"toilet"},
	B27:{type:"drink" , imageName:""},
	B31:{type:"drink" , imageName:""},
	B36:{type:"police" , returnTo:13},
	B42:{type:"drink" , imageName:""},
	B45:{type:"dice"},
	B50:{type:"toilet"},
	B53:{type:"police" , returnTo:24},
	B54:{type:"drink" , imageName:""},
	B56:{type:"police" , returnTo:47},
	B58:{type:"drink" , imageName:""},
	B63:{type:"win"}
};

var Pins=[];

var pos=[boxes[0],boxes[0],boxes[0],boxes[0],boxes[0],boxes[0]];
var currentPos=[0,0,0,0,0,0];
const numberOfPlayers=3;
var turn=0;

var game=new Phaser.Game(config);

function preload(){
	this.load.image("pin_1","./assets/images/Pedina-bianca.png");
	this.load.image("pin_2","./assets/images/Pedina-blu.png");
	this.load.image("pin_3","./assets/images/Pedina-gialla.png");
	this.load.image("pin_4","./assets/images/Pedina-rossa.png");
	this.load.image("pin_5","./assets/images/Pedina-verde.png");
	this.load.image("pin_6","./assets/images/Pedina-viola.png");
	this.load.image("board","./assets/images/gioco_dell_uva_bg_2.jpg");

}

function create(){

	const background=this.add.image(0,0,"board").setOrigin(0,0);
	// background.setInteractive();
	// background.on('pointerdown', () => { boxes.push([game.input.mousePointer.x,game.input.mousePointer.y])});

	for(var i=1;i<=numberOfPlayers;i++){
		const pin=this.add.image(pos[0][0],pos[0][1],"pin_"+(i)).setOrigin(0.5,0.9).setScale(0.5,0.5);
		Pins.push(pin);
	}


	const helloButton = this.add.text(50, 600, 'Move!', { fill: '#0f0' });
	helloButton.setInteractive();
	helloButton.on('pointerdown', ()=> {
		movePin(turn);		
		if (turn===numberOfPlayers-1){
			turn=0;
		}
		else turn++;
	});
 

}

function update(time,delta){
	
}

function getRandomNumber(){
	return Math.floor(Math.random() * 6)+1;  

}

function movePin(pin){

	currentPos[pin]+=getRandomNumber();

	Pins[pin].x=boxes[currentPos[pin]][0];
	Pins[pin].y=boxes[currentPos[pin]][1]; 


	if(specialBoxes["B"+currentPos[pin]]!==undefined){
		console.log( specialBoxes["B"+currentPos[pin]].type );
	}

}