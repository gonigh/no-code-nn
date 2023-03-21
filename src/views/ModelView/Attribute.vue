<script lang="ts" setup>
import { useModelStore } from '@/stores/ModelStore';
import type { NodeInterface } from '@/types';
import { watch, ref } from 'vue';

const modelStore = useModelStore();
let node = ref();

/**
 * 参数调整后处理事件
 */
const handleAttrChange = function(){
    console.log(modelStore.nodeList);
}

watch(() => modelStore.selectedNode, (value) => {
    node.value = modelStore.nodeList.find(item => item.id === value) as NodeInterface;
})
</script>
<template>
    <div class="attr-container">
        <div class="title">Attribute</div>
        <ElForm v-if="node" label-width="100px">
            <ElFormItem label="ID :">{{ node.id }}</ElFormItem>
            <ElFormItem label="type :">{{ node.type }}</ElFormItem>
            <ElFormItem v-if="node.attr" v-for="key in Object.keys(node.attr)" :key="key" :label="key">
                <ElInput v-if="typeof node.attr[key] !== 'boolean'" v-model:model-value="node.attr[key]" placeholder="Please enter parameters" @change="handleAttrChange" />
                <ElSelect v-else v-model="node.attr[key]" @change="handleAttrChange">
                    <ElOption label="True" :value="true" />
                    <ElOption label="False" :value="false" />
                </ElSelect>
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
