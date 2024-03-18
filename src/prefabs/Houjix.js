class Houjix extends Piece {
	constructor(scene, x, y, texture, frame, name, pieceGroup,
		idleAnimationSheet,
		moveAnimation,
		attackAnimation,
		deadAnimation) {
		super(scene, x, y, texture, frame, name, pieceGroup,
			idleAnimationSheet,
			moveAnimation,
			attackAnimation,
			deadAnimation)

		this.health = 25
		this.attack = 25
		this.animsKey = 'houjixIdle'
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

	isLegalMove(space) {
		const [currentX, currentY] = this.getCurrentSpace().boardCoords;
		const [targetX, targetY] = space.boardCoords;

		const minX = 0; 
		const maxX = 4; 
		const minY = 0; 
		const maxY = 4; 
		const isWithinBoundaries = 
        targetX >= minX && targetX <= maxX &&
        targetY >= minY && targetY <= maxY;
		
		//Movement in an L for (scouts)
		return (
			isWithinBoundaries &&
			(Math.abs(currentX - targetX) === 2 && Math.abs(currentY - targetY) === 1) ||
			(Math.abs(currentX - targetX) === 1 && Math.abs(currentY - targetY) === 2)
		); 
	}
}
