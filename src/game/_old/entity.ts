import * as THREE from 'three'

export interface GameComponent {
  update: (delta: number) => void
}

export interface MovementComponent extends GameComponent {
  velocity: THREE.Vector3
  speed: number
  acceleration: THREE.Vector3
  direction: THREE.Vector3
  moveObject: () => void
}

export class Entity {
  public mesh: THREE.Mesh
  public isActive: boolean = false
  public movementVariables: MovementVariables = new MovementVariables()
  public movementComponent: MovementComponent = new MovementComponent(this.mesh)

  // public mesh: THREE.Mesh
  // public velocity: THREE.Vector3 = new THREE.Vector3()
  // public speed: number = 2
  // public acceleration: THREE.Vector3 = new THREE.Vector3()
  // public collisionMasks: string[] = []

  private _updates: { [key: string]: (delta: number) => void } = {}

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh
  }

  public update(delta: number) {
    for (let key in this._updates) {
      this._updates[key](delta)
    }
  }

  public addUpdate(key: string, update: (delta: number) => void) {
    this._updates[key] = update
  }

  public removeUpdate(key: string) {
    delete this._updates[key]
  }
}

export class MovementVariables {
  public velocity: THREE.Vector3 = new THREE.Vector3()
  public speed: number = 2
  public acceleration: THREE.Vector3 = new THREE.Vector3()

  constructor() {}
}

export class MovementComponent {}
