class Menu extends MasterScene {
	constructor() {
		super("menuScene")
	}

	preload() {
		this.load.image('menuBackground', './assets/MenuAssets/menuBackground.png')
		this.load.image('PlayButton', './assets/MenuAssets/Play_Button.png')
		this.load.image('CreditsButton', './assets/MenuAssets/Credits_Button.png')
		this.load.image('HowToPlayButton', './assets/MenuAssets/How_to_play_button.png')
		this.load.image('DejarikTitle', './assets/MenuAssets/DejarikTitle.png')
		
	}	

	create() {
		this.background = this.add.sprite(
			0,
			0,
			'menuBackground')
		.setOrigin(0, 0)

		this.title = this.add.image(
			game.config.width / 2,
			game.config.height - 80,
			'DejarikTitle'
		)
		this.playButton = this.add.image(
			game.config.width / 2,
			game.config.width / 2,
			'PlayButton'
		)
		this.playButton.setInteractive()
		this.playButton.on('pointerdown', () =>
			this.sceneChange('playScene', 'buttonSFX'))

		this.creditsButton = this.add.image(
			game.config.width / 2,
			game.config.height / 2 + 50,
			'CreditsButton'
		)
		this.creditsButton.setInteractive()
		this.creditsButton.on('pointerdown', () =>
			this.sceneChange('creditsScene', 'buttonSFX'))

		this.howToPlayButton = this.add.image(
			game.config.width / 2,
			game.config.height / 2 + 100,
			'HowToPlayButton'
		)
		this.howToPlayButton.setInteractive()
		this.howToPlayButton.on('pointerdown', () =>
			this.sceneChange('howToPlayScene', 'buttonSFX'))
	}
}