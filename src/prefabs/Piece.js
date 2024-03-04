class Piece extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, health, attack) {
		super(scene,x, y, texture, frame)
		this.health = health
		this.attack = attack
		this.currentSpace = null
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
		return this.currentSpace
	}

	setCurrentSpace(space) {
		this.currentSpace = space	
	}

	moveTo(space) {
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

        // Update the current space of the piece
        this.setCurrentSpace(space)
	}

	isValidMove(space) {
		if (this.followsMovementRules(space)) {
			console.log("follows movement rules")
		}

		if (this.isPathBlocked(space)) {
			console.log("path is blocked")
		}
		return true
	}

	followsMovementRules(space) {
		return true
	}

	isPathBlocked(space) {
		return true
	}
	
}

