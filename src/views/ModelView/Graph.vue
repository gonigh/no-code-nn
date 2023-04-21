<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue';
import { useModelStore } from '@/stores/ModelStore';
import * as d3 from 'd3';
import { ElMessage } from 'element-plus';
import { getImageUrl } from '@/utils';

const emits = defineEmits(['submit']);

const createNode = inject('createNode');
const graph = ref();
const modelStore = useModelStore();
let svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
let zoom: d3.ZoomBehavior<Element, unknown>;
let scale = 3;
const scaleList = [0.5, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3];

/**
 * 处理放置事件，添加节点到画布
 * @param e 拖拽事件
 */
const handleDrop = function (e: DragEvent) {
  const [x, y] = modelStore.getGraphXY(e.offsetX - modelStore.moveNode.offsetX, e.offsetY - modelStore.moveNode.offsetY)
  
  
  if (modelStore.nodeType === 'model') {
    modelStore.addModel(x, y, modelStore.moveNode.text, createNode as Function);
  } else {
    modelStore.addNode(x, y, modelStore.moveNode.text , createNode as Function);
  }
  
};

/**
 * 处理拖拽移动事件
 * @param e 拖拽事件
 */
const handleDragOver = function (e: DragEvent) {
  e.preventDefault();
};

/**
 * 放大画布
 */
const handleZoomOut = () => {
  if (scale === scaleList.length - 1) {
    ElMessage('已缩放至最大');
    return;
  }
  const transform = d3.zoomTransform(svg.node() as Element);
  const newTransform = d3.zoomIdentity
    .translate(transform.x, transform.y)
    .scale(scaleList[++scale]);
  svg.transition().duration(500).call(zoom.transform, newTransform);
};

/**
 * 缩小画布
 */
const handleZoomIn = () => {
  if (scale === 0) {
    ElMessage('已缩放至最小');
    return;
  }
  const transform = d3.zoomTransform(svg.node() as Element);
  const newTransform = d3.zoomIdentity
    .translate(transform.x, transform.y)
    .scale(scaleList[--scale]);
  svg.transition().duration(500).call(zoom.transform, newTransform);
};

/**
 * 回归原始尺寸
 */
const handleRestore = () => {
  scale = 3;
  const newTransform = d3.zoomIdentity.translate(0, 0).scale(scaleList[scale]);
  svg.transition().duration(500).call(zoom.transform, newTransform);
};

const handleSubmit = () => {
  emits('submit', true);
}

const baseUrl = '../assets/icon/';
onMounted(() => {
  modelStore.setGraph(graph.value);
  const width = graph.value.clientWidth,
    height = graph.value.clientHeight;
  svg = d3.select('#draw-svg');

  const zoomed = function ({ transform }) {
    modelStore.setZoom(transform.k, transform.x, transform.y);
    svg.select('#draw-g').attr('transform', transform);
  };
  zoom = d3
    .zoom()
    .extent([
      [0, 0],
      [width, height]
    ])
    .scaleExtent([0.5, 4])
    .on('zoom', zoomed)
    .filter((event: Event) => {
      return !(event.type === 'wheel' || event.type === 'dblclick');
    });
  svg.call(zoom);
});
</script>
<template>
  <div
    class="graph-container"
    ref="graph"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <div class="control">
      <div class="play">
        <img
          :src="getImageUrl(baseUrl + 'play.svg')"
          draggable="false"
          @click="handleSubmit"
        />
      </div>
      <div class="zoom">
        <img
          :src="getImageUrl(baseUrl + 'zoom_out.svg')"
          alt="放大"
          draggable="false"
          @click="handleZoomOut"
        />
        <img
          :src="getImageUrl(baseUrl + 'zoom_in.svg')"
          alt="缩小"
          draggable="false"
          @click="handleZoomIn"
        />
        <img
          :src="getImageUrl(baseUrl + 'restore.svg')"
          alt="还原"
          draggable="false"
          @click="handleRestore"
        />
      </div>
    </div>
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

.graph-container .control {
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px;
  z-index: 1000;
}

.control .play {
  background-color: #64e960;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.control .play img {
  width: 16px;
  height: 16px;
}

.graph-container .zoom {
  margin-top: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 6px;
  justify-content: space-around;
  align-items: center;
}

.zoom img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
