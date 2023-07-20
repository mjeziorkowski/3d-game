import * as THREE from 'three'
import { PlayerCamera } from '../objects/cameraObject'
import { Player } from '../objects/playerObject'
import { addRandomObstacles } from '../_debug/helpers'

export function loadScene(rendererElement: HTMLElement) {
  const children = []

  const scene = new THREE.Scene()

  // load objects

  const camera = new PlayerCamera(rendererElement)
  children.push(camera)

  const player = new Player()
  children.push(player)

  player.mesh.position.set(0, 1, 0)
  player.init(scene)

  setTimeout(() => {
    player.destroy(scene)
  }, 2000)

  camera.controls.setTarget(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z)

  //! DEBUG ONLY
  const gridHelper = new THREE.GridHelper(100, 100)
  gridHelper.position.y = 0.01
  scene.add(gridHelper)

  scene.add(...addRandomObstacles())

  return { scene, camera, children }
}
