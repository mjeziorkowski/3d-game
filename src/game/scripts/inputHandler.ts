import type { IInputComponent, TGamepadMovement } from '../components/inputComponent'
import { mapGamepadInput } from './gamepadHandler'

export class InputList implements IInputComponent {
  public isActive: boolean = false

  public movement: { x: number; z: number } = { x: 0, z: 0 }
  public camera: { x: number; y: number } = { x: 0, y: 0 }

  private _gamepad: Gamepad | null = null

  constructor() {
    this.gamepadListener()
    if (!this._gamepad) {
      console.warn('No gamepad detected')
    }
    this.isActive = true
  }

  public gamepadListener() {
    this._gamepad = navigator.getGamepads()[0]
    window.addEventListener(
      'gamepadconnected',
      (e) => {
        console.debug(
          'Gamepad connected at index %d: %s. %d buttons, %d axes.',
          e.gamepad.index,
          e.gamepad.id,
          e.gamepad.buttons.length,
          e.gamepad.axes.length
        )
        this._gamepad = navigator.getGamepads()[e.gamepad.index]
      },
      false
    )
    window.addEventListener(
      'gamepaddisconnected',
      (e) => {
        console.debug('Gamepad disconnected from index %d: %s', e.gamepad.index, e.gamepad.id)
        this._gamepad = null
      },
      false
    )
  }

  mapToPlayerMovement(): IInputComponent {
    if (!this._gamepad) {
      return this
    }
    const gamepad: TGamepadMovement = mapGamepadInput(navigator.getGamepads()[this._gamepad.index])

    this.movement.x = gamepad.leftStick.x
    this.movement.z = gamepad.leftStick.y

    return this
  }

  mapToCameraMovement(): IInputComponent {
    if (!this._gamepad) {
      return this
    }
    const gamepad: TGamepadMovement = mapGamepadInput(navigator.getGamepads()[this._gamepad.index])

    this.camera.x = gamepad.rightStick.x
    this.camera.y = gamepad.rightStick.y

    return this
  }
}
