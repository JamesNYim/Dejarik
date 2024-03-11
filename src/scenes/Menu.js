class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene")
	}

	preload() {
		//this.load.image('menuBackground', './assets/MenuAssets/menuBackground.png')
		this.load.image('PlayButton', './assets/MenuAssets/Play_Button.png')
		this.load.audio('buttonSFX', './assets/MenuAssets/buttonClickSound.wav')
	}	

	create() {
		this.background = this.add.sprite(
			0,
			0,
			'menuBackground')
		.setOrigin(0, 0)

		this.playButton = this.add.image(
			game.config.width / 2,
			game.config.width / 2,
			'PlayButton'
		)
		this.playButton.setInteractive()
		this.playButton.on('pointerdown', () =>
			this.sceneChange('playScene', 'buttonSFX'))
	}

	sceneChange(scene, sfx) {
		this.sound.play(sfx)
		this.time.delayedCall(100, () => {
			this.scene.start(scene)
		}, [], this)
	}
}