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
		this.load.image("info_8", "./assets/images/info_8.jpg");
		this.load.image("info_9","./assets/images/victory.jpg");
		this.load.image("button_menu" , "./assets/images/ritorna_menu.png");
		this.load.image("button_play_again" , "./assets/images/gioca_ancora.png");
		this.load.image("button_restart" , "./assets/images/restart.png");

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


		this.load.bitmapFont('Antenna', 'assets/fonts/antenna.png', 'assets/fonts/antenna.xml');		//load the font

	}

	create(){

		const background=this.add.image(0,0,"board").setOrigin(0,0);
		// background.setInteractive();
		// background.on('pointerdown', () => { boxes.push([game.input.mousePointer.x,game.input.mousePointer.y])});

		for(var i=1;i<=numberOfPlayers;i++){	//create all the cups for the number of players
			const pin=this.add.image(boxes[0][0],boxes[0][1],"pin_"+(i)).setOrigin(0.5 + (Math.random()-0.5)*0.1,0.9+ (Math.random()-0.5)*0.1).setScale(0.5,0.5);
			const nameText=this.add.text(boxes[0][0],boxes[0][1], " " + names[i-1] + " ");
			nameText.setOrigin(0.5,0.5);
			nameText.setBackgroundColor("#ffffff");
			nameText.setColor('#010101');
			Pins.push(pin);
			namesTexts.push(nameText);

			const turnCup=this.add.image(150,300,"pin_"+(i)).setOrigin(0.5,0.9).setScale(0.5,0.5).setVisible(false);
			cupTurn.push(turnCup);
		}

		cupTurn[0].setVisible(true);

		for(var i=1;i<=8;i++){			//create all the info boxes
			const info=this.add.image(1280/2,720/2,"info_"+i);
			info.setInteractive();
			info.on('pointerdown' , ()=>{info.visible=false; info.setScale(1,1) });
			info.on('pointerover', ()=> {	info.setScale(1.1,1.1);});
			info.on('pointerout', ()=> {	info.setScale(1,1);});
			info.visible=false;
			Infos.push(info);
		}


		const info=this.add.image(1280/2,720/2,"info_9");
		info.visible=false;
		Infos.push(info);
		

		buttonPlayAgain=this.add.image(730,415,"button_play_again");
		buttonPlayAgain.setInteractive();
		buttonPlayAgain.on('pointerdown' , restart);
		buttonPlayAgain.on('pointerover', ()=> {	buttonPlayAgain.setScale(1.1,1.1);});
		buttonPlayAgain.on('pointerout', ()=> {	buttonPlayAgain.setScale(1,1);});
		buttonPlayAgain.visible=false;


		buttonMenu=this.add.image(540,415,"button_menu").setScale(0.9);
		buttonMenu.setInteractive();
		buttonMenu.on('pointerdown' , goToMenu);
		buttonMenu.on('pointerover', ()=> {	buttonMenu.setScale(1.1,1.1);});
		buttonMenu.on('pointerout', ()=> {	buttonMenu.setScale(0.9,0.9);});
		buttonMenu.visible=false;


		buttonPlayAgain_2=this.add.image(150,590,"button_restart").setScale(0.9);
		buttonPlayAgain_2.setInteractive();
		buttonPlayAgain_2.on('pointerdown' , restart);
		buttonPlayAgain_2.on('pointerover', ()=> {	buttonPlayAgain_2.setScale(1);});
		buttonPlayAgain_2.on('pointerout', ()=> {	buttonPlayAgain_2.setScale(0.9);});



		buttonMenu_2=this.add.image(150,655,"button_menu").setScale(0.9);
		buttonMenu_2.setInteractive();
		buttonMenu_2.on('pointerdown' , goToMenu);
		buttonMenu_2.on('pointerover', ()=> {	buttonMenu_2.setScale(1);});
		buttonMenu_2.on('pointerout', ()=> {	buttonMenu_2.setScale(0.9);});




		for(var i=1;i<=6;i++){			//create all the dice images
			const dice=this.add.image(150,450,"dice_"+i);
			dice.setScale(0.4,0.4);
			dice.visible=false;
			dice.depth=1;
			Dices.push(dice);
		}
		Dices[0].visible=true;


		const dadiButton = this.add.image(150, 450, 'dadi').setScale(0.5,0.5);		//button to roll the dice
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

		textTurn=this.add.bitmapText(150,330,'Antenna',names[turn],24);
		textTurn.setOrigin(0.5,0.5);
		textTurn.tint='#010101';	

		var text = this.add.bitmapText(150,180,'Antenna',"È il turno di",24).setOrigin(0.5,0.5);
		text.tint='#010101';

		//var prueba = this.add.bitmapText(0,0, 'Antenna', 'aaaaaaaaaaaaaaaa', 64); 

	}

	update(time,delta){
		rollTheDice();
		movement();

	}

}