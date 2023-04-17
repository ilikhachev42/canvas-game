class Sprite {
  constructor({
    position = { x: 0, y: 0 }, 
    imageSrc, 
    frames = {  x: 1, y: 1 }
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.framesX = {
      max: frames.x,
      current: 0,
      elapsed: 0,
      hold: 3
    }
    this.framesY = {
      max: frames.y,
      current: 0
    }
    this.waypointIndex = 0;
  }

  draw() {
    const cropWidth = this.image.width / this.framesX.max
    const cropHeight = this.image.height / this.framesY.max
    const crop = {
      position: {
        x: cropWidth * this.framesX.current,
        y: cropHeight * this.framesY.current
      },
      width: cropWidth,
      height: cropHeight
    }
    
    ctx.drawImage(
      this.image, 
      crop.position.x, 
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x - 32,
      this.position.y,
      crop.width,
      crop.height
    )
  }

  update() {
    this.framesX.elapsed++
    if (this.framesX.elapsed % this.framesX.hold === 0) {
      this.framesX.current++
      if (this.framesX.current >= this.framesX.max) {
        this.framesX.current = 0;
      }
    }
  }

 // function for animating sprites ONLY for Enemy class.
  enemyUpdate() {
    this.framesX.elapsed++
    if (this.framesX.elapsed % this.framesX.hold === 0) {
      this.framesX.current++
    if (this.framesX.current >= this.framesX.max) {
      this.framesX.current = 0;
    } else if (this.waypointIndex == 1) {
      this.framesY.current = 0 
    } else if (this.waypointIndex == 2) {
      this.framesY.current = 2
    } else if (this.waypointIndex == 3) {
      this.framesY.current = 1
    } else if (this.waypointIndex == 4) {
      this.framesY.current = 2
    } else if (this.waypointIndex == 5) {
      this.framesY.current = 0
    } else if (this.waypointIndex == 6) {
      this.framesY.current = 2
    } else if (this.waypointIndex == 7) {
      this.framesY.current = 1
    } else if (this.waypointIndex == 8) {
      this.framesY.current = 2
    } else if (this.waypointIndex == 9) {
      this.framesY.current = 0
    } else if (this.waypointIndex == 10) {
      this.framesY.current = 2
    } else if (this.waypointIndex == 11) {
      this.framesY.current = 1
    }
    }
  }
}