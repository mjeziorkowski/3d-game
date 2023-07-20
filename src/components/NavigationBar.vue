<template>
  <nav>
    <ul>
      <RouterLink to="/">
        <li>Home</li>
      </RouterLink>
      <RouterLink to="/game">
        <li>Game</li>
      </RouterLink>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
nav {
  padding: 1rem;
  background-color: rgba($color: #ffffff, $alpha: 0.3);
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1rem;
}
li {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba($color: #ffffff, $alpha: 0.5);
}
li:hover {
  background-color: rgba($color: #ffffff, $alpha: 0.7);
}
a {
  color: #000000;
  text-decoration: none;
}
</style>
