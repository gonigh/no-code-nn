<script lang="ts" setup>
import { submitAPI } from '@/apis';
import type { SubmitParam } from "@/types/api";
import { useModelStore } from '@/stores/ModelStore';
import { onMounted, ref } from 'vue';

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
  const params: SubmitParam = {
    nodes: modelStore.nodeList,
    edges: modelStore.edgeList
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