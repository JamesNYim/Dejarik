class Savrip extends Piece {
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
		
		this.health = 75
		this.attack = 50
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

		// Rooklike movement for (Power)
		const isHorizontal = currentY === targetY;
		const isVertical = currentX === targetX;

		const distance = Math.max(Math.abs(currentX - targetX), Math.abs(currentY - targetY));
		const isValidDistance = distance > 0 && distance <= 2;

		return (
			isWithinBoundaries && (isHorizontal || isVertical) && isValidDistance
		)
	}
}