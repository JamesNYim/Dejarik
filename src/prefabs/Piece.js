class Piece extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, health, attack) {
		super(scene,x, y, texture, frame)
		this.health = health
		this.attack = attack
		scene.pieceStateMachine = new StateMachine('idle', {
			idle: new IdleState(),
			move: new MoveState(),
			attack: new AttackState(),
			dead: new DeadState(), 
		}, [scene, this])
	}
}

class IdleState extends State {
	enterState(scene, piece) {
		//Play Initial State Animation
		//In this case its IdleAnimation
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