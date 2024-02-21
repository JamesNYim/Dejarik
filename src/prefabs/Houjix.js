class Houjix extends Piece {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame)
		this.scene = scene
		
		this.scene.load.spritesheet('houjuxIdleSheet', './assets/houjixAssets/houjixStatic.png',
			{
				frameWidth: 16,
				FrameHeight: 16,
				startFrame: 0,
				endFrame: 1
			})
	
		this.houjixIdleAnimation = this.scene.anims.create({
			key: 'houjixIdle',
			frames: this.scene.anims.generateFrameNumbers(
				'houjixIdleSheet', {
					frames: [0, 1, 1, 0],
					frameRate: 5
				}
			)
		})
		console.log("houkix created")
		//this.anims.play('houjixIdle')
	}

	
}