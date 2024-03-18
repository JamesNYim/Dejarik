class Space extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame, width, height, spaceGroup, boardCoords) {
		super(scene,x, y, texture, frame)
		this.scene = scene
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.boardCoords = boardCoords
		this.group = spaceGroup
		this.pieces = []
		this.scene.physics.world.enable(this)
		this.group.add(this)
	}

	getPieces() {
		return this.pieces;
	}

	addPiece(piece) {
		if (!this.pieces.includes(piece)) {
			this.pieces.push(piece)
			console.log(`Added ${piece.name} to space at ${this.boardCoords}`);
		}
		return;
	}

	removePiece(piece) {
		this.pieces = this.pieces.filter(p => p !== piece)
		console.log(`Removed ${piece.name} from ${this.boardCoords}. Remaining Pieces:`, this.pieces.map(p=>p.name));
		return;
	}

	isOccupiedByMultiplePieces() {
		console.log(this.pieces.length)
		return this.pieces.length > 1;
	}

	resolveSpaceConflict() {
		let pieces = this.getPieces();
		if (pieces.length === 2) {
			let newX1 = this.x; // Position for first piece
        	let newX2 = this.x + this.width - 32; // Position for second piece
			let newY1 = this.y
			let newY2 = this.y + this.height - 32;

			let topLeftPiece = null
			let botRightPiece = null
			if (pieces[0].getTeam() === this.scene.teamOne) {
				topLeftPiece = pieces[0]
			}
			else {
				botRightPiece = pieces[0]
			}

			if (pieces[1].getTeam() === this.scene.teamTwo) {
				
				botRightPiece = pieces[1]
			}
			else {
				topLeftPiece = pieces[1]
			}

			this.scene.tweens.add({
				targets: topLeftPiece,
				x: newX1,
				y: newY1,
				ease: 'Power1',
				duration: 1000,
				onComplete: () => {
					topLeftPiece.originalX = newX1;
					topLeftPiece.originalY = newY1;
				}
			});
	
			this.scene.tweens.add({
				targets: botRightPiece,
				x: newX2,
				y: newY2,
				ease: 'Power1',
				duration: 1000,
				onComplete: () => {
					botRightPiece.originalX = newX2;
					botRightPiece.originalY = newY2;
				}
			});
		}

		
	}


}