import * as THREE from 'three'
import { loadScene } from './scripts/sceneLoader'
import type { Camera, PlayerCamera } from './objects/cameraObject'
import { InputList } from './scripts/inputHandler'

declare global {
  interface Window {
    _game: Game
  }
}

export type TUpdateFnList = {
  [key: string]: {
    [key: string]: (delta: number) => void
  }
}

export class Game {
  private _three = THREE
  public renderer: THREE.WebGLRenderer

  public activeScene: THREE.Scene | null = null

  public activeCamera: Camera | PlayerCamera | null = null

  public clock: THREE.Clock = new THREE.Clock()

  public gamepad: Gamepad | null = null

  public updateFnList: TUpdateFnList = {
    moveObject: {}
  }

  public userInput: InputList = new InputList()

  public settings: TSettings

  constructor(options: {
    renderer: {
      width: number
      height: number
    }
  }) {
    this.settings = this._loadSettings()
    window._game = this
    this.renderer = new THREE.WebGLRenderer()
    this.resizeRenderer(options.renderer.width, options.renderer.height)

    window.addEventListener('resize', () => {
      this.resizeRenderer(window.innerWidth, window.innerHeight)
    })
  }

  public resizeRenderer(width: number, height: number) {
    console.debug(`Resizing renderer to ${width}x${height}`)
    this.renderer.setSize(width, height)
  }

  public mount(element: HTMLElement | null) {
    if (!element) {
      throw new Error('No HTML element to mount to')
    }
    element.appendChild(this.renderer.domElement)
  }

  public start() {
    const { scene, camera } = loadScene(this.renderer.domElement)
    this.activeScene = scene
    this.activeCamera = camera

    this.renderer.setAnimationLoop(() => {
      this.update()
    })
  }

  public update() {
    if (!this.activeScene) {
      throw new Error('No active scene')
    }
    if (!this.activeCamera) {
      throw new Error('No active camera')
    }

    const delta = this.clock.getDelta()
    this.activeCamera.controls.update(delta)

    Object.keys(this.updateFnList).forEach((key) => {
      Object.keys(this.updateFnList[key]).forEach((fnKey) => {
        this.updateFnList[key][fnKey](delta)
      })
    })

    this.renderer.render(this.activeScene, this.activeCamera.camera)
  }

  private _loadSettings(): TSettings {
    return {
      debug: true,
      maxSpeed: 10,
      camera: {
        sensitivity: 100,
        defaultOffsetFromPlayer: {
          polarAngle: 0.7,
          azimuthAngle: 0,
          distanceToObject: 7
        },
        invertAxis: {
          x: false,
          y: true
        }
      }
    }
  }
}

export type TSettings = {
  debug: boolean
  maxSpeed: number
  camera: {
    sensitivity: number
    defaultOffsetFromPlayer: {
      polarAngle: number
      azimuthAngle: number
      distanceToObject: number
    }
    invertAxis: {
      x: boolean
      y: boolean
    }
  }
}
