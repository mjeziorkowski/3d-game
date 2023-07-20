import type { IInputComponent, TGamepadMovement } from '../components/inputComponent'

export class InputList implements IInputComponent {
  isActive: boolean = false
  movement: { x: number; y: number } = { x: 0, y: 0 }
  camera: { x: number; y: number } = { x: 0, y: 0 }

  constructor() {
    this.isActive = true
  }

  mapToPlayerMovement(movement: TGamepadMovement): IInputComponent {
    this.movement.x = movement.leftStick.x
    this.movement.y = movement.leftStick.y

    this.camera.x = movement.rightStick.x
    this.camera.y = movement.rightStick.y

    return this
  }
}
