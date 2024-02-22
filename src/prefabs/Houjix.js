class Houjix extends Piece {
	constructor(scene, x, y, texture, frame,
		idleAnimation,
		moveAnimation,
		attackAnimation,
		deadAnimation) {
		super(scene, x, y, texture, frame)
		this.scene = scene
		scene.add.existing(this)
		/*
		this.scene.load.spritesheet('houjixIdleSheet', './assets/houjixAssets/houjixStatic.png',
			{
				frameWidth: 16,
				FrameHeight: 16,
				startFrame: 0,
				endFrame: 1
			})
			*/
		this.idleAnimation = idleAnimation
	
		this.houjixIdleAnimation = this.scene.anims.create({
			key: 'houjixIdle',
			repeat: -1,
			frameRate: 8,
			frames: this.scene.anims.generateFrameNumbers(
				this.idleAnimation, {
					frames: [0, 1, 1, 0],
				}
			)
		})	
		
	}
}

class IdleState extends State {
	enterState(scene, piece) {
		//Play Initial State Animation
		//In this case its IdleAnimation
		console.log("idleState")
		console.log(scene)
		piece.anims.play('houjixIdle')
	}

	executeState(scene, piece) {
		//Transition to move if it is the players turn and
		//if the selected board space is a valid spot
		//this.stateMachine.transition('move')

		//Transition to attack if it is the players turn
		//and there is an enemy in a valid spot
		//this.stateMachine.transition('attack')

		//Transition to dead if no health left
		//this.stateMachine.transition('dead')
	}
}

class MoveState extends State {
	executeState(scene, piece) {
		//Move piece to selected board spot
		//Animate movement to the spot
		//Once it reaches spot go back to idle
		//this.stateMachine.transition('idle')
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
		//Piece has died
		// We cannot leave this state 
	}
}