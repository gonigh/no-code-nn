import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useViewStore = defineStore('view', {
  state: () => ({
    viewList: ['data', 'model', 'training'],
    active: 'model',
    router: useRouter()
  }),
  actions: {
    /**
     * 处理tab切换事件
     * @param newActive 目标tab标签
     */
    handleTabChange(newActive: string) {
      this.active = newActive;
      this.router.push(newActive);
    }
  }
});
