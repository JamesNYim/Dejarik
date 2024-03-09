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
		this.board = this.add.image(
			0,
			0,
			'boardSprite')
			.setOrigin(0,0)
		
		this.spaceGroup = this.physics.add.group()
		this.space = new Space(
			this,
			81,
			54,
			'white8x8',
			0,
			86,
			86,
			this.spaceGroup)
			.setOrigin(0, 0)

		this.space.spawnBoard()
		this.houjix = new Houjix(
			this,
			game.config.width / 2 - 10,
			game.config.height / 2 - 12,
			'houjixSprite',
			0,
			'Houjix',
			'houjixIdleSheet')
			.setOrigin(0,0)
		this.houjix.setSize(32, 32, false)
		this.houjix.setInteractive({draggable: true})
		this.houjix.on('pointerup', (pointer) => {
			this.onDragEnd(pointer, this.houjix)
		})


		this.ghhk = new Ghhk(
			this,
			game.config.width / 2 - 10,
			game.config.height / 2 - 12,
			'ghhkSprite',
			0,
			'Ghhk',
			'ghhkIdleSheet')
			.setOrigin(0,0)
		this.ghhk.setSize(32, 32, false)
		this.ghhk.setInteractive({draggable: true})
		this.ghhk.on('pointerup', (pointer) => {
			this.onDragEnd(pointer, this.ghhk)
		})
	
		this.strider = new Strider(
			this,
			game.config.width / 2 - 10,
			game.config.height / 2 - 12,
			'striderSprite',
			0,
			'Strider',
			'striderIdleSheet')
			.setOrigin(0,0)
		this.strider.setSize(32, 32, false)
		this.strider.setInteractive({draggable: true})
		this.strider.on('pointerup', (pointer) => {
			this.onDragEnd(pointer, this.strider)
		})
	
		this.savrip = new Savrip(
			this,
			game.config.width / 10,
			game.config.height / 12,
			'savripSprite',
			0,
			'Savrip',
			'savripIdleSheet')
			.setOrigin(0,0)
		this.savrip.setSize(32, 32, false)
		this.savrip.setInteractive({draggable: true})
		this.savrip.on('pointerup', (pointer) => {
			this.onDragEnd(pointer, this.savrip)
		})

		this.klorslug = new Klorslug(
			this,
			game.config.width / 2 - 10,
			game.config.height / 2 - 12,
			'klorslugSprite',
			0,
			'Klorslug',
			'klorslugIdleSheet')
			.setOrigin(0,0)
		this.klorslug.setSize(32, 32, false)
		this.klorslug.setInteractive({draggable: true})
		this.klorslug.on('pointerup', (pointer) => {
			this.onDragEnd(pointer, this.klorslug)
		})
		

	}

	update() {
		this.houjix.pieceStateMachine.step()
		this.ghhk.pieceStateMachine.step()
		this.klorslug.pieceStateMachine.step()
		this.savrip.pieceStateMachine.step()
		this.strider.pieceStateMachine.step()
	}

	pointerDown() {
		return true
	}

	pointerOver() {
		return true
	}

	onDragEnd(pointer, piece) {
		let finalSpace = this.getFinalSpace(pointer.x, pointer.y) 
		piece.moveTo(finalSpace)
	}

	getFinalSpace(x, y) {
		for (let space of this.spaceGroup.getChildren()) {
			if (this.isInsideSpace(x, y, space)) {
				return space
			}
		}
		return null
	}

	isInsideSpace(x, y, space) {
		let leftWall = space.x - space.width / 2
		let rightWall = space.x + space.width /2
		let topWall = space.y - space.height / 2
		let botWall = space.y + space.height / 2

		return x >= leftWall && x <= rightWall && y >= topWall && y <= botWall
	}
}