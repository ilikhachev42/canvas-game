/*
class Sprite {
	constructor({
		position = {x: 0, y: 0}, 
		imageSrc, 
		frames = {framesX: 0, framesY: 0, max: 1}
	}) {
		this.position = position
		this.image = new Image()
		this.image.src = imageSrc
		this.frames = {
			framesX: frames.framesX,
			framesY: frames.framesY,
			max: frames.max,
			current: 0,
			elapsed: 0,
			hold: 5
		}
	}

	draw() {
		const cropWidth = this.image.width / this.frames.framesX
		const cropHeight = this.image.height / this.frames.framesY
		const crop = {
			position: {
				x: cropWidth,
				y: cropHeight
			},
			width: cropWidth * this.frames.current,
			height: cropHeight
		}
		ctx.drawImage(
			this.image, 
			crop.position.x + 32, 
			crop.position.y, 
			crop.width, 
			crop.height,
			this.position.x,
			this.position.y,
			crop.width,
			crop.height
		)

		//animating sprites
		this.frames.elapsed++
		if (this.frames.elapsed % this.frames.hold === 0) {
			this.frames.current++
			if (this.frames.current < this.frames.max) {
				this.frames.current = 0
			}
		}
	}
}
*/