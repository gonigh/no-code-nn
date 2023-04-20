<script lang="ts" setup>
import { useModelStore } from '@/stores/ModelStore';
import { getImageUrl } from '@/utils';
import initData from '@/assets/init';

const modelStore = useModelStore();
interface Props {
  icon: number;
  name: string;
  type: string;
}
const props = defineProps<Props>();

const baseUrl = '../assets/icon/';
const iconSrc = getImageUrl(baseUrl +initData.iconList[props.icon] + '.svg');

/**
 * 处理拖拽开始事件，记录拖拽元素信息
 */
const handleDragStart = function (e: DragEvent) {
  modelStore.setCloneEl(e.offsetX, e.offsetY, iconSrc, props.name, props.type);
};
</script>
<template>
  <div class="node-container" ref="srcEl" draggable="true" @dragstart="handleDragStart">
    <img :src="iconSrc" draggable="false" />
    <span>{{ props.name }}</span>
  </div>
</template>

<style scoped>
img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
</style>
