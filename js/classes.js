class PlacementTile {
  constructor({position = {x: 0, y: 0}}) {
    this.position = position
    this.size = 64
    this.color = 'rgba(255, 255, 255, 0)'
    this.occupied = false
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
  }

  update(mouse) {
    this.draw()

    if (
      mouse.x > this.position.x && 
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
      ) {
        console.log('it works!')
        this.color = 'rgba(255, 255, 255, 0.3)'
    } else this.color = 'rgba(255, 255, 255, 0)'
  }
}

class Enemy {
  constructor({position = {x: 0, y: 0}}) {
    this.position = position
    this.width = 64
    this.height = 64
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.4)'
    ctx.fillRect(this.position.x, this.position.y , this.width, this.height)
  }

  update() {
    this.draw();
    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.position.y;
    const xDistance = waypoint.x - this.position.x;
    const yDirection = Math.sign(yDistance);
    const xDirection = Math.sign(xDistance);
    const enemySpeed = 1;
    
    
    if (yDistance !== 0) {
      this.position.y += yDirection * enemySpeed;
    }
    
    if (xDistance !== 0 && yDistance === 0) {
      this.position.x += xDirection * enemySpeed;
    }
    
    if (
      Math.round(this.position.x) === Math.round(waypoint.x) &&
      Math.round(this.position.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
      ) {
      this.waypointIndex++;
      }
  }  
}

class Building {
    constructor({position = {x: 0, y: 0}}) {
      this.position = position
      this.width = 64
      this.height = 64
      this.center = {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2
      }
      this.projectiles = [
        new Projectile({
          position: {
            x: this.center.x, 
            y: this.center.y
          }
        })
      ]
    }

    draw() {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Projectile {
  constructor({position = {x: 0, y: 0}}) {
    this.position = position
    this.velocity = {
      x: 0,
      y: 0
    }
  }
  
  draw() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 10, 0 , Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
  }

  update() {
    this.draw()

    const angle = Math.atan2(
      enemies[0].position.y - this.position.y,
      enemies[0].position.x - this.position.x
      )

      this.velocity.x = Math.cos(angle)
      this.velocity.y = Math.sin(angle)

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  }
}