class Piece extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, health, attack) {
		super(scene,x, y, texture, frame)
		this.health = health
		this.attack = attack
		this.currentSpace = [10, 2]
		scene.pieceStateMachine = new StateMachine('idle', {
			idle: new IdleState(),
			move: new MoveState(),
			attack: new AttackState(),
			dead: new DeadState(), 
		}, [scene, this])

		scene.physics.add.existing(this)
		scene.physics.world.enable(this)
	}

	getHealth() {
		return this.health
	}

	getAttack() {
		return this.attack
	}

	getCurrentSpace() {
		console.log(`getCurrentSpace(): ${this.currentSpace}`)
		return this.currentSpace
	}

	setCurrentSpace(space) {
		this.currentSpace = space	
	}

	moveTo(space) {
		// Update the current space of the piece
        this.setCurrentSpace(space)

		this.scene.tweens.add({
			targets: this,
            x: space.x,
            y: space.y,
            ease: 'Power1',
            duration: 1000,
            onComplete: () => {
                // Optional: Code to execute after the piece has finished moving
            }
        });

        
	}

	isValidMove(space) {
		console.log(`Space coords: ${space.boardCoords}`)
		if (!this.followsMovementRules(space)) {
			return false
		}

		if (this.isPathBlocked(space)) {
			console.log("path is blocked")
		}
		return true
	}

	followsMovementRules(space) {
		let up = [-4, -1]
		let down = [4, 1]
		let right = [1, 0]
		let left = [-1, 0]
		let upRight = [-4, 1]
		let upLeft = [-5, 1]
		let downRight = [5, 1]
		let downLeft = [3, 1]

		let moveSet = [up, down, right, left, upRight, upLeft, downRight, downLeft]
		let currentSpace = this.getCurrentSpace()
		for (let i = 0; i < moveSet.length; ++i){
			if (currentSpace[0] + moveSet[i][0] == space.boardCoords[0] && 
				currentSpace[1] + moveSet[i][1] == space.boardCoords[1])
				{
					return true
				} 
		}
		return false
		
	}

	isPathBlocked(space) {
		return true
	}
	
}

