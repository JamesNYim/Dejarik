class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}

	preload() {
		this.load.image('boardSprite', './assets/Board.png')
		this.load.image('houjixSprite', './assets/houjix.png')
		
	}

	create() {
		this.board = this.add.sprite(
			0,
			0,
			'boardSprite')
			.setOrigin(0, 0)

		this.houjix = new Houjix(
			this,
			game.config.width / 2,
			game.config.height / 2,
			'houjixSprite')
			
	}
}