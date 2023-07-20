export interface IGameComponent {
  isActive: boolean
}

export interface IGameObject {
  mesh: THREE.Mesh
  init: (scene?: THREE.Scene) => void
}
