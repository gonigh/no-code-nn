<script lang="ts" setup>
import { useModelStore } from '@/stores/ModelStore';
import type { EdgeInterface, NodeInterface } from '@/types';
import { clippingParents } from '@popperjs/core';
import { watch, ref } from 'vue';

const modelStore = useModelStore();
let el = ref();

const edgeInfo = ref(null);
/**
 * 参数调整后处理事件
 */
const handleAttrChange = function () {
    console.log(modelStore.nodeList);
}

const handleDelete = ()=>{
    if(modelStore.selectType === 'node'){
        modelStore.deleteNode(modelStore.selectedId);
    } else {
        modelStore.deleteEdge(modelStore.selectedId);
    }
}

watch([() => modelStore.selectedId, ()=>modelStore.selectType], ([id, type]) => {
    if(type === 'node'){
        el.value = modelStore.nodeList.find(item => item.id === id) as NodeInterface;
    } else {
        el.value = modelStore.edgeList.find(item => item.id === id) as EdgeInterface;
    }
})
</script>
<template>
    <div class="attr-container">
        <div class="title">Attribute</div>
        <ElForm v-if="el" label-width="100px">
            <ElFormItem label="type :">{{ modelStore.selectType }}</ElFormItem>
            <ElFormItem v-if="modelStore.selectType === 'node'" label="ID :">{{ el.id }}</ElFormItem>
            <ElFormItem v-if="modelStore.selectType === 'node'" label="name :">{{ el.type }}</ElFormItem>
            <ElFormItem v-if="el.attr && modelStore.selectType === 'node'" v-for="key in Object.keys(el.attr)" :key="key" :label="key" required>
                <ElInput v-if="typeof el.attr[key] !== 'boolean'" v-model:model-value="el.attr[key]"
                    placeholder="Please enter parameters" @change="handleAttrChange" />
                <ElSelect v-else v-model="el.attr[key]" @change="handleAttrChange">
                    <ElOption label="True" :value="true" />
                    <ElOption label="False" :value="false" />
                </ElSelect>
            </ElFormItem>
            <ElFormItem v-if="modelStore.selectType === 'edge'"  v-for="key in Object.keys(el)" :key="key" :label="`${key} :`">{{ el[key] }}</ElFormItem>
            <ElFormItem>
                <ElButton style="right: 0;" type="danger" @click="handleDelete">DELETE</ElButton>
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
