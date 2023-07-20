import * as THREE from 'three'
import { Camera } from './camera'
import { loadScene } from './sceneLoader'
import { gamepadHandler } from './inputHandler'
import type { Entity } from './entity'

export class Game {
  private _three = THREE
  public renderer: THREE.WebGLRenderer

  public activeScene: THREE.Scene | null = null
  public scenes: THREE.Scene[] = []

  public activeCamera: Camera | null = null
  public cameras: Camera[] = []

  public clock: THREE.Clock = new THREE.Clock()

  public gamepad: Gamepad | null = null

  public entities: Entity[] = []

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
    const { scene, camera, entities } = loadScene(this.renderer.domElement)
    this.activeScene = scene
    this.activeCamera = camera
    this.cameras.push(camera)
    this.entities = entities

    // entities[0].addUpdate('movement', (delta) => {
    //   handleMovement(mapGamepadToMovement(getGamepad()), delta, entities[0], camera)
    // })

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

    this.entities.forEach((entity) => {
      entity.update(delta)
    })

    this.renderer.render(this.activeScene, this.activeCamera.camera)
  }
}
