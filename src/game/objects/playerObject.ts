import * as THREE from 'three'
import type { Entity } from '../components/entityComponents'
import type { TMovementVariables } from '../components/movementComponent'
import { loadPlayer } from '../scripts/playerLoader'
import {
  calculateForce,
  calculateVelocity,
  moveObject,
  rotateObject
} from '../scripts/movementScripts'
import { getCameraDirection, handleCameraInput, moveCamera } from '../scripts/cameraScripts'
import { PlayerCamera } from './cameraObject'

export class Player implements Entity {
  public mesh: THREE.Mesh
  public isActive: boolean = false
  public movementVariables: TMovementVariables

  constructor() {
    this.mesh = loadPlayer()
    this.movementVariables = {
      velocity: new THREE.Vector3(),
      speed: 2,
      acceleration: new THREE.Vector3(),
      force: new THREE.Vector3()
    }
  }

  public moveObject(delta: number) {
    if (!window._game.activeCamera) {
      throw new Error('No active camera')
    }
    const cameraDirection = getCameraDirection(window._game.activeCamera.controls)

    if (
      window._game.activeCamera instanceof PlayerCamera &&
      window._game.activeCamera.isLockedOnPlayer
    ) {
      moveCamera(window._game.activeCamera, this.mesh.position)
    }

    if (this.movementVariables.velocity.x !== 0 || this.movementVariables.velocity.z !== 0) {
      rotateObject(this.mesh, cameraDirection)
    }

    calculateVelocity(
      this.movementVariables,
      { friction: 0.1, resistance: 0.1, bounciness: 0 },
      delta
    )

    moveObject(this.mesh, this.movementVariables)
  }

  public init(scene?: THREE.Scene) {
    if (!scene) {
      throw new Error('No scene to add player to')
    }

    window._game.updateFnList.moveObject[this.mesh.uuid] = this.moveObject.bind(this)
    scene.add(this.mesh)
    this.isActive = true
  }

  public destroy(scene?: THREE.Scene) {
    if (!scene) {
      throw new Error('No scene to remove player from')
    }

    delete window._game.updateFnList.moveObject[this.mesh.uuid]
    this.detachInputHandler()

    scene.remove(this.mesh)
    this.isActive = false
  }

  public handleInput(delta: number) {
    window._game.userInput.mapToPlayerMovement()
    window._game.userInput.mapToCameraMovement()
    const movement = window._game.userInput

    if (window._game.activeCamera instanceof PlayerCamera) {
      handleCameraInput(window._game.activeCamera, movement, delta)
    }

    calculateForce(this.movementVariables, movement)
  }

  public attachInputHandler() {
    window._game.updateFnList.moveObject[this.mesh.uuid + 'inputHandler'] =
      this.handleInput.bind(this)
  }
  public detachInputHandler() {
    delete window._game.updateFnList.moveObject[this.mesh.uuid + 'inputHandler']
  }
}
