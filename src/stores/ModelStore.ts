import { defineStore } from 'pinia';

export const useModelStore = defineStore('model', {
  state: () => {
    return {
      graph: null as HTMLElement | null,
      cloneInfo: {
        el: null as HTMLElement | null,
        offsetX: 0 as number,
        offsetY: 0 as number
      },
      nodeList: [],
      cnt: 0
    };
  },
  actions: {
    setGraph: function (el: HTMLElement) {
      this.graph = el;
    },
    setCloneEl: function (el: HTMLElement, x: number, y: number) {
      this.cloneInfo.el = el.cloneNode(true) as HTMLElement;
      this.cloneInfo.offsetX = x;
      this.cloneInfo.offsetY = y;
    },
    clearCloneEl: function () {
      this.cloneInfo.el = null;
      this.cloneInfo.offsetX = 0;
      this.cloneInfo.offsetY = 0;
    },
    addNode: function (x: number, y: number) {
      if (this.cloneInfo.el) {
        this.cloneInfo.el.style.cssText = `
        margin: 0;
        position: absolute;
        left:${x - this.cloneInfo.offsetX}px;
        top:${y - this.cloneInfo.offsetY}px;`;
      }

      this.graph?.appendChild(this.cloneInfo.el as Node);
      this.cloneInfo.el = null;
      this.clearCloneEl();
    }
  }
});
