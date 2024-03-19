class HowToPlay extends MasterScene {
	constructor() {
		super("howToPlayScene")
	}

	preload() {
		this.load.image('HowToPlayButton', './assets/MenuAssets/How_to_play_button.png')
		this.load.image('HowToPlayBackground', './assets/MenuAssets/HowToPlayBackground.png')
		this.load.image('combatButton', './assets/MenuAssets/CombatButton.png')
		this.load.image('movementButton', ' ./assets/MenuAssets/MovementButton.png')
	}
	create() {

		this.background = this.add.image(
			0,
			0,
			'HowToPlayBackground'
		).setOrigin(0, 0)
		
		this.combatButton = this.add.image(
			game.config.width / 2,
			game.config.height * .9,
			'combatButton'
		)
		.setInteractive()
		.on('pointerdown', () => {
			this.sceneChange('combatScene', 'buttonSFX');
		});

		this.movementButton = this.add.image(
			game.config.width / 2,
			game.config.height * .8,
			'movementButton'
		)
		.setInteractive()
		.on('pointerdown', () => {
			this.sceneChange('movementScene', 'buttonSFX');
		});

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