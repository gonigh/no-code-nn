import type { EdgeInterface, NodeInterface } from '@/types';
import { defineStore } from 'pinia';
import * as d3 from 'd3';
import { Rect } from '@/utils/drawRect';
import { Edge } from '@/utils/drawEdge';
import initData from '@/assets/init';
import { getImageUrl } from '@/utils';

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
      g: null as d3.Selection<
        SVGGElement,
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
        fromNode: null as NodeInterface | null,
        to: 0 as number,
        toType: 0 as number,
        toPoint: [0, 0] as Array<number>,
        toRect: null as Rect | null,
        toNode: null as NodeInterface | null
      },

      // 画布中的节点列表
      nodeList: [] as NodeInterface[],
      edgeList: [] as EdgeInterface[],
      // 递增下标，创建id
      nodeCnt: 1,
      edgeCnt: 1,

      nodeMap: new Map<number, Array<Edge>>(),

      drawing: false,
      tempLine: null as d3.Selection<SVGPathElement, unknown, HTMLElement, any> | null,

      zoom: {
        k: 1 as number,
        x: 0 as number,
        y: 0 as number
      },

      selectType: 'node' as string,
      selectedId: -1 as number,

      nodeType: '' as string
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
        .attr('id', 'draw-svg')
        .attr('width', '100%')
        .attr('height', '100%');
      this.g = this.svg.append('g')
        .attr('id', 'draw-g');
      const nodeG = this.g.append('g').attr('id', 'node-g');
      const edgeG = this.g.append('g').attr('id', 'edge-g');

      const path = d3.line<Array<number>>()
        .x(d => d[0])
        .y(d => d[1]);
      this.svg.on('mousemove', e => {
        if (this.drawing) {
          const [x, y] = this.getGraphXY(e.offsetX, e.offsetY);
          const points = [this.moveEdge.fromPoint, [x, y]];
          this.tempLine?.datum(points).attr('d', path);
        }
      })

      /**
       * svg点击函数，绘制线条
       */
      this.svg.on('mousedown', (e) => {
        // e.offsetX 和 e.offsetY 为距离现svg视图左上角距离
        this.selectedId = -1;
        if (this.drawing) {
          this.moveEdge.fromRect?.stopDrawing();
          this.drawing = false;

          const [x, y] = this.getGraphXY(e.offsetX, e.offsetY);
          const clickNode = this.getClickNode(x, y);
          const toNode: NodeInterface = clickNode[0] as NodeInterface;
          const toNodeIndex = clickNode[1];
          if (toNodeIndex !== -1 && toNode && toNode.id !== this.moveEdge.fromNode?.id) {
            const type = this.getClickNodeType(toNode as NodeInterface, x, y);
            this.moveEdge.to = toNode.id;
            this.moveEdge.toType = type;
            this.moveEdge.toRect = toNode.rect as Rect;
            this.moveEdge.toNode = toNode;
            this.addEdge(this.moveEdge.from, this.moveEdge.fromType, this.moveEdge.to, this.moveEdge.toType);
          }
          this.clearMoveEdge();
        }
      }, true);

      this.svg.on('moveout', () => {
        if (this.drawing) {
          this.moveEdge.fromRect?.stopDrawing();
          this.drawing = false;
          this.clearMoveEdge();
        }
      })

      // 添加线条箭头
      const marker = this.svg.append('defs').append("marker")
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("viewBox", "0 0 12 12")
        .attr("refX", 9)
        .attr("refY", 6)
        .attr("orient", "auto")
      var arrowPath = "M2,2 L10,6 L2,10 L6,6 L2,2";
      marker.append("path")
        .attr("d", arrowPath)
        .attr("fill", "var(--no-blue)")

    },

    /**
     * 设置zoom区域信息
     * @param k 放大倍率
     * @param x 以现画布左上角为原点，svg左上角x
     * @param y 以现画布左上角为原点，svg左上角y
     */
    setZoom(k: number, x: number, y: number) {
      this.zoom.k = k;
      this.zoom.x = x;
      this.zoom.y = y;
    },

    /**
     * 偏移准换为画布坐标
     * @param offsetX X偏移
     * @param offsetY Y偏移
     * @returns 
     */
    getGraphXY(offsetX: number, offsetY: number) {
      const graphX = (offsetX - this.zoom.x) / this.zoom.k;
      const graphY = (offsetY - this.zoom.y) / this.zoom.k;
      return [graphX, graphY];
    },

    /**
     * 搜索点击svg位置所在的节点下标，若无返回-1
     * @param x 点击x坐标
     * @param y 点击y坐标
     * @returns 节点下标
     */
    getClickNode(x: number, y: number) {
      const width = 170, height = 40;
      for (let i = 0; i < this.nodeList.length; i++) {
        const item: NodeInterface = this.nodeList[i] as NodeInterface;
        if (x >= item.x && x <= item.x + width && y >= item.y && y <= item.y + height) {
          return [item, i];
        }
      }
      return [null, -1];
    },

    /**
     * 
     * @param node 
     * @param x 
     * @param y 
     */
    getClickNodeType(node: NodeInterface, x: number, y: number) {
      const width = 170, height = 40;
      let min = Math.sqrt(width * width + height * height);
      let type = 0;
      const dir = [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5]
      ];
      dir.forEach((d, i) => {
        const tmp = [node.x + d[0] * width, node.y + d[1] * height];
        const dis = Math.sqrt((tmp[0] - x) * (tmp[0] - x) + (tmp[1] - y) * (tmp[1] - y));
        if (dis < min) {
          type = i;
          min = dis;
        }
      })
      return type;
    },

    /**
     * 记录克隆元素
     * @param el 元素
     * @param x 鼠标点击在元素内的x偏移
     * @param y 鼠标点击在元素内的y偏移
     */
    setCloneEl: function (x: number, y: number, src: string, text: string, type: string) {
      this.moveNode.src = src;
      this.moveNode.text = text;
      this.moveNode.offsetX = x;
      this.moveNode.offsetY = y;
      this.nodeType = type;
    },

    /**
     * 使用完之后会清除克隆元素
     */
    clearMoveNode: function () {
      this.moveNode.nodeIndex = -1;
      this.moveNode.rect = null;
      this.moveNode.offsetX = 0;
      this.moveNode.offsetY = 0;
      this.moveNode.text = '';
      this.moveNode.src = '';
      this.nodeType = '';
    },

    /**
     * 设置当前选择节点id
     * @param id
     */
    setClickNode: function (id: number) {
      this.selectType = 'node';
      this.selectedId = id;
    },

    /**
     * 画布添加节点
     * @param x 鼠标当前位置x
     * @param y 鼠标当前位置y
     */
    addNode: function (x: number, y: number, id: number, icon: string, text: string, createNode: Function, attr?: Object) {
      // 加到节点列表
      const node: NodeInterface = createNode(this.nodeCnt, x, y, text) as NodeInterface;
      if (attr) {
        node.attr = attr;
      }
      const rect = new Rect(
        this.svg?.select('#node-g') as d3.Selection<
          SVGGElement,
          unknown,
          HTMLElement,
          any
        >,
        node,
        this.lineStart,
        this.updateLine,
        this.setClickNode,
        this.zoom
      ).create(
        x,
        y,
        icon,
        text
      );

      this.setClickNode(node.id);
      this.nodeList.push(node);
      this.clearMoveNode();
      this.nodeCnt++;
    },

    lineStart: function (id: number, type: number, point: Array<number>, rect: Rect) {
      this.moveEdge.from = id;
      this.moveEdge.fromType = type;
      this.moveEdge.fromPoint = point;
      this.moveEdge.fromRect = rect;
      this.moveEdge.fromNode = this.nodeList.find(item => item.id == id) as NodeInterface;
      this.drawing = true;

      const path = d3.line<Array<number>>()
        .x(d => d[0])
        .y(d => d[1]);
      this.tempLine = this.svg?.select('#edge-g').append('path').attr('id', 'edge-temp').attr('stroke-width', 1).attr('stroke', 'var(--no-blue)') as d3.Selection<SVGPathElement, unknown, HTMLElement, any>;
      const points = [this.moveEdge.fromPoint, this.moveEdge.fromPoint];
      this.tempLine?.datum(points).attr('d', path);
    },

    /**
     * 设置当前选择边id
     * @param id
     */
    setClickEdge: function (id: number) {
      this.selectType = 'edge';
      this.selectedId = id;
    },

    /**
     * 添加边
     */
    addEdge(from: number, fromType: number, to: number, toType: number) {
      const edgeItem: EdgeInterface = {
        id: this.edgeCnt++,
        from: from,
        fromType: fromType,
        to: to,
        toType: toType
      };
      
      const fromNode = this.nodeList.find(item=>item.id === from);
      const toNode = this.nodeList.find(item=>item.id === to);
      const edge = new Edge(this.svg?.select('#edge-g') as d3.Selection<
        SVGGElement,
        unknown,
        HTMLElement,
        any
      >, edgeItem, fromNode as NodeInterface, fromType, toNode as NodeInterface, toType, this.setClickEdge);

      edge.create();


      this.edgeList.push(edgeItem);
      if (this.nodeMap.has(from)) {
        this.nodeMap.get(from)?.push(edge);
      } else {
        this.nodeMap.set(from, [edge]);
      }
      if (this.nodeMap.has(to)) {
        this.nodeMap.get(to)?.push(edge);
      } else {
        this.nodeMap.set(to, [edge]);
      }

      this.setClickEdge(edgeItem.id);
    },

    updateLine(nodeId: number) {
      const list = this.nodeMap.get(nodeId);
      list?.forEach(item => {
        item.update();
      })
    },

    clearMoveEdge: function () {
      this.moveEdge.from = 0;
      this.moveEdge.fromPoint = [0, 0];
      this.moveEdge.fromRect = null;
      this.moveEdge.fromType = 0;

      this.moveEdge.to = 0;
      this.moveEdge.toPoint = [0, 0];
      this.moveEdge.toRect = null;
      this.moveEdge.toType = 0;

      d3.select('#edge-temp').remove();
    },

    /**
     * 删除节点
     * @param id 节点id
     */
    deleteNode(id: number) {
      const edges = this.edgeList.filter(item => item.from === id || item.to === id);
      edges.forEach(item => {
        this.deleteEdge(item.id);
      });
      this.g?.select('#node-g').select('#node-' + id).remove();
      this.nodeList = this.nodeList.filter(item => item.id !== id);
    },

    /**
     * 删除边
     * @param id 边id
     */
    deleteEdge(id: number) {
      this.g?.select('#edge-g').select('#edge-' + id).remove();
      this.edgeList = this.edgeList.filter(item => item.id !== id);
    },

    addModel(name: string, x: number, y: number, createNode: Function) {
      const model = initData.modelInfo.find(item => item.name === name);
      const stepY = 80;
      const stepX = 400;
      const maxCol = 10; // 每列最多10个
      model?.nodeList.forEach((node, i) => {
        const icon: number = [...initData.nodeInfo[0].nodeList, ...initData.nodeInfo[1].nodeList].find(item => item.name === node.name)?.icon as number;
        const baseUrl = '../assets/icon/';
        const iconSrc = getImageUrl(baseUrl + initData.iconList[icon] + '.svg');
        const row = Math.floor(i % maxCol);
        const col = Math.floor(i / maxCol);
        this.addNode(x + col * stepX, y + row * stepY, this.nodeCnt, iconSrc, node.name, createNode, node.attr);
      })

      model?.edgeList.forEach((edge, i) => {
        if((i + 1) % maxCol === 0) {
          this.addEdge(edge.from, 1, edge.to, 3);
        } else {
          this.addEdge(edge.from, 2, edge.to, 0);
        }
        
      });
    }
  }
});
