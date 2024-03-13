class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}

	preload() {
		this.load.image('boardSprite', './assets/BoardAssets/DejarikBoard.png')
		this.load.image('white8x8', './assets/BoardAssets/White_8x8.png')
		
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
	
	}

	create() {
		//Debugging:
		keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.board = this.add.image(
			0,
			0,
			'boardSprite')
			.setOrigin(0,0)
		this.spaceGroup = this.physics.add.group()
		this.spawnBoard()

		this.pieceGroup = this.physics.add.group()
		this.createPieces()

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
	}

	createPieces() {
		this.houjix = new Houjix(
			this,
			164,
			141,
			'houjixSprite',
			0,
			'Houjix',
			this.pieceGroup,
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
			243,
			135,
			'ghhkSprite',
			0,
			'Ghhk',
			this.pieceGroup,
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
			326,
			316,
			'striderSprite',
			0,
			'Strider',
			this.pieceGroup,
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
			'savripIdleSheet'
			)
			.setOrigin(0,0)
		this.savrip.setSize(32, 32, false)
		this.savrip.setInteractive({draggable: true})
		this.savrip.on('pointerup', (pointer) => {
			this.savrip.pieceStateMachine.transition('idle');
			this.checkOverlap(this.savrip)
		})

		this.klorslug = new Klorslug(
			this,
			238,
			309,
			'klorslugSprite',
			0,
			'Klorslug',
			this.pieceGroup,
			'klorslugIdleSheet')
			.setOrigin(0,0)
		this.klorslug.setSize(32, 32, false)
		this.klorslug.setInteractive({draggable: true})
		this.klorslug.on('pointerup', (pointer) => {
			console.log("pointer up")
			this.klorslug.pieceStateMachine.transition('idle');
			this.checkOverlap(this.klorslug)
		})
	}

	checkOverlap(piece) {
		let overlappedSpace = null
		this.spaceGroup.getChildren().forEach(space => {
			if (this.isInsideSpace(piece.x, piece.y, space)) {
				overlappedSpace = space;
				overlappedSpace.getPieces()
			}
		});
	
		if (overlappedSpace) {
			console.log(`${piece.name} overlapped with space at ${overlappedSpace.boardCoords}`);
			piece.setCurrentSpace(overlappedSpace)
			//overlappedSpace.addPiece(piece)
			/*
			if (overlappedSpace.getPieces().length > 0) {
				overlappedSpace.getPieces().forEach(p => {
					console.log(`[${overlappedSpace.boardCoords}] Pieces occupying: ${p.name}`)
				})
			}
			*/
		}
		
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
		for (var xCoord = 0; xCoord < 5; ++xCoord) {
			for (var yCoord = 0; yCoord < 5; ++yCoord) {
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
	pointerDown() {
		return true
	}

	pointerOver() {
		return true
	}
	isInsideSpace(x, y, space) {
		let leftWall = space.x - space.width / 2
		let rightWall = space.x + space.width /2
		let topWall = space.y - space.height / 2
		let botWall = space.y + space.height / 2

		return x >= leftWall && x <= rightWall && y >= topWall && y <= botWall
	}
}