<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useModelStore } from '@/stores/ModelStore';

const graph = ref();
const modelStore = useModelStore();

/**
 * 处理放置事件，添加节点到画布
 * @param e 拖拽事件
 */
const handleDrop = function (e: DragEvent) {
  modelStore.addNode(e.offsetX, e.offsetY);
};

/**
 * 处理拖拽移动事件
 * @param e 拖拽事件
 */
const handleDragOver = function (e: DragEvent) {
  e.preventDefault();
};

onMounted(() => {
  modelStore.setGraph(graph.value);
});
</script>
<template>
  <div
    class="graph-container"
    ref="graph"
    @drop="handleDrop"
    @dragover="handleDragOver"
  ></div>
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
