<script lang="ts" setup>
import Graph from './Graph.vue';
import Options from './Options.vue';
import Attribute from './Attribute.vue';
import Submit from './Submit.vue';
import { ref } from 'vue';
import { useModelStore } from '@/stores/ModelStore';
import { ElMessage } from 'element-plus';
import NoDrawer from '@/components/NoDrawer.vue';
import { useConfigStore } from '@/stores/configStore';

const showDialog = ref(false);

const configStore = useConfigStore();
const modelStore = useModelStore();

const handleSubmit = (show: boolean) => {
  let temp = true;
  if (modelStore.nodeList.length <= 1 || modelStore.edgeList.length < 1) {
    ElMessage({
      message: 'Abnormal number of nodes',
      type: 'error'
    });
    temp = false;
  }
  modelStore.nodeList.forEach((node) => {
    if (node.state !== 0) {
      ElMessage({
        message: 'Abnormal node status',
        type: 'error'
      });
      temp = false;
    }
  });
  for (let key in configStore.hyperParameters) {
    if (configStore.hyperParameters[key] === '') {
      ElMessage({
        message: 'hyperparameter error',
        type: 'error'
      });
      temp = false;
    }
  }
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
      <NoDrawer>
        <ElForm class="config-list" label-width="100px">
          <ElFormItem class="config-item" label="Loss">
            <ElSelect v-model="configStore.loss">
              <ElOption
                v-for="item in configStore.lossList"
                :key="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem class="config-item" label="optimizer">
            <ElSelect v-model="configStore.optimizer">
              <ElOption
                v-for="item in configStore.optimizerList"
                :key="item"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem
            class="config-item"
            v-for="key in Object.keys(configStore.hyperParameters)"
            :key="key"
            :label="key"
          >
            <ElInput
              v-if="typeof configStore.hyperParameters[key] !== 'boolean'"
              v-model:model-value="configStore.hyperParameters[key]"
              type="number"
            />
            <ElSelect v-else v-model="configStore.hyperParameters[key]">
              <ElOption label="True" :value="true" />
              <ElOption label="False" :value="false" />
            </ElSelect>
          </ElFormItem>
        </ElForm>
      </NoDrawer>
    </div>
    <div class="model-right">
      <Attribute />
    </div>
  </div>
  <ElDialog v-model="showDialog" title="Model Code">
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
  overflow: hidden;
}

.model-right {
  width: 300px;
  border: 1px solid var(--no-grey);
}
.config-list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.config-item {
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
}
</style>
