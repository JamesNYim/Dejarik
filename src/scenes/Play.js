class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}

	preload() {
		this.load.image('boardSprite', './assets/BoardAssets/DejarikBoard.png')
		this.load.image('white8x8', './assets/BoardAssets/White_8x8.png')
		this.load.image('houjixSprite', './assets/houjix.png')
		this.load.spritesheet('houjixIdleSheet', './assets/houjixAssets/houjixStatic.png',
			{
				frameWidth: 32,
				FrameHeight: 32,
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
			'houjixIdleSheet')
			.setOrigin(0,0)
		this.houjix.setSize(32, 32, false)
		this.houjix.setInteractive({draggable: true})
		this.houjix.on('pointerup', (pointer) => {
			this.onDragEnd(pointer, this.houjix)
		})
		//this.physics.add.overlap(this.houjix, this.spaceGroup, this.pieceSpaceCollider, null, this)
	}

	update() {
		this.pieceStateMachine.step()
	}

	pointerDown() {
		//console.log('pointer down')
		return true
	}

	pointerOver() {
		return true
	}

	onDragEnd(pointer, piece) {
		let finalSpace = this.getFinalSpace(pointer.x, pointer.y) 
		if (piece.isValidMove(finalSpace)) {
			console.log("inSpace")
			piece.moveTo(finalSpace)
		}
		else {
			console.log("illegal move")
		}
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