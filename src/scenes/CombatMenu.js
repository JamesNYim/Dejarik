class CombatMenu extends MasterScene {
	constructor() {
		super('combatScene')
	}

	preload() {
		this.load.image('combatMenuBackground', './assets/MenuAssets/Combat_menu_background.png')
	}

	create() {
		this.background = this.add.image(
			0,
			0,
			'combatMenuBackground'
		)
		.setOrigin(0, 0)

		this.backButton = this.add.image(
			game.config.width - 64,
			game.config.height - 24,
			'backButton'
		)
		this.backButton.setInteractive()
		this.backButton.on('pointerdown', () => {
			this.sceneChange('howToPlayScene', 'buttonSFX');
		});
	}
}