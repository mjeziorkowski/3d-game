import * as THREE from 'three'
export function addRandomObstacles() {
  const obstacles = []
  const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1)
  const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  for (let i = 0; i < 1000; i++) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial)
    obstacle.position.x = Math.random() * 100 - 50
    obstacle.position.z = Math.random() * 100 - 50
    obstacle.position.y = 0.5
    obstacle.name = `obstacle${i}`
    obstacles.push(obstacle)
  }
  return obstacles
}
