import type { NodeInterface } from '@/types';
import { defineStore } from 'pinia';

export const useModelStore = defineStore('model', {
  state: () => {
    return {
      graph: null as HTMLElement | null, // 画布

      // 移动的节点
      moveNode: {
        nodeIndex: 0 as number,
        el: null as HTMLElement | null,
        offsetX: 0 as number,
        offsetY: 0 as number
      },

      // 画布中的节点列表
      nodeList: [] as NodeInterface[],

      // 画布中元素移动时的初始位置
      srcPosition: {
        x: 0,
        y: 0,
        clientX: 0,
        clientY: 0
      },

      // 递增下标，创建id
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
      this.moveNode.el = el.cloneNode(true) as HTMLElement;
      this.moveNode.offsetX = x;
      this.moveNode.offsetY = y;
    },

    /**
     * 使用完之后会清除克隆元素
     */
    clearMoveEl: function () {
      this.moveNode.nodeIndex = -1;
      this.moveNode.el = null;
      this.moveNode.offsetX = 0;
      this.moveNode.offsetY = 0;
      this.srcPosition = {
        x: 0,
        y: 0,
        clientX: 0,
        clientY: 0
      };
    },

    /**
     * 画布添加节点
     * @param x 鼠标当前位置x
     * @param y 鼠标当前位置y
     */
    addNode: function (x: number, y: number) {
      if (this.moveNode.el) {
        this.moveNode.el.style.cssText = `
        margin: 0;
        position: absolute;
        left:${x - this.moveNode.offsetX}px;
        top:${y - this.moveNode.offsetY}px;`;
        this.moveNode.el.draggable = false;
        this.moveNode.el.id = 'node-' + this.cnt;
        this.setNodeListener(this.moveNode.el);
      }

      // 加到节点列表
      this.nodeList.push({
        id: this.cnt,
        el: this.moveNode.el as HTMLElement,
        x: x - this.moveNode.offsetX,
        y: y - this.moveNode.offsetY
      });

      // 挂载到页面
      this.graph?.appendChild(this.moveNode.el as Node);
      this.moveNode.el = null;
      this.clearMoveEl();
      this.cnt++;
    },

    /**
     * 为节点添加监听事件
     * @param el 元素节点
     */
    setNodeListener: function (el: HTMLElement) {
      el.addEventListener('mousedown', (e) => {
        this.moveNode.el = el;
        this.moveNode.nodeIndex = this.nodeList.findIndex((t) => t.el == el);
        const node = this.nodeList[this.moveNode.nodeIndex];

        // 记录初始位置
        this.srcPosition = {
          x: node.x,
          y: node.y,
          clientX: e.clientX,
          clientY: e.clientY
        };
      });

      // 移动时修改位置
      el.addEventListener('mousemove', (e) => {
        if (el === this.moveNode.el) {
          const x = this.srcPosition.x + e.clientX - this.srcPosition.clientX;
          const y = this.srcPosition.y + e.clientY - this.srcPosition.clientY;
          el.style.cssText = `
          margin: 0;
          position: absolute;
          left:${x}px;
          top:${y}px;`;
          this.nodeList[this.moveNode.nodeIndex].x = x;
          this.nodeList[this.moveNode.nodeIndex].y = y;
        }
      });

      // 鼠标抬起结束移动
      el.addEventListener('mouseup', () => {
        this.clearMoveEl();
      });

      // 鼠标移出结束移动
      el.addEventListener('mouseout', () => {
        this.clearMoveEl();
      });
    }
  }
});
