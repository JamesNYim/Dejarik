class Ghhk extends Piece {
	constructor(scene, x, y, texture, frame,
		idleAnimationSheet,
		moveAnimation,
		attackAnimation,
		deadAnimation) {
		super(scene, x, y, texture, frame,
			idleAnimationSheet,
			moveAnimation,
			attackAnimation,
			deadAnimation)
		this.animsKey = 'ghhkIdle'
		this.idleAnimation = this.scene.anims.create({
			key: this.animsKey,
			repeat: -1,
			framerate: 8,
			frames: this.scene.anims.generateFrameNumbers(
				this.idleAnimationSheet, {
					frames: [0, 1, 1, 0],
				}
			)
		})

	}
}

