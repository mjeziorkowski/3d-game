import * as THREE from 'three'
import type { Camera } from './camera'
import type { Entity } from './entity'

export interface gamepadMovement {
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

export function handleMovementInput(movement: gamepadMovement, delta: number): THREE.Vector3 {
  const force = new THREE.Vector3()

  if (movement.leftStick.x !== 0) {
    force.x += movement.leftStick.x
  }

  if (movement.leftStick.y !== 0) {
    force.z += movement.leftStick.y
  }

  return force
}

export function handleCameraInput(movement: gamepadMovement, delta: number, camera: Camera) {
  const { sensitivity } = camera

  let polarAngle = camera.controls.polarAngle
  let azimuthAngle = camera.controls.azimuthAngle

  if (movement.rightStick.x !== 0) {
    azimuthAngle -= movement.rightStick.x * THREE.MathUtils.DEG2RAD * sensitivity * delta
  }

  if (movement.rightStick.y !== 0) {
    polarAngle -= movement.rightStick.y * THREE.MathUtils.DEG2RAD * sensitivity * delta
  }

  camera.controls.rotateTo(azimuthAngle, polarAngle, false)

  if (movement.rightStick.x !== 0 || movement.rightStick.y !== 0) {
    camera.updatePositionProperties()
  }
}

export function moveCamera(camera: Camera, entity: Entity) {
  const z = camera.distance * Math.cos(camera.azimuthAngle) * Math.sin(camera.polarAngle)
  const x = camera.distance * Math.sin(camera.azimuthAngle) * Math.sin(camera.polarAngle)
  const y = camera.distance * Math.cos(camera.polarAngle)

  camera.controls.setLookAt(
    entity.mesh.position.x + x,
    entity.mesh.position.y + y,
    entity.mesh.position.z + z,
    entity.mesh.position.x,
    entity.mesh.position.y,
    entity.mesh.position.z,
    true
  )
}

export function getCameraDirection(camera: Camera) {
  const cameraAzimuth = camera.controls.azimuthAngle
  const cameraPolar = camera.controls.polarAngle

  const cameraDirectionX = Math.sin(cameraAzimuth) * Math.cos(cameraPolar)
  const cameraDirectionZ = Math.cos(cameraAzimuth) * Math.cos(cameraPolar)

  return new THREE.Vector3(cameraDirectionX, 0, cameraDirectionZ)
}

export function rotateEntity(entity: Entity, direction: THREE.Vector3) {
  if (entity.movementVariables.velocity.x !== 0 || entity.movementVariables.velocity.z !== 0) {
    entity.mesh.lookAt(
      entity.mesh.position.x + direction.x,
      entity.mesh.position.y,
      entity.mesh.position.z + direction.z
    )
  }
}

export function moveEntity(entity: Entity) {
  entity.mesh.translateZ(entity.movementVariables.velocity.z)
  entity.mesh.translateX(entity.movementVariables.velocity.x)
}

export function gamepadHandler(event: GamepadEvent, connected: boolean) {
  const gamepad = event.gamepad
  if (connected) {
    console.debug(
      'Gamepad connected at index %d: %s. %d buttons, %d axes.',
      gamepad.index,
      gamepad.id,
      gamepad.buttons.length,
      gamepad.axes.length
    )
    return gamepad
  } else {
    console.debug('Gamepad disconnected from index %d: %s', gamepad.index, gamepad.id)
    return null
  }
}

export function getGamepad() {
  const gamepads = navigator.getGamepads()
  if (!gamepads[0]) {
    console.debug('No gamepad connected')
  }
  return gamepads[0]
}

export function mapGamepadToMovement(gamepad: Gamepad | null): gamepadMovement {
  if (!gamepad) {
    return {
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
