import * as THREE from 'three'
import type { Entity } from '../components/entityComponents'
import type { TMovementVariables } from '../components/movementComponent'

export class Player implements Entity {
  public mesh: THREE.Mesh
  public isActive: boolean = false
  public movementComponent: TMovementVariables
  public moveObject: (delta: number) => void

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh
    this.movementComponent = {
      velocity: new THREE.Vector3(),
      speed: 2,
      acceleration: new THREE.Vector3(),
      direction: new THREE.Vector3()
    }
    this.moveObject = (delta: number) => {}
  }
}
