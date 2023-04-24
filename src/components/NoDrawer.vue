<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(true);

const handleClick = () => {
  show.value = !show.value;
}
</script>
<template>
  <div class="no-drawer" :class="{'hidden-drawer': !show}">
    <div class="no-drawer-header" @click="handleClick">
      <div class="no-drawer-header-left"></div>
      <div class="no-drawer-header-right"></div>
    </div>
    <img src="../assets/icon/extend.svg" class="icon"  @click="handleClick"/>
    <ElScrollbar max-height="300px">
      <slot />
    </ElScrollbar>
    
  </div>
</template>
<style scoped>
.no-drawer {
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0;
  background-color: white;
  transition-duration: 500ms;
}

.no-drawer-header {
  position: absolute;
  background-color: white;
  height: 40px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  top: -40px;
  border-radius: 10px 10px 0 0;
  transform-origin: center bottom;
  transform: rotateX(50deg);
}

.no-drawer-header-left {
  width: 30px;
  height: 30px;
  background-color: white;
  left: -30px;
  bottom: -10px;
  background: radial-gradient(circle at 0 0,
      transparent 30px,
      white 30px);
}

.no-drawer-header-right {
  width: 30px;
  height: 30px;
  background-color: white;
  left: 100px;
  top: -20px;
  background: radial-gradient(circle at 30px 0,
      transparent 30px,
      white 30px);
}

.icon {
  position: absolute;
  left: 50%;
  width: 20px;
  margin-left: -10px;
  top: -20px;
  transform: rotateX(30deg);
}
.hidden-drawer {
  transform: translateY(300px);
}
</style>