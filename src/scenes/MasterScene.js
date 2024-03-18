class MasterScene extends Phaser.Scene {
	constructor(sceneName) {
		super(sceneName)
	}
	preload() {
		this.load.audio('buttonSFX', './assets/MenuAssets/mixkit-sci-fi-positive-notification-266.wav')
		this.load.image('backButton', './assets/MenuAssets/Back_Button.png')
	}

	create() {
		this.sceneChange('menuScene', 'buttonSFX')
	}
	sceneChange(scene, sfx) {
		this.sound.play(sfx)
		this.time.delayedCall(100, () => {
			this.scene.start(scene)
		}, [], this)
	}
}