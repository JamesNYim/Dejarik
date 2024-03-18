let config = {
	scale: {
		mode: Phaser.Scale.FIT,
		parent: 'phaser-example',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 512,
		height: 512,
		zoom: 10,
		pixelArt: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	},
	scene: [MasterScene, Menu, HowToPlay, Play]
}

let game = new Phaser.Game(config)
let keyJUMP;