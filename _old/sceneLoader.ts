import * as THREE from 'three'
import { Camera } from './camera'
import { loadPlayer } from './player'
import {
  mapGamepadToMovement,
  getGamepad,
  moveEntity,
  getCameraDirection,
  handleCameraInput,
  handleMovementInput,
  moveCamera,
  rotateEntity
} from './inputHandler'
import { calculateVelocity, getTerrainProperties } from './utils'
import { handleCollision } from './collision'

export function loadScene(domElement: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new Camera(
    {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000
    },
    domElement
  )

  const player = loadPlayer()

  player.mesh.position.y = 1
  scene.add(player.mesh)

  camera.controls.setTarget(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z)
  camera.controls.setPosition(
    player.mesh.position.x + 0,
    player.mesh.position.y + 5,
    player.mesh.position.z + 5
  )
  camera.updatePositionProperties()

  player.addUpdate('movementAndCollisionAndStuffLikeThat', (delta) => {
    let movement = mapGamepadToMovement(getGamepad())

    moveCamera(camera, player)
    handleCameraInput(movement, delta, camera)

    const force = handleMovementInput(movement, delta)
    calculateVelocity(player.movementVariables, getTerrainProperties(), force, delta)
    handleCollision(player, scene, delta)
    rotateEntity(player, getCameraDirection(camera))
    moveEntity(player)
  })

  const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1)
  const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  for (let i = 0; i < 1000; i++) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial)
    obstacle.position.x = Math.random() * 100 - 50
    obstacle.position.z = Math.random() * 100 - 50
    obstacle.position.y = 0.5
    obstacle.name = `obstacle${i}`
    scene.add(obstacle)
  }

  // player.addUpdate('collision', (delta) => {
  //   const obstacles = scene.children.filter((child) => {
  //     return child.name.includes('obstacle')
  //   })

  //   //get player bounding box
  //   const playerBox = new THREE.Box3().setFromObject(player.mesh)

  //   obstacles.forEach((obstacle) => {
  //     const obstacleBox = new THREE.Box3().setFromObject(obstacle)
  //     const collision = playerBox.intersectsBox(obstacleBox)
  //     //move collision according to player velocity

  //     if (collision) {
  //       console.log('collision')

  //       const playerCenter = new THREE.Vector3()
  //       playerBox.getCenter(playerCenter)

  //       const obstacleCenter = new THREE.Vector3()
  //       obstacleBox.getCenter(obstacleCenter)

  //       const difference = new THREE.Vector3()
  //       difference.subVectors(playerCenter, obstacleCenter)
  //       difference.y = 0

  //       const direction = new THREE.Vector3()
  //       direction.copy(difference).normalize()

  //       player.velocity.x *= -1
  //       player.velocity.z *= -1

  //       //if collision is on the x axis
  //       // if (Math.abs(difference.x) > Math.abs(difference.z)) {

  //       // }
  //     }
  //   })
  // })

  // player.addUpdate('closestObject', (delta) => {
  //   const closestObject = scene.children
  //     .filter((child) => {
  //       return child.name !== 'player'
  //     })
  //     .reduce((prev, curr) => {
  //       return prev.position.distanceTo(player.mesh.position) <
  //         curr.position.distanceTo(player.mesh.position)
  //         ? prev
  //         : curr
  //     })

  //   const distanceToPlayer = closestObject.position.distanceTo(player.mesh.position)

  //   console.log(distanceToPlayer, closestObject.name)
  // })

  // create plane helper
  const gridHelper = new THREE.GridHelper(100, 100)
  gridHelper.position.y = 0.01
  scene.add(gridHelper)

  // create plane
  const planeGeometry = new THREE.PlaneGeometry(100, 100)
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000033, side: THREE.DoubleSide })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = Math.PI / 2
  scene.add(plane)

  return { scene, camera, entities: [player] }
}
