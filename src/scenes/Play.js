class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}

	preload() {
		this.load.image('boardSprite', './assets/Board.png')
		
	}

	create() {
		this.board = this.add.sprite(
			0,
			0,
			'boardSprite')
			.setOrigin(0, 0)
	}
}