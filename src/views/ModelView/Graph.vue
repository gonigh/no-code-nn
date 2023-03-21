<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue';
import { useModelStore } from '@/stores/ModelStore';
import * as d3 from 'd3';

const createNode = inject('createNode');
const graph = ref();
const modelStore = useModelStore();

/**
 * 处理放置事件，添加节点到画布
 * @param e 拖拽事件
 */
const handleDrop = function (e: DragEvent) {
  modelStore.addNode(e.offsetX, e.offsetY, createNode as Function);
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
  const width = graph.value.clientWidth, height = graph.value.clientHeight;
  const svg = d3.select('svg');
  const zoomed = function ({ transform }) {
    console.log(transform)
    modelStore.setZoom(transform.k,transform.x,transform.y);
    svg.select('#draw-g').attr('transform', transform);
  }
  const zoom = d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([0.5, 4])
    .on('zoom', zoomed);

  svg.call(zoom);
});
</script>
<template>
  <div class="graph-container" ref="graph" @drop="handleDrop" @dragover="handleDragOver">
    <!-- <div class=""></div> -->
  </div>
</template>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  background-color: rgb(243, 242, 255);
  box-sizing: border-box;
  overflow: hidden;
}
</style>
