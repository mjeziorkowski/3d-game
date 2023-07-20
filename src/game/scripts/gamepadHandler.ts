import type { TGamepadMovement } from '../components/inputComponent'

export function mapGamepadInput(gamepad: Gamepad | null): TGamepadMovement {
  if (!gamepad) {
    return emptyGamepadInputs
  }

  const sticksDeadzone = 0.2
  const triggersDeadzone = 0.2

  return {
    leftStick: {
      x: Math.abs(gamepad.axes[0]) > sticksDeadzone ? parseFloat(gamepad.axes[0].toFixed(2)) : 0,
      y: Math.abs(gamepad.axes[1]) > sticksDeadzone ? parseFloat(gamepad.axes[1].toFixed(2)) : 0
    },
    rightStick: {
      x: Math.abs(gamepad.axes[2]) > sticksDeadzone ? parseFloat(gamepad.axes[2].toFixed(2)) : 0,
      y: Math.abs(gamepad.axes[3]) > sticksDeadzone ? parseFloat(gamepad.axes[3].toFixed(2)) : 0
    },
    triggers: {
      left:
        Math.abs(gamepad.axes[4]) > triggersDeadzone ? parseFloat(gamepad.axes[4].toFixed(2)) : 0,
      right:
        Math.abs(gamepad.axes[5]) > triggersDeadzone ? parseFloat(gamepad.axes[5].toFixed(2)) : 0
    },
    buttons: {
      a: gamepad.buttons[0].pressed,
      b: gamepad.buttons[1].pressed,
      x: gamepad.buttons[2].pressed,
      y: gamepad.buttons[3].pressed
    },
    dpad: {
      up: gamepad.buttons[12].pressed,
      down: gamepad.buttons[13].pressed,
      left: gamepad.buttons[14].pressed,
      right: gamepad.buttons[15].pressed
    },
    bumpers: {
      left: gamepad.buttons[4].pressed,
      right: gamepad.buttons[5].pressed
    },
    menu: gamepad.buttons[9].pressed,
    view: gamepad.buttons[8].pressed,
    stickButtons: {
      left: gamepad.buttons[10].pressed,
      right: gamepad.buttons[11].pressed
    }
  }
}

export const emptyGamepadInputs: TGamepadMovement = {
  leftStick: {
    x: 0,
    y: 0
  },
  rightStick: {
    x: 0,
    y: 0
  },
  triggers: {
    left: 0,
    right: 0
  },
  buttons: {
    a: false,
    b: false,
    x: false,
    y: false
  },
  dpad: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  bumpers: {
    left: false,
    right: false
  },
  menu: false,
  view: false,
  stickButtons: {
    left: false,
    right: false
  }
}
