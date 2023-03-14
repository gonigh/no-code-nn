import type { EdgeInterface, NodeInterface } from '@/types';
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

      moveEdge: {
        from: 0 as number,
        fromType: 0 as number,
        fromPoint: [0, 0] as Array<number>,
        fromRect: null as Rect | null,
        to: 0 as number,
        toType: 0 as number,
        toPoint: [0, 0] as Array<number>,
        toRect: null as Rect | null
      },

      // 画布中的节点列表
      nodeList: [] as NodeInterface[],
      edgeList: [] as EdgeInterface[],
      // 递增下标，创建id
      nodeCnt: 1,
      edgeCnt: 1,

      drawing: false,
      tempLine: null as d3.Selection<SVGPathElement, unknown, HTMLElement, any> | null
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

      const path = d3.line<Array<number>>()
        .x(d => d[0])
        .y(d => d[1]);
      const drawTempLine = (points: Array<Array<number>>) => {
        this.tempLine?.datum(points)
          .attr('d', path);
      }
      this.svg.on('mousemove', e => {
        // console.log(this.drawing)
        console.log(e.x,e.y)
        if (this.drawing) {
          
          const points = [this.moveEdge.fromPoint, [e.x, e.y]];
          drawTempLine(points);
        }
      })

      this.svg.on('mouseup', () => {
        if (this.drawing) {
          this.moveEdge.fromRect?.stopDrawing();
          this.drawing = false;
        }
      })
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
        id: this.nodeCnt,
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
        node,
        this.lineStart,
        this.lineEnd
      ).create(
        x - this.moveNode.offsetX,
        y - this.moveNode.offsetY,
        this.moveNode.src,
        this.moveNode.text
      );
      this.nodeList.push(node);
      this.clearMoveEl();
      this.nodeCnt++;
    },

    lineStart: function (id: number, type: number, point: Array<number>, rect: Rect) {
      this.moveEdge.from = id;
      this.moveEdge.fromType = type;
      this.moveEdge.fromPoint = point;
      this.moveEdge.fromRect = rect;
      this.drawing = true;

      this.tempLine = this.svg?.select('#edge-g').append('path').attr('id', 'edge-temp').attr('stroke-width', 1).attr('stroke', 'rgba(0,0,0,0.6)') as d3.Selection<SVGPathElement, unknown, HTMLElement, any>;
      // console.log(this.moveEdge);
    },

    lineEnd: function (id: number, type: number, point: Array<number>, rect: Rect) {
      this.moveEdge.to = id;
      this.moveEdge.toType = type;
      this.moveEdge.toPoint = point;
      this.moveEdge.toRect = rect;
      // console.log(this.moveEdge);
    },

    drawLine: function () {
      let from = [];
      let to = [];
      const g = this.svg?.select('#edge-g');

    }
  }
});
