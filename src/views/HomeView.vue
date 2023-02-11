<script setup lang="ts">
import { useRouter } from 'vue-router';
import DataView from './DataView.vue';
import ModelView from './ModelView.vue';
import HyperParametersView from './HyperParametersView.vue';
import TrainingView from './TrainingView.vue';
import ResultsView from './ResultsView.vue';
const router = useRouter();
const activeTab: string = 'data';
const HandleClick = function (e: any) {
  console.log(e);
  router.replace(e);
};
</script>

<template>
  <main>
    <ElTabs v-model="activeTab" @tab-change="HandleClick" stretch>
      <ElTabPane label="Data" name="data">
        <DataView />
      </ElTabPane>
      <ElTabPane label="Model" name="model">
        <ModelView />
      </ElTabPane>
      <ElTabPane label="HyperParameters" name="hyperParameters">
        <HyperParametersView />
      </ElTabPane>
      <ElTabPane label="Training" name="training">
        <TrainingView />
      </ElTabPane>
      <ElTabPane label="Results" name="results">
        <ResultsView />
      </ElTabPane>
    </ElTabs>
  </main>
</template>
<style scoped>
main {
  flex: 1;
  height: 100vh;
  width: 100%;
  position: relative;
}
.el-tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-tabs__nav .is-stretch {
  justify-content: space-around;
}
.el-tabs__header {
  margin-bottom: 0 !important;
}
.el-tabs__content {
  flex: 1;
  background-color: antiquewhite;
}
</style>
