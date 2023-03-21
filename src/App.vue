<script setup lang="ts">
import NoTabs from './components/NoTabs.vue';
import { useViewStore } from './stores/ViewStore';
import { createNode } from './hooks/node';
import { provide } from 'vue';

provide('createNode',createNode);

const viewStore = useViewStore();
</script>

<template>
  <header>
    <img src="./assets/HDU1.jpg" />
  </header>
  <main>
    <!-- <div style="height: 40px">
        <NoTabs :active="viewStore.active" :tab-list="viewStore.viewList" />
      </div> -->
    <div class="container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  height: 50px;
  width: 100%;
  /* background-color: aliceblue; */
  position: fixed;
  left: 0;
  top: 0;
}

header img {
  height: 100%;
}

main {
  flex: 1;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.tabs {
  margin: 0;
  height: 100%;
}

.container {
  flex: 1;
  padding: 6px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
