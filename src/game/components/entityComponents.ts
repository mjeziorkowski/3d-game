import type { IGameObject } from './gameComponent'
import type { IMovementComponent } from './movementComponent'

export interface Entity extends IGameObject, IMovementComponent {}
