<template>
  <div id="gameWindow"></div>
</template>

<script setup lang="ts">
import { Game } from '@/game/main'
import { onMounted, onUnmounted } from 'vue'

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    window.location.reload()
  })
}

const game = new Game({
  renderer: {
    width: window.innerWidth,
    height: window.innerHeight
  }
})

onMounted(() => {
  const gameWindow = document.getElementById('gameWindow')
  game.mount(gameWindow)
  game.start()
})

// import * as THREE from 'three'

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.z = 5

// const scene = new THREE.Scene()

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// function animate() {
//   requestAnimationFrame(animate)
//   cube.rotation.x += 0.01
//   cube.rotation.y += 0.01
//   renderer.render(scene, camera)
// }
// animate()
</script>

<style scoped lang="scss"></style>
