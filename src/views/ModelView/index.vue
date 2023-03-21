<script lang="ts" setup>
import Graph from './Graph.vue';
import Options from './Options.vue';
import Attribute from './Attribute.vue'

</script>
<template>
  <div class="model-container">
    <div class="model-left">
      <Options></Options>
    </div>
    <div class="model-middle">
      <Graph></Graph>
    </div>
    <div class="model-right">
      <Attribute></Attribute>
    </div>
  </div>
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
}

.model-right {
  width: 300px;
  border: 1px solid var(--no-grey);
}
</style>
