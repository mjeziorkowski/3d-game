import * as THREE from 'three'
import type CameraControls from 'camera-controls'
import type { PlayerCamera } from '../objects/cameraObject'
import type { IInputComponent } from '../components/inputComponent'

export function getCameraDirection(camera: CameraControls) {
  const cameraAzimuth = camera.azimuthAngle
  const cameraPolar = camera.polarAngle

  const cameraDirectionX = Math.sin(cameraAzimuth) * Math.cos(cameraPolar)
  const cameraDirectionZ = Math.cos(cameraAzimuth) * Math.cos(cameraPolar)

  return new THREE.Vector3(cameraDirectionX, 0, cameraDirectionZ)
}

export function moveCamera(camera: PlayerCamera, meshPosition: THREE.Vector3) {
  const z = camera.distanceToObject * Math.cos(camera.azimuthAngle) * Math.sin(camera.polarAngle)
  const x = camera.distanceToObject * Math.sin(camera.azimuthAngle) * Math.sin(camera.polarAngle)
  const y = camera.distanceToObject * Math.cos(camera.polarAngle)

  camera.controls.setLookAt(
    meshPosition.x + x,
    meshPosition.y + y,
    meshPosition.z + z,
    meshPosition.x,
    meshPosition.y,
    meshPosition.z,
    true
  )
}

export function handleCameraInput(camera: PlayerCamera, input: IInputComponent, delta: number) {
  const { sensitivity, invertAxis } = window._game.settings.camera

  let polarAngle = camera.polarAngle
  let azimuthAngle = camera.azimuthAngle

  if (input.camera.x !== 0) {
    azimuthAngle +=
      input.camera.x * THREE.MathUtils.DEG2RAD * sensitivity * delta * (invertAxis ? -1 : 1)
  }

  if (input.camera.y !== 0) {
    polarAngle +=
      input.camera.y * THREE.MathUtils.DEG2RAD * sensitivity * delta * (invertAxis ? -1 : 1)
  }

  camera.controls.rotateTo(azimuthAngle, polarAngle, false)

  if (input.camera.x !== 0 || input.camera.y !== 0) {
    camera.updatePositionProperties()
  }
}
