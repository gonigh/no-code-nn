<script lang="ts" setup>
import { useModelStore } from '@/stores/ModelStore';
const modelStore = useModelStore();
interface Props {
  icon: number;
  name: string;
}
const props = defineProps<Props>();

// icon名称列表
const iconList = [
  'input-data',
  'output-data',
  'sequence',
  'neural-network',
  'normal',
  'activate',
  'samples',
  'random',
  'linear',
  'tool'
];

/**
 * 引入图片函数
 */
const getImageUrl = (name: string) => {
  return new URL(`../assets/icon/${name}.svg`, import.meta.url).href;
};
const iconSrc = getImageUrl(iconList[props.icon]);

/**
 * 处理拖拽开始事件，记录拖拽元素信息
 */
const handleDragStart = function (e: DragEvent) {
  modelStore.setCloneEl(e.target as HTMLElement, e.offsetX, e.offsetY);
};
</script>
<template>
  <div
    class="node-container"
    ref="srcEl"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <img :src="iconSrc" />
    <span>{{ props.name }}</span>
  </div>
</template>

<style scoped>
.node-container {
  width: 170px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid var(--no-blue);
  margin: 10px;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.node-container:hover {
  cursor: grab;
  background-color: #90cbff26;
}

.node-container:active {
  cursor: grabbing;
}

.flutter {
  position: absolute;
  z-index: 9999;
  pointer-events: none;
}

img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
</style>
