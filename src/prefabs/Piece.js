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

