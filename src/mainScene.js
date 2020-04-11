class mainScene extends Phaser.Scene{

	constructor(){
		super('mainScene');
	}

	init(data){
		console.log(data);
	}

	preload(){
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

		this.load.audio("dice" , "./assets/sounds/dice_1.mp3");
		this.load.audio("cups" , "./assets/sounds/cups.mp3");
		this.load.audio("pawn" , "./assets/sounds/pawn.mp3");
		this.load.audio("police" , "./assets/sounds/police.mp3");
		this.load.audio("rollAgain" , "./assets/sounds/roll_again.mp3");
		this.load.audio("toilet" , "./assets/sounds/toilet.mp3");
		this.load.audio("win" , "./assets/sounds/win.mp3");

	}

	create(){

		const background=this.add.image(0,0,"board").setOrigin(0,0);
		// background.setInteractive();
		// background.on('pointerdown', () => { boxes.push([game.input.mousePointer.x,game.input.mousePointer.y])});

		for(var i=1;i<=numberOfPlayers;i++){	//create all the cups for the number of players
			const pin=this.add.image(boxes[0][0],boxes[0][1],"pin_"+(i)).setOrigin(0.5,0.9).setScale(0.5,0.5);
			const nameText=this.add.text(boxes[0][0],boxes[0][1], " " + names[i-1] + " ");
			nameText.setOrigin(0.5,0.5);
			nameText.setBackgroundColor("#ffffff");
			nameText.setColor('#010101');
			Pins.push(pin);
			namesTexts.push(nameText);
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


		diceSound=this.sound.add('dice');				//sounds
		cupsSound=this.sound.add('cups');
		pawnSound=this.sound.add('pawn');
		policeSound=this.sound.add('police');
		rollAgainSound=this.sound.add('rollAgain');
		toiletSound=this.sound.add('toilet');
		winSound=this.sound.add('win');




	}

	update(time,delta){
		rollTheDice();
		movement();

	}

}