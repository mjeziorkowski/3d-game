import type { Entity, MovementVariables } from './entity'

export interface TerrainProperties {
  friction: number
  resistance: number
  bounciness: number
}

export function getTerrainProperties(): TerrainProperties {
  return {
    friction: 0.3,
    resistance: 0,
    bounciness: 0
  }
}

export function calculateVelocity(
  movementVariables: MovementVariables,
  terrainProperties: TerrainProperties,
  force: THREE.Vector3,
  delta: number
) {
  const maxSpeed = 10 //!MOVE TO WORLD PROPERTIES
  const { friction, resistance } = terrainProperties
  const { speed, acceleration, velocity } = movementVariables
  const maxSpeedSideways = maxSpeed * 0.6
  const maxSpeedBackwards = maxSpeed * 0.4

  if (force.x !== 0 || force.z !== 0) {
    acceleration.x += force.x * speed * (1 - resistance)
    acceleration.z += force.z * speed * (1 - resistance)
  }

  if (acceleration.x < 0.01 && acceleration.x > -0.01) {
    acceleration.x = 0
  }

  if (acceleration.z < 0.01 && acceleration.z > -0.01) {
    acceleration.z = 0
  }

  acceleration.z = Math.max(acceleration.z, -maxSpeed)
  acceleration.z = Math.min(acceleration.z, maxSpeedBackwards)

  acceleration.x = Math.min(acceleration.x, maxSpeedSideways)
  acceleration.x = Math.max(acceleration.x, -maxSpeedSideways)

  acceleration.multiplyScalar(delta)

  velocity.add(acceleration)

  if (velocity.x < 0.01 && velocity.x > -0.01) {
    velocity.x = 0
  }

  if (velocity.z < 0.01 && velocity.z > -0.01) {
    velocity.z = 0
  }

  velocity.x *= 1 - friction
  velocity.z *= 1 - friction
}
