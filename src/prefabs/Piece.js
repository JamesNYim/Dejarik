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
	
		this.health = 10
		this.attack = 10
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

	removeHealth(dmg) {
		this.health -= dmg
	}

	getAttack() {
		return this.attack
	}

	performAttack(piece) {
		let dmg = Math.floor(Math.random() * this.getAttack())
		piece.removeHealth(dmg)
		console.log(`${this.name} did ${dmg} to ${piece.name}`)
	}
	getCurrentSpace() {
		return this.currentSpace
	}

	setCurrentSpace(space) {
		if (this.currentSpace) {
			this.currentSpace.removePiece(this)
		}
		this.currentSpace = space
		if (space) {
			space.addPiece(this)
		}
 	}

	isLegalMove(space) {
		if (space.boardCoords[0] === 0 && space.boardCoords[1] === 0) {
			return false
		}
		if (space.boardCoords[0] === 1 && space.boardCoords[1] === 0) {
			return false
		}
		return true
	}
}

class IdleState extends State {
	enterState(scene, piece) {
		//Play Initial State Animation
		//In this case its IdleAnimation
		console.log(`${piece.name} has gone idle`)
		piece.idle()
		
	}

	executeState(scene, piece) {
		piece.on('dragstart', (pointer, dragX, dragY) => this.stateMachine.transition('move'))
	}
}

class MoveState extends State {
	enterState(scene, piece, x, y) {
		piece.originalX = piece.x
		piece.originalY = piece.y
		piece.on('drag', (pointer, dragX, dragY) => {
            piece.move(dragX, dragY);
        });

        piece.on('pointerup', () => {
            this.stateMachine.transition('idle');
        });
		
	}
	/*
	executeState(scene, piece, x, y) {
		console.log(`[${x} : ${y}]`)
		piece.move(x, y)
		piece.on('pointerup', () => this.stateMachine.transition('idle'))
	}

	leaveState(scene, piece) {
		console.log(`${piece.name} stopped being dragged`)
	}
	*/
}

class AttackState extends State {
	enterState(scene, thisPiece, piece) {
		console.log(`-===================================-`)
		if (thisPiece.getHealth() <= 0) {
			this.stateMachine.transition('dead')
		}
		else { 	
			console.log(`${thisPiece.name} is going to attack ${piece.name}`)
			thisPiece.performAttack(piece)
			console.log(`${thisPiece.name}'s Health: ${thisPiece.getHealth()}`)
			console.log(`${piece.name}'s Health: ${piece.getHealth()}`)			
			this.stateMachine.transition('idle')
			scene.time.addEvent({
				delay: 3000,
				callback: ()=>{
					piece.pieceStateMachine.transition('attack', thisPiece)
				},
			})
			
		}
		console.log(`-===================================-`)
	}
	executeState(scene, thisPiece) {
		
	}
}

class DeadState extends State {
	enterState(scene, piece) {
		console.log(`${piece.name} has died`)
		piece.destroy()
		//Piece has died
		// We cannot leave this state 
	}
}
