import type { NodeInterface } from '@/types';
import { defineStore } from 'pinia';
import * as d3 from 'd3';
import { Rect } from '@/utils/draw';

export const useModelStore = defineStore('model', {
  state: () => {
    return {
      graph: null as HTMLElement | null, // 画布
      svg: null as d3.Selection<
        SVGSVGElement,
        unknown,
        HTMLElement,
        any
      > | null,

      // 移动的节点
      moveNode: {
        nodeIndex: 0 as number,
        el: null as HTMLElement | null,
        rect: null as Rect | null,
        offsetX: 0 as number,
        offsetY: 0 as number,
        src: '' as string,
        text: '' as string
      },

      // 画布中的节点列表
      nodeList: [] as NodeInterface[],

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
      this.svg = d3
        .select('.graph-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');
      const nodeG = this.svg.append('g').attr('id', 'node-g');
      const edgeG = this.svg.append('g').attr('id', 'edge-g');
    },

    /**
     * 记录克隆元素
     * @param el 元素
     * @param x 鼠标点击在元素内的x偏移
     * @param y 鼠标点击在元素内的y偏移
     */
    setCloneEl: function (x: number, y: number, src: string, text: string) {
      this.moveNode.src = src;
      this.moveNode.text = text;
      this.moveNode.offsetX = x;
      this.moveNode.offsetY = y;
    },

    /**
     * 使用完之后会清除克隆元素
     */
    clearMoveEl: function () {
      this.moveNode.nodeIndex = -1;
      this.moveNode.rect = null;
      this.moveNode.offsetX = 0;
      this.moveNode.offsetY = 0;
      this.moveNode.text = '';
      this.moveNode.src = '';
    },

    /**
     * 画布添加节点
     * @param x 鼠标当前位置x
     * @param y 鼠标当前位置y
     */
    addNode: function (x: number, y: number) {
      // 加到节点列表
      const node: NodeInterface = {
        id: this.cnt,
        x: x - this.moveNode.offsetX,
        y: y - this.moveNode.offsetY
      };

      const rect = new Rect(
        this.svg?.select('#node-g') as d3.Selection<
          SVGGElement,
          unknown,
          HTMLElement,
          any
        >,
        node
      ).create(
        x - this.moveNode.offsetX,
        y - this.moveNode.offsetY,
        this.moveNode.src,
        this.moveNode.text
      );
      this.nodeList.push(node);
      this.clearMoveEl();
      this.cnt++;
    }
  }
});
