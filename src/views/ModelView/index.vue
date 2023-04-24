<script lang="ts" setup>
import Graph from './Graph.vue';
import Options from './Options.vue';
import Attribute from './Attribute.vue';
import Submit from './Submit.vue';
import { ref } from 'vue';
import { useModelStore } from '@/stores/ModelStore';
import { ElMessage } from 'element-plus';
import NoDrawer from '@/components/NoDrawer.vue';

const showDialog = ref(false);
const showDrawer = ref(true);
const modelStore = useModelStore();

const handleSubmit = (show: boolean) => {
  let temp = true;
  if(modelStore.nodeList.length <= 1 || modelStore.edgeList.length < 1) {
    ElMessage({
      message: 'Abnormal number of nodes',
      type: 'error'
    });
    temp = false;
  }
  modelStore.nodeList.forEach(node=>{
    if(node.state !== 0) {
      ElMessage({
        message: 'Abnormal node status',
        type: 'error'
      })
      temp = false;
    }
  })
  showDialog.value = temp;
};

</script>
<template>
  <div class="model-container">
    <div class="model-left">
      <Options></Options>
    </div>
    <div class="model-middle">
      <Graph @submit="handleSubmit"></Graph>
      <NoDrawer></NoDrawer>
    </div>
    <div class="model-right">
      <Attribute></Attribute>
    </div>
  </div>
  <ElDialog v-model:model-value="showDialog" title="Model Code">
    <Submit :show="showDialog" />
  </ElDialog>
</template>

<style scoped>
.model-container {
  display: flex;
  height: 100%;
  position: relative;
}

.model-left {
  height: 100%;
  width: 400px;
  border: 1px solid var(--no-grey);
}

.model-middle {
  flex: 1;
  border: 1px solid var(--no-grey);
}

.model-right {
  width: 300px;
  border: 1px solid var(--no-grey);
}
</style>
