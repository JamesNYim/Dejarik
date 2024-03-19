class Play extends MasterScene {
	constructor() {
		super("playScene")
	}

	preload() {
		this.load.image('team1Win', './assets/MenuAssets/Team1Win.png')
		this.load.image('team2Win', './assets/MenuAssets/Team2Win.png')

		this.load.audio('backgroundMusic', './assets/BoardAssets/star wars ~ cantina band ~ lofi.wav')
		this.load.image('boardSprite', './assets/BoardAssets/DejarikBoard.png')
		this.load.image('white8x8', './assets/BoardAssets/White_8x8.png')
		this.load.image('bloodSprite', './assets/pieceAssets/BloodSprite.png')

		this.load.image('houjixSprite', './assets/pieceAssets/houjixAssets/houjix.png')
		this.load.spritesheet('houjixIdleSheet', './assets/pieceAssets/houjixAssets/houjixStatic.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})
		this.load.image('ghhkSprite', './assets/pieceAssets/GhhkAssets/ghhk-1.png')
		this.load.spritesheet('ghhkIdleSheet', './assets/pieceAssets/GhhkAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})
		this.load.image('klorslugSprite', './assets/pieceAssets/klorslugAssets/klorslug-1.png')
		this.load.spritesheet('klorslugIdleSheet', './assets/pieceAssets/klorslugAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})
		this.load.image('savripSprite', './assets/pieceAssets/SavripAssets/MantellianSavrip-1.png')
		this.load.spritesheet('savripIdleSheet', './assets/pieceAssets/SavripAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})
		this.load.image('striderSprite', './assets/pieceAssets/StriderAssets/strider-1.png')
		this.load.spritesheet('striderIdleSheet', './assets/pieceAssets/StriderAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})

		this.load.image('ngokSprite', './assets/pieceAssets/NgokAssets/Ngok-1.png')
		this.load.spritesheet('ngokIdleSheet', './assets/pieceAssets/NgokAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})

		this.load.image('monnokSprite', './assets/pieceAssets/MonnokAssets/Monnok-1 .png')
		this.load.spritesheet('monnokIdleSheet', './assets/pieceAssets/MonnokAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})

		this.load.image('grimtashSprite', './assets/pieceAssets/GrimtashAssets/Grimtash-1.png')
		this.load.spritesheet('grimtashIdleSheet', './assets/pieceAssets/GrimtashAssets/spritesheet.png',
		{
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 1
		})
	
	}

	create() {
		//Debugging:
		keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.music = this.sound.add('backgroundMusic', { loop: true });
        this.music.play();

		this.board = this.add.image(
			0,
			0,
			'boardSprite')
			.setOrigin(0,0)
		this.spaceGroup = this.physics.add.group()
		this.spawnBoard()

		this.pieceGroup = this.physics.add.group()
		this.teamOne = this.add.group()
		this.teamTwo = this.add.group()
		this.createPieces()

		this.backButton = this.add.image(
			game.config.width - 64,
			game.config.height - 24,
			'backButton'
		)
		this.backButton.setInteractive()
		this.backButton.on('pointerdown', () => {
			this.sceneChange('menuScene', 'buttonSFX');
			this.music.stop()
		});
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(keyJUMP)) {
			this.pieceGroup.getChildren().forEach(p => {
				console.log(`${p.name}'s current space is ${p.getCurrentSpace().boardCoords} with coordinates of ${p.x}, ${p.y}`)

			})
		}
		this.houjix.pieceStateMachine.step()
		this.ghhk.pieceStateMachine.step()
		this.klorslug.pieceStateMachine.step()
		this.savrip.pieceStateMachine.step()
		this.strider.pieceStateMachine.step()
		this.monnok.pieceStateMachine.step()
		this.grimtash.pieceStateMachine.step()
		this.ngok.pieceStateMachine.step()

		if (this.teamOne.countActive() <= 0) {
			this.add.image(
				game.config.width / 2,
				game.config.height / 2,
				'team1Win'
			)
			this.time.addEvent({
				delay: 2500,
				callback: ()=>{
					this.sceneChange('menuScene', 'buttonSFX')
					this.music.stop()
				},
			})
		}

		if (this.teamTwo.countActive() <= 0) {
			this.add.image(
				game.config.width / 2,
				game.config.height / 2,
				'team2Win'
			)
			this.time.addEvent({
				delay: 2500,
				callback: ()=>{
					this.sceneChange('menuScene', 'buttonSFX')
					this.music.stop()
				},
			})
		}
	}

	createPieces() {
		const pieceStartingPos = {
			houjix: [2, 0], // scout
			klorslug: [1, 1], //offensive
			savrip: [3, 1], //Power
			ngok: [2, 1], // Defense

			ghhk: [2, 4], //scout
			monnok: [1, 3], //Power
			grimtash: [3, 3], // offensive
			strider: [2, 3] // defense
		}

		this.houjix = new Houjix(
			this,
			243,
			31,
			'houjixSprite',
			0,
			'Houjix',
			this.pieceGroup,
			this.teamOne,
			'houjixIdleSheet')
			.setOrigin(0,0)
		this.houjix.setSize(32, 32, false)
		this.houjix.setInteractive({draggable: true})
		
		this.houjix.on('pointerup', (pointer) => {
			this.houjix.pieceStateMachine.transition('idle');
			this.checkOverlap(this.houjix)
		})


		this.ghhk = new Ghhk(
			this,
			253,
			407,
			'ghhkSprite',
			0,
			'Ghhk',
			this.pieceGroup,
			this.teamTwo,
			'ghhkIdleSheet')
			.setOrigin(0,0)
		this.ghhk.setSize(32, 32, false)
		this.ghhk.setInteractive({draggable: true})
		this.ghhk.on('pointerup', (pointer) => {
			this.ghhk.pieceStateMachine.transition('idle');
			this.checkOverlap(this.ghhk)
		})
	
		this.strider = new Strider(
			this,
			249,
			306,
			'striderSprite',
			0,
			'Strider',
			this.pieceGroup,
			this.teamTwo,
			'striderIdleSheet')
			.setOrigin(0,0)
		this.strider.setSize(32, 32, false)
		this.strider.setInteractive({draggable: true})
		this.strider.on('pointerup', (pointer) => {
			this.strider.pieceStateMachine.transition('idle');
			this.checkOverlap(this.strider)
		})
	
		this.savrip = new Savrip(
			this,
			328,
			136,
			'savripSprite',
			0,
			'Savrip',
			this.pieceGroup,
			this.teamOne,
			'savripIdleSheet'
			)
			.setOrigin(0,0)
		this.savrip.setSize(32, 32, false)
		this.savrip.setInteractive({draggable: true})
		this.savrip.on('pointerup', (pointer) => {
			console.log(`savrip released`)
			this.savrip.pieceStateMachine.transition('idle');
			this.checkOverlap(this.savrip)
		})

		this.klorslug = new Klorslug(
			this,
			158,
			130,
			'klorslugSprite',
			0,
			'Klorslug',
			this.pieceGroup,
			this.teamOne,
			'klorslugIdleSheet')
			.setOrigin(0,0)
		this.klorslug.setSize(32, 32, false)
		this.klorslug.setInteractive({draggable: true})
		this.klorslug.on('pointerup', (pointer) => {
			this.klorslug.pieceStateMachine.transition('idle');
			this.checkOverlap(this.klorslug)
		})

		this.ngok = new Ngok(
			this,
			249,
			130,
			'ngokSprite',
			0,
			'ngok',
			this.pieceGroup,
			this.teamOne,
			'ngokIdleSheet')
			.setOrigin(0,0)
		this.ngok.setSize(32, 32, false)
		this.ngok.setInteractive({draggable: true})
		this.ngok.on('pointerup', (pointer) => {
			this.ngok.pieceStateMachine.transition('idle');
			this.checkOverlap(this.ngok)
		})

		this.monnok = new Monnok(
			this,
			152,
			308,
			'monnokSprite',
			0,
			'monnok',
			this.pieceGroup,
			this.teamTwo,
			'monnokIdleSheet')
			.setOrigin(0,0)
		this.monnok.setSize(32, 32, false)
		this.monnok.setInteractive({draggable: true})
		this.monnok.on('pointerup', (pointer) => {
			this.monnok.pieceStateMachine.transition('idle');
			this.checkOverlap(this.monnok)
		})

		this.grimtash = new Grimtash(
			this,
			330,
			306,
			'grimtashSprite',
			0,
			'grimtash',
			this.pieceGroup,
			this.teamTwo,
			'grimtashIdleSheet')
			.setOrigin(0,0)
		this.grimtash.setSize(32, 32, false)
		this.grimtash.setInteractive({draggable: true})
		this.grimtash.on('pointerup', (pointer) => {
			this.grimtash.pieceStateMachine.transition('idle');
			this.checkOverlap(this.grimtash)
		})

		this.assignStartingSpace(pieceStartingPos);
	}

	assignStartingSpace(positions) {
		for (const pieceName in positions) {
			const [x, y] = positions[pieceName];
			const startingSpace = this.findSpaceByCoords(x, y);

			if (startingSpace) {
				const piece = this[pieceName];
				piece.setCurrentSpace(startingSpace);
			}
		}
	}

	findSpaceByCoords(x, y) {
		return this.spaceGroup.getChildren().find(space => 
			space.boardCoords[0] === x && space.boardCoords[1] === y
		)
	}

	checkOverlap(piece) {
		let isLegal = false
		this.spaceGroup.getChildren().forEach(space => {

			if (this.isInsideSpace(piece.x, piece.y, space)) {

				if (piece.isLegalMove(space))
				{
					isLegal = true
					if (piece.getCurrentSpace() !== space) {
						piece.setCurrentSpace(space)
						console.log(space.boardCoords)
					}
					if (space.isOccupiedByMultiplePieces()) {
						// Handle the case where multiple pieces are in the same space
						//console.log(`Conflict in space ${space.boardCoords}:`, space.getPieces().map(p => p.name));
						space.resolveSpaceConflict();
						this.time.addEvent({
							delay: 1000,
							callback: ()=>{
								let targetPiece = space.getPieces().find(p => p !== piece);
								piece.pieceStateMachine.transition('attack', targetPiece)
							},
						})
						//piece.pieceStateMachine.transition('attack', p)
						
					}
				}
				if (!isLegal) {
					console.log(`Illegal Move`)
					console.log(`x: ${piece.originalX}, y: ${piece.originalY}`)
					this.tweens.add({
						targets: piece,
						x: piece.originalX,
						y: piece.originalY,
						ease: 'Power1',
						duration: 1000,
						onComplete: () => {
							console.log(`${piece.name} returned to its original pos`)
						}
					})
				}
			}
		});
	}

	spawnBoard() {
		let initX = 38
		let initY = 10
		let currentX = initX
		let currentY = initY
		let height = 88
		let width = 86
		var xCoord = 0
		var yCoord = 0
		for (var yCoord = 0; yCoord < 5; ++yCoord) {
			for (var xCoord = 0; xCoord < 5; ++xCoord) {
				var boardCoords = [xCoord, yCoord]
				let space = new Space(
					this,
					currentX,
					currentY,
					null,
					0,
					width,
					height,
					this.spaceGroup,
					boardCoords)
					.setOrigin(0, 0)
				space.setBodySize(width, height)
				currentX += width + 6
			}
			currentX = initX
			currentY += height + 4

			
		}
	}

	isInsideSpace(x, y, space) {
		let leftWall = space.x;
		let rightWall = space.x + space.width;
		let topWall = space.y;
		let botWall = space.y + space.height;

		return x >= leftWall && x <= rightWall && y >= topWall && y <= botWall
	}
}