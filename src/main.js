let config = {
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 256,
		height: 256,
	},
	scene: [Play]
}

let game = new Phaser.Game(config)