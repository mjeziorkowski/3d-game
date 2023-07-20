import * as THREE from 'three'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE: THREE })

export class Camera {
  public controls: CameraControls
  public camera: THREE.PerspectiveCamera
  public sensitivity: number = 100
  public polarAngle: number = 0
  public azimuthAngle: number = 0
  public distance: number = 0

  constructor(
    options: { fov: number; aspect: number; near: number; far: number },
    domElement: HTMLElement
  ) {
    this.camera = new THREE.PerspectiveCamera(
      options.fov,
      options.aspect,
      options.near,
      options.far
    )
    this.controls = new CameraControls(this.camera, domElement)
    this.controls.minPolarAngle = 0
    this.controls.maxPolarAngle = Math.PI / 2 - 0.01
  }

  public updatePositionProperties() {
    this.polarAngle = this.controls.polarAngle
    this.azimuthAngle = this.controls.azimuthAngle
    this.distance = this.controls.distance
  }
}
