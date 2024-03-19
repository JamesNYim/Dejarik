class Tooltip {
	constructor(scene, piece) {
		this.scene = scene;
		this.piece = piece;
		this.createTooltip();
	}

	createTooltip() {
		this.background = this.scene.add.graphics().setVisible(false);
		this.nameText = this.scene.add.text(0, 0, this.piece.name, {
			font: '16px Arial',
			fill: '#00FF00'
		})
		.setOrigin(0, 0)
		.setVisible(false)

		this.healthText = this.scene.add.text(0, 0, '', {
			font: '16px Arial',
			fill: '#FF0000'
		})
		.setOrigin(0, 0)
		.setVisible(false)

		this.attackText = this.scene.add.text(0, 0, '', {
			font: '16px Arial',
			fill: '#0000FF'
		})
		.setOrigin(0, 0)
		.setVisible(false)
	}

	showTooltip() {
		let padding = 10;

		this.healthText
		.setText(`Health: ${this.piece.getHealth()}`)
		.setPosition(this.piece.x + this.piece.width + 5, this.piece.y + 10)
		.setVisible(true)

		this.nameText
		.setText(this.piece.name)
		.setPosition(this.piece.x + this.piece.width + 5, this.piece.y - 10)
		.setVisible(true)

		this.attackText
		.setText(`Attack: ${this.piece.getAttack()}`)
		.setPosition(this.piece.x + this.piece.width + 5, this.piece.y + 30)
		.setVisible(true)

		let textBounds = this.healthText.getBounds();
		this.background
		.clear()
		.fillStyle('#0x808080', 0.75)
		.fillRoundedRect(
			this.piece.x + this.piece.width,
			this.piece.y - this.piece.height / 2,
			textBounds.width + 10,
			textBounds.height * 4,
			5
		)
		.setVisible(true)
	}
		
	hideTooltip() {
		this.nameText.setVisible(false)
		this.healthText.setVisible(false)
		this.attackText.setVisible(false)
		this.background.setVisible(false)
	}

	updateTooltipPos(piece) {
		let padding = 10;
		this.nameText.setPosition(this.piece.x, this.piece.y - 50)
		this.healthText.setPosition(this.piece.x, this.piece.y - 50)
		this.attackTextText.setPosition(this.piece.x, this.piece.y - 50)

		let textBounds = this.healthText.getBounds();
		this.background
		.clear()
		.fillStyle('#0x808080', 0.5)
		.fillRoundedRect(
			textBounds.x,
			textBounds.y,
			textBounds.width,
			textBounds.height,
			5
		)
	}
}