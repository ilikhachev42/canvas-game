class Projectile extends Sprite {
  constructor({position = {x: 0, y: 0}, enemy}) {
    super({
      position, 
      imageSrc: 'sprites/Tower 02 - Level 01 - Projectile.png',
      frames: {
        x: 5,
        y: 1
      }
    })
    this.velocity = {
      x: 0,
      y: 0
    }
    this.radius = 10
    this.enemy = enemy
  }

  draw() {
    super.draw()
  }
  
  update() {
    this.draw()
    super.update()
    
    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
      )

      const power = 5
      this.velocity.x = Math.cos(angle) * power
      this.velocity.y = Math.sin(angle) * power

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  }
}