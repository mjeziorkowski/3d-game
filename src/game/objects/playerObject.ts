import * as THREE from 'three'
import type { Entity } from '../components/entityComponents'
import type { TMovementVariables } from '../components/movementComponent'
import { loadPlayer } from '../scripts/playerLoader'

export class Player implements Entity {
  public mesh: THREE.Mesh
  public isActive: boolean = false
  public movementComponent: TMovementVariables

  constructor() {
    this.mesh = loadPlayer()
    this.movementComponent = {
      velocity: new THREE.Vector3(),
      speed: 2,
      acceleration: new THREE.Vector3(),
      direction: new THREE.Vector3()
    }
  }

  public moveObject(delta: number) {
    console.log('moveObject')
  }

  public init(scene?: THREE.Scene) {
    if (!scene) {
      throw new Error('No scene to add player to')
    }

    window._game.updateFnList.moveObject[this.mesh.uuid] = this.moveObject
    scene.add(this.mesh)
    this.isActive = true
  }

  public destroy(scene?: THREE.Scene) {
    if (!scene) {
      throw new Error('No scene to remove player from')
    }

    delete window._game.updateFnList.moveObject[this.mesh.uuid]
    scene.remove(this.mesh)
    this.isActive = false
  }
}
