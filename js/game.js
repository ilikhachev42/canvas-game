const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const mapImage = new Image()


mapImage.onload = () => {
    animate()
}

mapImage.src = 'sprites/map.png'

canvas.width = 1280
canvas.height = 768

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}

const placementTiles = []

placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 648) {
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64
          }
        })
      )
    }
  })
})

const enemies = []

//fix spawn position later

function spawnEnemies(spawnCount) { 
  for (let i = 1; i < spawnCount + 1; i++) {
    const yOffset = i * 90
    enemies.push(
      new Enemy({
            position: {x: waypoints[0].x - 30, y: waypoints[0].y - 50 - yOffset}
        })
    )
  }
}

const buildings = []
let activeTile = undefined
let enemyCount = 10
let hp = 20
let gold = 100
spawnEnemies(enemyCount)

function animate () {
  const animationId = requestAnimationFrame(animate)

  ctx.drawImage(mapImage, 0, 0)

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i]
    enemy.update()

    // fix finish routing later

  if (enemy.waypointIndex >= waypoints.length - 1) {
    hp -= 2
    enemies.splice(i, 1)
    document.querySelector('#hp').innerHTML = hp

    if (hp === 0) {
      console.log('Game is over')
      cancelAnimationFrame(animationId)
      document.querySelector('#gameOver').style.display = 'flex'
    } 
  }
}

//spawn new wave enemies

if (enemies.length === 0) {
  enemyCount += 5
  spawnEnemies(enemyCount) 
}

  placementTiles.forEach((tile) => {
    tile.update(mouse)
  })

  buildings.forEach((building) => {
    building.update()
    building.target = null

    const validEnemies = enemies.filter(enemy => {
      const xDistance = enemy.center.x - building.center.x
      const yDistance = enemy.center.y - building.center.y
      const distance = Math.hypot(xDistance, yDistance)
      return distance < enemy.radius + building.radius
    })
    building.target = validEnemies[0]

    for (let i = building.projectiles.length - 1; i >= 0; i--) {
      const projectile = building.projectiles[i]

      projectile.update()
      const xDistance = projectile.enemy.center.x - projectile.position.x
      const yDistance = projectile.enemy.center.y - projectile.position.y
      const distance = Math.hypot(xDistance, yDistance)
      
      //projectiles hits the enemy
    if (distance < projectile.enemy.radius + projectile.radius) {
      //enemy gets killed
      projectile.enemy.health -= 20
      if (projectile.enemy.health <= 0) {
        const enemyIndex = enemies.findIndex((enemy) => {
          return projectile.enemy === enemy
        })
        if (enemyIndex > -1) {
          enemies.splice(enemyIndex, 1)
          gold += 25
          document.querySelector('#gold').innerHTML = gold
        }
      }
      building.projectiles.splice(i, 1)
    }
    }
  })
}

const mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('click', (event) => {
  if (activeTile && !activeTile.isOccupied && gold - 50 >= 0) {
    gold -= 50
    document.querySelector('#gold').innerHTML = gold
    buildings.push(
      new Building({
        position: {
          x: activeTile.position.x,
          y: activeTile.position.y
        }
      })
    )
    activeTile.isOccupied = true
  }
})

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY

  activeTile = null
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i]
    if (
      mouse.x > tile.position.x && 
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
      ) {
      activeTile = tile
      break
    }
  }
})