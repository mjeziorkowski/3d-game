import type { IGameComponent } from './gameComponent'

export type TMovementVariables = {
  velocity: THREE.Vector3
  speed: number
  acceleration: THREE.Vector3
  force: THREE.Vector3
}

export interface IMovementComponent extends IGameComponent {
  movementVariables: TMovementVariables
  moveObject: (delta: number) => void
}
