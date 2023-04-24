<script lang="ts" setup>
import { useModelStore } from '@/stores/ModelStore';
import type { EdgeInterface, NodeInterface } from '@/types';
import { watch, ref } from 'vue';

const modelStore = useModelStore();
let el = ref();

const edgeInfo = ref(null);
/**
 * 参数调整后处理事件
 */
const handleAttrChange = function () {
  el.value.rect?.checkState();
};

const handleDelete = () => {
  if (modelStore.selectType === 'node') {
    modelStore.deleteNode(modelStore.selectedId);
  } else {
    modelStore.deleteEdge(modelStore.selectedId);
  }
};

watch([() => modelStore.selectedId, () => modelStore.selectType], function () {
  const newType = arguments[0][1];
  const oldType = arguments[1][1];
  const newId = arguments[0][0];
  const oldId = arguments[1][0];

  if (newType === 'node') {
    el.value = modelStore.nodeList.find(
      (item) => item.id === newId
    ) as NodeInterface;
    if (newId !== -1) {
      el.value?.rect?.active();
    }
    if (oldId !== -1) {
      modelStore.nodeList.find((item) => item.id === oldId)?.rect?.unactive();
    }
  } else {
    el.value = modelStore.edgeList.find(
      (item) => item.id === newId
    ) as EdgeInterface;
    if (oldType === 'node' && oldId !== -1) {
      modelStore.nodeList.find((item) => item.id === oldId)?.rect?.unactive();
    }
  }
});
</script>
<template>
  <div class="attr-container">
    <div class="title">Attribute</div>
    <ElForm v-if="el" label-width="100px">
      <ElFormItem label="type :">{{ modelStore.selectType }}</ElFormItem>
      <ElFormItem v-if="modelStore.selectType === 'node'" label="ID :">{{
        el.id
      }}</ElFormItem>
      <ElFormItem v-if="modelStore.selectType === 'node'" label="name :">{{
        el.type
      }}</ElFormItem>
      <ElFormItem
        v-if="el.attr && modelStore.selectType === 'node'"
        v-for="key in Object.keys(el.attr)"
        :key="key"
        :label="key"
      >
        <ElInput
          v-if="typeof el.attr[key] !== 'boolean'"
          v-model:model-value="el.attr[key]"
          placeholder="Please enter parameters"
          @change="handleAttrChange"
        />
        <ElSelect v-else v-model="el.attr[key]" @change="handleAttrChange">
          <ElOption label="True" :value="true" />
          <ElOption label="False" :value="false" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        v-if="modelStore.selectType === 'edge'"
        v-for="key in Object.keys(el)"
        :key="key"
        :label="`${key} :`"
        >{{ el[key] }}</ElFormItem
      >
      <ElFormItem>
        <ElButton style="right: 0" type="danger" @click="handleDelete"
          >DELETE</ElButton
        >
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>
.attr-container {
  padding: 6px;
}

.attr-container .title {
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 10px;
}
</style>
