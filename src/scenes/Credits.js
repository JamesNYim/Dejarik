class Credits extends MasterScene {
	constructor() {
		super('creditsScene')
	}

	preload() {
		this.load.image('creditsMenuBackground', './assets/MenuAssets/CreditsPage.png')
	}

	create() {
		this.background = this.add.image(
			0,
			0,
			'creditsMenuBackground'
		)
		.setOrigin(0, 0)

		this.backButton = this.add.image(
			game.config.width - 64,
			game.config.height - 24,
			'backButton'
		)
		this.backButton.setInteractive()
		this.backButton.on('pointerdown', () => {
			this.sceneChange('menuScene', 'buttonSFX');
		});
	}
}