<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useModelStore } from '@/stores/ModelStore';

const graph = ref();
const modelStore = useModelStore();

const handleDrop = function (e: DragEvent) {
  modelStore.addNode(e.offsetX, e.offsetY);
};
const handleDragOver = function (e: DragEvent) {
  // console.log(e.offsetX,e.clientX,e.pageX);
  e.preventDefault();
};

onMounted(() => {
  modelStore.setGraph(graph.value);
});
</script>
<template>
  <div class="graph-container" ref="graph" @drop="handleDrop" @dragover="handleDragOver">

  </div>
</template>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  border: 2px solid var(--no-blue);
  border-radius: 10px;
  box-sizing: border-box;
}
</style>