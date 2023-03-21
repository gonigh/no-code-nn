<script lang="ts" setup>
import NoNode from '@/components/NoNode.vue';

import { useInitStore } from '@/stores/initStore';
import { ref, onMounted } from 'vue';
const optionList = useInitStore().nodeInfo;
const optionTypeList = useInitStore().nodeInfo.map((item) => item.type);
const maxHeight = ref(0);
onMounted(() => {
  maxHeight.value = window.innerHeight - 90;
})

</script>
<template>
  <ElScrollbar :max-height="maxHeight" style="border-radius: 10px">
    <ElCollapse v-model="optionTypeList">
      <ElCollapseItem v-for="item in optionList" :key="item.type" :title="item.type" :name="item.type">
        <template #title>
          <div class="option-title">
            <div class="dot"></div>
            <div>{{ item.type }}</div>
          </div>
        </template>
        <div class="node-list">
          <NoNode v-for="node in item.nodeList" :key="node.name" :name="node.name" :icon="node.icon"></NoNode>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </ElScrollbar>
</template>

<style scoped>
.options-container {
  padding: 5px;
  border-radius: 10px;
}

.option-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 16px;
}

.dot {
  width: 12px;
  height: 20px;
  border-radius: 6px;
  background-color: var(--no-blue);
  margin-right: 10px;
}

.node-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
