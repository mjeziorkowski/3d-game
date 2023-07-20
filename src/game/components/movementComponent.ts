import type { IGameComponent } from './gameComponent'

export type TMovementVariables = {
  velocity: THREE.Vector3
  speed: number
  acceleration: THREE.Vector3
  direction: THREE.Vector3
}

export interface IMovementComponent extends IGameComponent {
  movementComponent: TMovementVariables
  moveObject: (delta: number) => void
}
