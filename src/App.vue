<script setup lang="ts">
import HomeView from './views/HomeView.vue';
</script>

<template>
  <header>
    <img src="./assets/logo.svg" />
  </header>
  <HomeView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  height: 2rem;
  width: 100%;
  background-color: aliceblue;
  position: fixed;
  left: 0;
  top: 0;
}

header img {
  height: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
