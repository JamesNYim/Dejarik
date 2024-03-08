class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene")
	}

	preload() {
		this.load.image('menuBackground', './assets/MenuAssets/menuBackground.png')
	}	

	create() {
		this.background = this.add.sprite(
			0,
			0,
			'menuBackground')
		.setOrigin(0, 0)
	}

	sceneChange(scene, sfx) {
		this.sound.play(sfx)
		this.time.delayedCall(100, () => {
			this.scene.start(scene)
		}, [], this)
	}
}