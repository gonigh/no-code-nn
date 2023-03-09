<script lang="ts" setup>
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
  return new URL(`../assets/icon/${name}.svg`, import.meta.url).href
}
const iconSrc = getImageUrl(iconList[props.icon]);
</script>
<template>
  <div class="node-container">
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
  cursor: grab;
  display: flex;
  justify-content: left;
  align-items: center;
  word-break: keep-all;
}

img {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
</style>
