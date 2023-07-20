import * as THREE from 'three'

export function loadPlayer() {
  const geometry = new THREE.BoxGeometry(1, 2, 1)
  const material = [
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //right
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //left
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //top
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), //bottom
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), //back
    new THREE.MeshBasicMaterial({ color: 0xff0000 }) //front
  ]
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'player'

  return mesh
}
