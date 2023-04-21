<script lang="ts" setup>
import { downloadAPI, submitAPI } from '@/apis';
import type { SubmitParam, NodeParam, EdgeParam } from "@/types/api";
import { useModelStore } from '@/stores/ModelStore';
import { onMounted, ref } from 'vue';

const props = defineProps<{ show: boolean }>();

const netCode = ref('');
const modelStore = useModelStore();
const loading = ref(true);

// 获取模型代码
const getCode = ()=>{
  const nodes: NodeParam[] = modelStore.nodeList.map(item => {
    const node: NodeParam = {
      id: item.id,
      name: item.name,
      type: item.type
    }
    if (item.attr) {
      node.attr = item.attr;
    }
    return node;
  });
  const edges: EdgeParam[] = modelStore.edgeList.map(item => {
    const edge: EdgeParam = {
      from: item.from,
      to: item.to
    }
    return edge;
  });
  const params: SubmitParam = {
    node: nodes,
    edge: edges
  }
  submitAPI(params).then(res => {
    netCode.value = res.data.code;
    loading.value = false;
  })
}

// 下载代码
const downloadCode = ()=>{
  downloadAPI().then(res=>{
    const blob = new Blob([res.data], { type: 'text/py' }) // 将响应数据转换成Blob对象
    const url = window.URL.createObjectURL(blob) // 创建URL对象
    const link = document.createElement('a') // 创建a标签
    link.href = url // 设置a标签的下载链接
    link.download = 'net.py' // 设置文件名
    document.body.appendChild(link) // 将a标签添加到文档中
    link.click() // 触发点击事件进行下载
    document.body.removeChild(link) // 下载完成后删除a标签
  });
};

onMounted(() => {
  getCode();
})
</script>
<template>
  <ElSkeleton :loading="loading" animated>
    <template #default>
      <div>
        <ElScrollbar max-height="600" v-highlight>
          <pre><code>{{ netCode }}</code></pre>
        </ElScrollbar>
        <div class="buttons">
          <ElButton @click="downloadCode">Download</ElButton>
        </div>
      </div>
    </template>
  </ElSkeleton>
</template>

<style scoped>
.buttons {
  display: flex;
  margin-top: 20px;
  justify-content: end;
}
</style>