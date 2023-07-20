import * as THREE from 'three'
import { loadScene } from './scripts/sceneLoader'
import type { Camera } from './objects/cameraObject'

declare global {
  interface Window {
    _game: Game
  }
}

export class Game {
  private _three = THREE
  public renderer: THREE.WebGLRenderer

  public activeScene: THREE.Scene | null = null

  public activeCamera: Camera | null = null

  public clock: THREE.Clock = new THREE.Clock()

  public gamepad: Gamepad | null = null

  constructor(options: {
    renderer: {
      width: number
      height: number
    }
  }) {
    window._game = this
    this.renderer = new THREE.WebGLRenderer()
    this.resizeRenderer(options.renderer.width, options.renderer.height)

    window.addEventListener('resize', () => {
      this.resizeRenderer(window.innerWidth, window.innerHeight)
    })

    this.gamepadListener()
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

    this.renderer.render(this.activeScene, this.activeCamera.camera)
  }

  public gamepadListener() {
    window.addEventListener(
      'gamepadconnected',
      (e) => {
        this.gamepad = gamepadHandler(e, true)
      },
      false
    )
    window.addEventListener(
      'gamepaddisconnected',
      (e) => {
        this.gamepad = gamepadHandler(e, false)
      },
      false
    )
  }
}
