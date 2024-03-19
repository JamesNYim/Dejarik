class HowToPlay extends MasterScene {
	constructor() {
		super("howToPlayScene")
	}

	preload() {
		this.load.image('HowToPlayButton', './assets/MenuAssets/How_to_play_button.png')
		this.load.image('HowToPlayBackground', './assets/MenuAssets/HowToPlayBackground.png')
		this.load.image('combatButton', './assets/MenuAssets/CombatButton.png')
	}
	create() {

		this.background = this.add.image(
			0,
			0,
			'HowToPlayBackground'
		).setOrigin(0, 0)
		
		this.combatButton = this.add.image(
			game.config.width / 4,
			game.config.height * .85,
			'combatButton'
		)
		.setInteractive()
		.on('pointerdown', () => {
			this.sceneChange('combatScene', 'buttonSFX');
		});

		this.backButton = this.add.image(
			game.config.width - 64,
			game.config.height - 24,
			'backButton'
		)
		this.backButton.setInteractive()
		this.backButton.on('pointerdown', () => {
			this.sceneChange('combatScene', 'buttonSFX');
		});
	}
	
}