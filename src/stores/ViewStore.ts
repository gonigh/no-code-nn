import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useViewStore = defineStore('view', {
  state: () => ({
    viewList: ['data', 'model', 'training'],
    active: 'model',
    router: useRouter()
  }),
  actions: {
    handleTabChange(newActive: string) {
      this.active = newActive;
      this.router.push(newActive);
    }
  }
});
