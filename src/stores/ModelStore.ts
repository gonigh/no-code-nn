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
    /**
     * 设置画布元素
     * @param el 画布元素
     */
    setGraph: function (el: HTMLElement) {
      this.graph = el;
    },

    /**
     * 记录克隆元素
     * @param el 元素
     * @param x 鼠标点击在元素内的x偏移
     * @param y 鼠标点击在元素内的y偏移
     */
    setCloneEl: function (el: HTMLElement, x: number, y: number) {
      this.cloneInfo.el = el.cloneNode(true) as HTMLElement;
      this.cloneInfo.offsetX = x;
      this.cloneInfo.offsetY = y;
    },

    /**
     * 使用完之后会清楚克隆元素
     */
    clearCloneEl: function () {
      this.cloneInfo.el = null;
      this.cloneInfo.offsetX = 0;
      this.cloneInfo.offsetY = 0;
    },

    /**
     * 画布添加节点
     * @param x 鼠标当前位置x
     * @param y 鼠标当前位置y
     */
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
