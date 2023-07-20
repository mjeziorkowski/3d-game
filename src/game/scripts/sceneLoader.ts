import * as THREE from 'three'
import { PlayerCamera } from '../objects/cameraObject'
import { Player } from '../objects/playerObject'
import { loadPlayer } from './playerLoader'
import { addRandomObstacles } from '../_debug/helpers'

export function loadScene(rendererElement: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new PlayerCamera(rendererElement)

  const player = new Player(loadPlayer())
  player.mesh.position.set(0, 1, 0)
  scene.add(player.mesh)

  camera.controls.setTarget(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z)

  const gridHelper = new THREE.GridHelper(100, 100)
  gridHelper.position.y = 0.01
  scene.add(gridHelper)

  scene.add(...addRandomObstacles())

  return { scene, camera }
}
