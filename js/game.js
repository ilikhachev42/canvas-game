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

const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i += 16) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 16))
}

const placementTiles = []

placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 193) {
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

console.log(placementTiles)

const enemies = []
for (let i = 0; i < 10; i++) {
    const yOffset = i * 90
    enemies.push(
        new Enemy({
            position: {x: waypoints[0].x, y: waypoints[0].y - yOffset}
        })
    )
}

const buildings = []
let activeTile = undefined

function animate () {
    requestAnimationFrame(animate)

    ctx.drawImage(mapImage, 0, 0)
    enemies.forEach((enemy) => {
        enemy.update()
    })

    placementTiles.forEach((tile) => {
      tile.update(mouse)
    })

    buildings.forEach((building) => {
      building.draw()

      building.projectiles.forEach(projectile => {
        projectile.update()
      })
    })
}

const mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('click', (event) => {
  if (activeTile && !activeTile.isOccupied) {
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
  console.log(Building)
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

  console.log(activeTile)
})