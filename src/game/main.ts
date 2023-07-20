import * as THREE from 'three'
import { loadScene } from './scripts/sceneLoader'
import type { Camera } from './objects/cameraObject'

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

  public activeCamera: Camera | null = null

  public clock: THREE.Clock = new THREE.Clock()

  public gamepad: Gamepad | null = null

  public updateFnList: TUpdateFnList = {
    moveObject: {}
  }

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

    Object.keys(this.updateFnList).forEach((key) => {
      Object.keys(this.updateFnList[key]).forEach((fnKey) => {
        this.updateFnList[key][fnKey](delta)
      })
    })

    this.renderer.render(this.activeScene, this.activeCamera.camera)
  }

  public gamepadListener() {
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
        this.gamepad = navigator.getGamepads()[e.gamepad.index]
      },
      false
    )
    window.addEventListener(
      'gamepaddisconnected',
      (e) => {
        console.debug('Gamepad disconnected from index %d: %s', e.gamepad.index, e.gamepad.id)
        this.gamepad = null
      },
      false
    )
  }
}
