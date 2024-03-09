class Savrip extends Piece {
	constructor(scene, x, y, texture, frame,
		idleAnimationSheet,
		moveAnimation,
		attackAnimation,
		deadAnimation) {
		console.log("savrip created")
		super(scene, x, y, texture, frame,
			idleAnimationSheet,
			moveAnimation,
			attackAnimation,
			deadAnimation)
		this.animsKey = 'savripIdle'
		this.idleAnimation = this.scene.anims.create({
			key: this.animsKey,
			repeat: -1,
			framerate: 2,
			frames: this.scene.anims.generateFrameNumbers(
				this.idleAnimationSheet, {
					frames: [0, 1, 1, 0],
				}
			)
		})

	}
}