class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}

	preload() {
		this.load.image('boardSprite', './assets/Board.png')
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
		/*this.board = this.add.sprite(
			0,
			0,
			'boardSprite')
			.setOrigin(0, 0)*/

		this.houjix = new Houjix(
			this,
			game.config.width / 2,
			game.config.height / 2,
			'houjixSprite',
			0,
			'houjixIdleSheet')
			.setOrigin(0,0)
		this.houjix.setInteractive({draggable: true})
		this.houjix.on('pointerover', () => console.log('pointer over'))
		
		
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
	
}