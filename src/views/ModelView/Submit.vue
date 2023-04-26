<script lang="ts" setup>
import { downloadAPI, submitAPI } from '@/apis';
import type { SubmitParam, NodeParam, EdgeParam } from '@/types/api';
import { useModelStore } from '@/stores/ModelStore';
import { onMounted, ref } from 'vue';
import { useConfigStore } from '@/stores/configStore';
import { ElMessage } from 'element-plus';

const netCode = ref('');
const mainCode = ref('');
const configStore = useConfigStore();
const modelStore = useModelStore();
const loading = ref(true);

const activeName = ref('net');

// 获取模型代码
const getCode = () => {
  const nodes: NodeParam[] = modelStore.nodeList.map((item) => {
    const node: NodeParam = {
      id: item.id,
      name: item.name,
      type: item.type
    };
    if (item.attr) {
      node.attr = item.attr;
    }
    return node;
  });
  const edges: EdgeParam[] = modelStore.edgeList.map((item) => {
    const edge: EdgeParam = {
      from: item.from,
      to: item.to
    };
    return edge;
  });
  const params: SubmitParam = {
    node: nodes,
    edge: edges,
    loss: configStore.loss,
    optimizer: configStore.optimizer,
    hyperParameters: configStore.hyperParameters
  };
  submitAPI(params)
    .then((res) => {
      netCode.value = res.data.net;
      mainCode.value = res.data.main;
      loading.value = false;
    })
    .catch(() => {
      ElMessage({
        message: 'request error',
        type: 'error'
      });
    });
};

/**
 * 文件下载
 * @param res 接口响应内容
 * @param name 文件名
 */
const handleDownload = (res: any, name: string) => {
  const blob = new Blob([res.data], { type: 'text/py' });
  const url = window.URL.createObjectURL(blob); // 创建URL对象
  const link = document.createElement('a'); // 创建a标签
  link.href = url; // 设置a标签的下载链接
  link.download = name; // 设置文件名
  document.body.appendChild(link); // 将a标签添加到文档中
  link.click(); // 触发点击事件进行下载
  document.body.removeChild(link); // 下载完成后删除a标签
  ElMessage({
    message: `download ${name}`,
    type: 'success'
  });
};
// 下载代码
const downloadCode = () => {
  downloadAPI('net')
    .then((res) => {
      handleDownload(res, 'net.py');
    })
    .catch(() => {
      ElMessage({
        message: 'request error',
        type: 'error'
      });
    });
  downloadAPI('main')
    .then((res) => {
      handleDownload(res, 'main.py');
    })
    .catch(() => {
      ElMessage({
        message: 'request error',
        type: 'error'
      });
    });
};

onMounted(() => {
  getCode();
});
</script>
<template>
  <ElSkeleton :loading="loading" animated>
    <template #default>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="net.py" name="net">
          <ElScrollbar max-height="500" v-highlight>
            <pre><code>{{ netCode }}</code></pre>
          </ElScrollbar>
        </el-tab-pane>
        <el-tab-pane label="main.py" name="main">
          <ElScrollbar max-height="500" v-highlight>
            <pre><code>{{ mainCode }}</code></pre>
          </ElScrollbar>
        </el-tab-pane>
      </el-tabs>
      <div class="buttons">
        <ElButton @click="downloadCode">Download</ElButton>
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
