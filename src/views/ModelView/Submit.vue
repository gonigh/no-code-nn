<script lang="ts" setup>
import { submitAPI } from '@/apis';
import type { SubmitParam, NodeParam, EdgeParam } from "@/types/api";
import { useModelStore } from '@/stores/ModelStore';
import { onMounted, ref } from 'vue';
import type { NodeInterface } from '@/types';

const props = defineProps<{show: boolean}>();

const netCode = ref(`
a=1
b=2
for i in range(10):
  print(i)
  a=1
b=2
for i in range(10):
  print(i)
  a=1
b=2
for i in range(10):
  print(i)
  a=1
b=2
for i in range(10):
  print(i)
  a=1
b=2
for i in range(10):
  print(i)
  a=1
b=2
for i in range(10):
  print(i)
  a=1
b=2
for i in range(10):
  print(i)
`);
const modelStore = useModelStore();
const loading = ref(true);
onMounted(() => {
  const nodes: NodeParam[] = modelStore.nodeList.map(item=>{
    const node: NodeParam = {
      id: item.id,
      name: item.name,
      type: item.type
    }
    if(item.attr) {
      node.attr = item.attr;
    }
    return node;
  });
  const edges: EdgeParam[] = modelStore.edgeList.map(item=>{
    const edge: EdgeParam = {
      from: item.from,
      to: item.to
    }
    return edge;
  });
  const params: SubmitParam = {
    nodes,
    edges
  }
  submitAPI(params).then(res => {
    netCode.value = res.code;
    loading.value = false;
  })
})
</script>
<template>
  <ElSkeleton :loading="loading" animated>
    <template #default>
      <div>
        <ElScrollbar max-height="600" v-highlight>
          <pre><code>
          {{ netCode }}
        </code></pre>
        </ElScrollbar>
        <div class="buttons">
          <ElButton>Download</ElButton>
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