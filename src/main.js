let config = {
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 256,
		height: 256,
		zoom: 5,
		pixelArt: true
	},
	scene: [Play]
}

let game = new Phaser.Game(config)