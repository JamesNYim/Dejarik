class Piece extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame,
		idleAnimationSheet,
		moveAnimation,
		attackAnimation,
		deadAnimation) {
		
		super(scene, x, y, texture, frame)
		this.scene = scene
		scene.add.existing(this)
	
		//this.health = health
		//this.attack = attack
		this.currentSpace = {boardCoords: [10, 2], x: 365, y:238}
		
		scene.pieceStateMachine = new StateMachine('idle', {
			idle: new IdleState(),
			move: new MoveState(),
			attack: new AttackState(),
			dead: new DeadState(), 
		}, [scene, this])

		this.idleAnimationSheet = idleAnimationSheet
		this.animsKey = ''
		this.idleAnimation = null
		
		
		scene.physics.add.existing(this)
		scene.physics.world.enable(this)
	}

	move(xCoord, yCoord) {
		this.x = xCoord
		this.y = yCoord
	}

	idle() {
		this.anims.play(this.animsKey)
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
		/*
		console.log(`this.currentSpace.boardCoords set to: ${this.currentSpace.boardCoords}`)
		console.log(`this.currentSpace.x set to: ${this.currentSpace.x}`)
		console.log(`this.currentSpace.y set to: ${this.currentSpace.y}`) */
		this.currentSpace = space
		/*
		console.log(`space.boardCoords set to: ${space.boardCoords}`)
		console.log(`space.x set to: ${space.x}`)
		console.log(`space.y set to: ${space.y}`)
		*/
	}

	moveTo(space) {
		const originalSpace = this.currentSpace
		if (this.isValidMove(space))
		{
			this.scene.tweens.add({
				targets: this,
				x: space.x,
				y: space.y,
				ease: 'Power1',
				duration: 1000,
				onComplete: () => {
					this.setCurrentSpace(space)
				}		
        	});
		}
		else {
			this.scene.tweens.add({
				targets: this,
				x: originalSpace.x,
				y: originalSpace.y,
				ease: 'Power1',
				duration: 1000,
				onComplete: () => {
					this.setCurrentSpace(originalSpace)
				}		
        	});
		}
	}

	isValidMove(space) {
		if (!this.followsMovementRules(space)) {
			return false
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

	playIdleAnim() {
		this.anims.play(this.animsKey)
	}
}

class IdleState extends State {
	enterState(scene, piece) {
		//Play Initial State Animation
		//In this case its IdleAnimation
		console.log(`${piece} went Idle`)
		piece.idle()
		
	}

	executeState(scene, piece) {
		//Transition to move if it is the players turn and
		//if the selected board space is a valid spot
		//this.stateMachine.transition('move')
		piece.on('drag', (pointer, dragX, dragY) => this.stateMachine.transition('move', dragX, dragY))

		//Transition to attack if it is the players turn
		//and there is an enemy in a valid spot
		//this.stateMachine.transition('attack')

		//Transition to dead if no health left
		//this.stateMachine.transition('dead')
	}
}

class MoveState extends State {
	enterState(scene, piece, x, y) {
		console.log("Move State")
		piece.move(x, y)
	}
	executeState(scene, piece, x, y) {
		//Move piece to selected board spot
		//Animate movement to the spot
		//Once it reaches spot go back to idle
		//this.stateMachine.transition('idle')
		piece.on('pointerup', () => this.stateMachine.transition('idle'))
		
	}
}

class AttackState extends State {
	enterState(scene, piece) {
		//Attack selected piece 
		//Once attack is finished animation and all
		//Go back to idle
		//this.stateMachine.transition('idle')
	}
}

class DeadState extends State {
	enterState(scene, piece) {
		console.log("died")
		//Piece has died
		// We cannot leave this state 
	}
}
