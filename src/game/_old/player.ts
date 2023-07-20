import * as THREE from 'three'
import { Entity } from './entity'

export class Player extends Entity {
  constructor(mesh: THREE.Mesh) {
    super(mesh)
  }
}

export function loadPlayer() {
  const geometry = new THREE.BoxGeometry(1, 2, 1)
  const material = [
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //right
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //left
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //top
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //bottom
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), //back
    new THREE.MeshBasicMaterial({ color: 0xff0000 }) //front
  ]
  const cube = new THREE.Mesh(geometry, material)
  cube.name = 'player'

  const player = new Player(cube)

  return player
}
