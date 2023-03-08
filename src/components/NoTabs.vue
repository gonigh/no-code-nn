<script lang="ts" setup>
import { useViewStore } from '@/stores/ViewStore';
import { computed } from 'vue';

interface Props {
  active: string;
  tabList: string[];
}

const props = defineProps<Props>();
const ViewStore = useViewStore();
// 当前激活页
const active = computed(() => {
  return ViewStore.active;
});
</script>
<template>
  <div class="tabs-container">
    <div
      class="tab-item"
      :class="{ tabActive: active == item }"
      v-for="item in props.tabList"
      :key="item"
      @click="ViewStore.handleTabChange(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.tabs-container {
  display: flex;
  
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  height: 40px;
  line-height: 30px;
}

.tab-item:hover {
  color: var(--no-blue);
}

.tabActive {
  color: var(--no-blue);
  border-bottom: 3px solid var(--no-blue);
}
</style>
