<script lang="ts" setup>
import Graph from './Graph.vue';
import Options from './Options.vue';
</script>
<template>
  <div class="model-container">
    <div class="model-left">
      <Graph></Graph>
    </div>
    <div class="model-right">
      <Options></Options>
    </div>
  </div>
</template>

<style scoped>
.model-container {
  display: flex;
  height: 100%;
  position: relative;
}

.model-left {
  flex: 1;
}

.model-right {
  height: 100%;
  width: 400px;
  margin-left: 6px;
  border-radius: 10px;
  border: 2px solid var(--no-blue);
}
</style>
