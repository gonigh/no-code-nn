<script lang="ts" setup>
import { useModelStore } from '@/stores/ModelStore';
const modelStore = useModelStore();
interface Props {
  icon: number;
  name: string;
}
const props = defineProps<Props>();
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

const getImageUrl = (name: string) => {
  return new URL(`../assets/icon/${name}.svg`, import.meta.url).href;
};
const iconSrc = getImageUrl(iconList[props.icon]);

const handleDragStart = function (e: DragEvent) {
  console.log(e);
  modelStore.setCloneEl(e.target as HTMLElement, e.offsetX, e.offsetY);
  
  // if (e.target != srcEl.value) return;
  // cloneEl = e.target?.cloneNode(true);
  // cloneEl.classList.add('flutter');
  // srcEl.value.parentElement.appendChild(cloneEl);
  // dragging = true;
  // srcEl.value.style.opacity = '0';
  // initial.left = e.clientX;
  // initial.top = e.clientY;
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
