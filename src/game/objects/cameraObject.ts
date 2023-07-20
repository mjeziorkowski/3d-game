import * as THREE from 'three'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE: THREE })

export class Camera {
  public controls: CameraControls
  public camera: THREE.PerspectiveCamera //TODO: test OrthographicCamera

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
    this.camera = camera
    this.controls = new CameraControls(camera, domElement)
  }
}

export class PlayerCamera extends Camera {
  public sensitivity: number = 100
  public polarAngle: number = 0
  public azimuthAngle: number = 0
  public distanceToObject: number = 10
  public isLockedOnPlayer: boolean = true

  constructor(domElement: HTMLElement) {
    super(
      new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
      domElement
    )

    this.controls.minPolarAngle = 0
    this.controls.maxPolarAngle = Math.PI / 2 - 0.01
  }

  public updatePositionProperties() {
    this.polarAngle = this.controls.polarAngle
    this.azimuthAngle = this.controls.azimuthAngle
    this.distanceToObject = this.controls.distance
  }
}
