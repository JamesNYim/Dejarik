class Piece extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, name,
		pieceGroup,
		idleAnimationSheet,
		moveAnimation,
		attackAnimation,
		deadAnimation,
		) {
		
		super(scene, x, y, texture, frame)
		this.scene = scene
		scene.add.existing(this)
		this.name = name
		this.group = pieceGroup
	
		//this.health = health
		//this.attack = attack
		this.currentSpace = null
		
		this.pieceStateMachine = new StateMachine('idle', {
			idle: new IdleState(),
			move: new MoveState(),
			attack: new AttackState(),
			dead: new DeadState(), 
		}, [scene, this])

		this.idleAnimationSheet = idleAnimationSheet
		this.animsKey = ''
		this.idleAnimation = null

		this.scene.physics.world.enable(this)
		this.group.add(this)
		console.log(this)
		
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
		this.currentSpace = space
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

}

class IdleState extends State {
	enterState(scene, piece) {
		//Play Initial State Animation
		//In this case its IdleAnimation
		console.log(`${piece.name} went Idle`)
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
		piece.move(x, y)
	}
	executeState(scene, piece, x, y) {
		//Move piece to selected board spot
		//Animate movement to the spot
		//Once it reaches spot go back to idle
		//this.stateMachine.transition('idle')
		piece.on('pointerup', () => this.stateMachine.transition('idle'))
	}

	leaveState(scene, piece) {
		console.log(`${piece.name} stopped being dragged`)
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
