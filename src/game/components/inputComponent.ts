import type { IGameComponent } from './gameComponent'

export type TGamepadMovement = {
  leftStick: {
    x: number
    y: number
  }
  rightStick: {
    x: number
    y: number
  }
  triggers: {
    left: number
    right: number
  }
  buttons: {
    a: boolean
    b: boolean
    x: boolean
    y: boolean
  }
  dpad: {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
  }
  bumpers: {
    left: boolean
    right: boolean
  }
  menu: boolean
  view: boolean
  stickButtons: {
    left: boolean
    right: boolean
  }
}

export interface IInputComponent extends IGameComponent {
  movement: {
    x: number
    z: number
  }
  camera: {
    x: number
    y: number
  }
}
