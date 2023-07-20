import * as THREE from 'three'
import type { IInputComponent } from '../components/inputComponent'
import type { TMovementVariables } from '../components/movementComponent'

export function moveObject(mesh: THREE.Mesh, movementVariables: TMovementVariables) {
  mesh.translateZ(movementVariables.velocity.z)
  mesh.translateX(movementVariables.velocity.x)
}

export function rotateObject(mesh: THREE.Mesh, direction: THREE.Vector3) {
  mesh.lookAt(mesh.position.x + direction.x, mesh.position.y, mesh.position.z + direction.z)
}

export function calculateForce(
  movementVariables: TMovementVariables,
  movementInput: IInputComponent
) {
  const force = new THREE.Vector3()

  if (movementInput.movement.x !== 0) {
    force.x = movementInput.movement.x
  }

  if (movementInput.movement.z !== 0) {
    force.z = movementInput.movement.z
  }

  movementVariables.force = force.clampLength(0, 1)
}

export function calculateVelocity(
  movementVariables: TMovementVariables,
  terrainProperties: TerrainProperties,
  delta: number
) {
  const maxSpeed = window._game.settings.maxSpeed
  const { friction, resistance } = terrainProperties
  const { acceleration, velocity, force, speed } = movementVariables

  if (force.x !== 0 || force.z !== 0) {
    acceleration.x = force.x * speed * (1 - resistance)
    acceleration.z = force.z * speed * (1 - resistance)
  }

  nullifyValuesWhenSmall(acceleration, 0.01)

  acceleration.multiplyScalar(delta)

  velocity.add(acceleration)

  nullifyValuesWhenSmall(velocity, 0.01)

  velocity.multiplyScalar(1 - friction)
}

export function nullifyValuesWhenSmall(value: THREE.Vector3, threshold: number) {
  if (value.x < threshold && value.x > -threshold) {
    value.x = 0
  }
  if (value.y < threshold && value.y > -threshold) {
    value.y = 0
  }
  if (value.z < threshold && value.z > -threshold) {
    value.z = 0
  }
}

//TODO: move it out of here
export interface TerrainProperties {
  friction: number // how much force is lost when moving
  resistance: number // how much force is lost when applying force
  bounciness: number //TODO: not implemented yet
}

export function getTerrainProperties(): TerrainProperties {
  return {
    friction: 0.3,
    resistance: 0,
    bounciness: 0
  }
}
