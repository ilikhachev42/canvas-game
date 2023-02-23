const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const mapImage = new Image()


mapImage.onload = () => {
    animate()
}

mapImage.src = 'textures/map.png'

canvas.width = 1024
canvas.height = 768

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Enemy {
    constructor({position = {x: 0, y: 0}}) {
        this.position = position
        this.width = 64
        this.height = 64
        this.waypointIndex = 0
    }

    draw() {
        ctx.fillStyle = 'rgb(0, 255, 0)'
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

const enemies = []
for (let i = 0; i < 10; i++) {
    const yOffset = i * 90
    enemies.push(
        new Enemy({
            position: {x: waypoints[0].x, y: waypoints[0].y - yOffset}
        })
    )
}

const enemy = new Enemy({position: {x: waypoints[0].x, y: waypoints[0].y}})
const enemy2 = new Enemy({position: {x: waypoints[0].x, y: waypoints[0].y - 128}})

function animate () {
    requestAnimationFrame(animate)

    ctx.drawImage(mapImage, 0, 0)
    enemies.forEach(enemy => {
        enemy.update()
    })
}

