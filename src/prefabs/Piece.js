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
		const [currentX, currentY] = this.getCurrentSpace().boardCoords;
		const [targetX, targetY] = space.boardCoords;

		const minX = 0; 
		const maxX = 4; 
		const minY = 0; 
		const maxY = 4; 
		const isWithinBoundaries = 
        targetX >= minX && targetX <= maxX &&
        targetY >= minY && targetY <= maxY;

		
		//Movement in immediate squares. For (defensive and offensive)
		/*return (
			isWithinBoundaries &&
			(Math.abs(currentX - targetX) === 1 && currentY === targetY) || // Horizontal adjacent
			(Math.abs(currentY - targetY) === 1 && currentX === targetX) || // Vertical adjacent
			(Math.abs(currentX - targetX) === 1 && Math.abs(currentY - targetY) === 1) // Diagonal adjacent
		); */
		
		//Movement in an L for (scouts)
		/*return (
			isWithinBoundaries &&
			(Math.abs(currentX - targetX) === 2 && Math.abs(currentY - targetY) === 1) ||
			(Math.abs(currentX - targetX) === 1 && Math.abs(currentY - targetY) === 2)
		); */

		// Rooklike movement for (Power)
		/*
		const isHorizontal = currentY === targetY;
		const isVertical = currentX === targetX;

		const distance = Math.max(Math.abs(currentX - targetX), Math.abs(currentY - targetY));
		const isValidDistance = distance > 0 && distance <= 2;

		return (
			isWithinBoundaries && (isHorizontal || isVertical) && isValidDistance
		)
		*/
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
	enterState(scene, attacker, defender) {
		console.log(`-===================================-`)
		if (attacker.getHealth() <= 0) {
			this.stateMachine.transition('dead')
		}
		else { 	
			console.log(`${attacker.name} is going to attack ${defender.name}`)
			scene.tweens.add({
				targets: attacker,
				x: attacker.currentSpace.x + attacker.currentSpace.width / 2 - attacker.width / 2,
				y: attacker.currentSpace.y + attacker.currentSpace.height / 2 - attacker.height / 2,
				ease: 'Power1',
				duration: 500,
				onComplete: () => {
					attacker.performAttack(defender);
					scene.tweens.add({
						targets: attacker,
						x: attacker.originalX,
						y: attacker.originalY,
						ease: 'Power1',
						duration: 500,
						onComplete: () => {
							console.log(`${attacker.name} returned to its original position`);
							this.stateMachine.transition('idle');
						}
					});
				}
			})
			
			console.log(`${attacker.name}'s Health: ${attacker.getHealth()}`)
			console.log(`${defender.name}'s Health: ${defender.getHealth()}`)			
			scene.time.addEvent({
				delay: 3000,
				callback: ()=>{
					defender.pieceStateMachine.transition('attack', attacker)
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
