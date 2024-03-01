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

	checkMoveToSpace(targetCoords) {
		const validMoveSet = [[0, 0], [0, 1], this.currentSpace]

		if (targetCoords === undefined || targetCoords === null) {
			return 
		}
		for (var i = 0; i < validMoveSet.length; ++i) {
			for (var j = 0; j < validMoveSet[i].length; ++j) {
				if (validMoveSet[i][j] === targetCoords[j]) {
					console.log("Valid Move")
					this.setCurrentSpace(targetCoords)
					return true
				}
			}
		}
		console.log('illegal move')
		return false
	}
}

