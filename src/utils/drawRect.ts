import * as d3 from 'd3';
import type { NodeInterface } from '@/types';
import { getImageUrl } from '.';
export class Rect {
  private _g: d3.Selection<SVGGElement, unknown, HTMLElement, any> | null;
  private _rect_g: d3.Selection<SVGGElement, unknown, HTMLElement, any> | null;
  private _rect: d3.Selection<SVGRectElement, unknown, HTMLElement, any> | null;
  private _dots: d3.Selection<SVGCircleElement, number[], SVGGElement, unknown> | null;
  private _dragging: boolean;
  private _drawing: boolean;
  private _width: number;
  private _height: number;
  private _in_rect: boolean;
  private _in_circle: boolean;
  private _line_start: Function;
  private _line_update: Function;
  private _dir: Array<Array<number>>;
  public _node: NodeInterface;
  private _zoom: {
    k: number,
    x: number,
    y: number
  };
  private _click_rect: Function;
  private _icon: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | null;

  constructor(
    selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    node: NodeInterface,
    startFunc: Function,
    updateFunc: Function,
    clickFunc: Function,
    zoom: {
      k: number,
      x: number,
      y: number
    }
  ) {
    this._g = selection;
    this._rect_g = null;
    this._rect = null;
    this._dots = null;
    this._node = node;
    node.rect = this;
    this._dragging = false;
    this._drawing = false;
    this._width = 170;
    this._height = 40;
    this._in_circle = false;
    this._in_rect = false;
    this._line_start = startFunc;
    this._line_update = updateFunc;
    this._zoom = zoom
    this._dir = [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ];
    this._click_rect = clickFunc;
    this._icon = null;
  }

  /**
   * 创建图元
   * @param x x坐标
   * @param y y坐标
   * @param img icon
   * @param text 内容
   * @returns this
   */
  create(x: number, y: number, img: string, text: string) {
    this._rect_g = this._g
      ?.append('g')
      .attr('id', 'node-' + this._node.id)
      .attr('transform', `translate(${x},${y})`) as d3.Selection<
        SVGGElement,
        unknown,
        HTMLElement,
        any
      >;
    this._rect = this._rect_g
      .append('rect')
      .attr('width', this._width)
      .attr('height', this._height)
      .attr('fill', 'white')
      .attr('rx', 10)
      .attr('ry', 10);
    this._rect_g
      ?.append('svg:image')
      .attr('xlink:href', img)
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', 10)
      .attr('y', 5);
    const _text = this._rect_g
      ?.append('text')
      .text(text)
      .style('width', '80px')
      .style('overflow', 'ellipsis')
      .style('white-space', 'nowrap')
      .attr('cursor', 'default')
      .attr('user-select', 'none')
      .attr('font-size', 13)
      .attr('x', 50)
      .attr('y', 26);

    const textWidth = 90;

    let length = _text.node()?.getComputedTextLength() as number;
    let textContent = _text.text();
    while (length > textWidth && textContent.length > 0) {
      textContent = textContent.slice(0, -1);
      _text.text(textContent + '...');
      length = _text.node()?.getComputedTextLength() as number;
    }

    this._icon = this._rect_g?.append('svg:image')
      .attr('width', 20)
      .attr('height', 20)
      .attr('x', 140)
      .attr('y', 10);

    this.setDrag();
    this.setHover();
    this.setPointFunc();
    this.setRectFunc();
    this.checkState();
    return this;
  }

  /**
     * 偏移准换为画布坐标
     * @param offsetX X偏移
     * @param offsetY Y偏移
     * @returns 
     */
  getGraphXY(offsetX: number, offsetY: number) {
    const graphX = (offsetX - this._zoom.x) / this._zoom.k;
    const graphY = (offsetY - this._zoom.y) / this._zoom.k;
    return [graphX, graphY];
  }

  /**
   * 设置拖拽事件
   */
  setDrag() {
    let offsetX: number, offsetY: number;
    this._rect_g?.on('mousedown', (e) => {
      const [graphX, graphY] = this.getGraphXY(e.offsetX, e.offsetY);
      offsetX = graphX - this._node.x;
      offsetY = graphY - this._node.y;
      this._dragging = true;
    }, true);

    const drag = d3.drag().on('drag', (e, d) => {
      if (!this._drawing) {
        const x = e.x - offsetX;
        const y = e.y - offsetY;
        this._rect_g?.attr('transform', `translate(${x},${y})`);
        this._node.x = x;
        this._node.y = y;
        this._line_update(this._node.id);
      }
    }, true);
    this._rect_g?.call(drag);

    this._rect_g?.on('mouseup', () => {
      this._dragging = false;
    });
  }

  /**
   * 设置鼠标经过显示连接点
   */
  setHover() {
    const rect = this;
    this._dots = this._rect_g
      ?.selectAll('circle')
      .data(this._dir)
      .enter()
      .append('circle')
      .attr('class', 'node-circle')
      .attr('cx', (d) => d[0] * this._width)
      .attr('cy', (d) => d[1] * this._height)
      .attr('r', 3)
      .attr('fill', 'var(--no-blue)')
      .attr('opacity', 0)
      .on('mouseover', function (e, d) {
        rect._in_circle = true;
        d3.select(this).attr('opacity', 1)
          .attr('r', 5)
      })
      .on('mouseout', function (e, d) {
        rect._in_circle = false;
        d3.select(this)
          .attr('r', 3)
        if (!rect._in_circle && !rect._in_rect) {
          rect._rect_g?.selectAll('.node-circle').attr('opacity', 0);
        }
      }) as d3.Selection<SVGCircleElement, number[], SVGGElement, unknown>;

    this._rect_g?.on('mouseover', () => {
      this._in_rect = true;
      if (!this._dragging) {
        this._dots?.attr('opacity', 1)
      }
    });

    this._rect_g?.on('mouseout', () => {
      this._in_rect = false;
      this._dragging = false;
      if (!this._in_circle && !this._in_rect) {
        this._rect_g?.selectAll('.node-circle').attr('opacity', 0);
      }
    });
  }

  /**
   * 设置连接点函数
   */
  setPointFunc() {
    const rect = this;
    this._dots?.on('click', function (e, d) {
      rect._drawing = true;
      const type = rect._dir.findIndex(item => item[0] == d[0] && item[1] == d[1]);
      const point = [rect._node.x + d[0] * rect._width, rect._node.y + d[1] * rect._height];
      rect._line_start(rect._node.id, type, point, rect);
      e.stopPropagation();
    })
  }

  /**
   * 终止绘画
   */
  stopDrawing() {
    this._drawing = false;
  }

  /**
   * 点击矩形函数
   */
  setRectFunc() {
    this._rect?.on('click', e => {
      this._click_rect(this._node.id);
    })
  }

  /**
   * 选中激活
   */
  active() {
    this._rect?.attr('stroke', 'var(--no-blue)')
      .attr('stroke-width', 2);
  }

  /**
   * 取消激活
   */
  unactive() {
    this._rect?.attr('stroke', 'unset');
  }

  /**
   * 状态检测，0：成功，1：警告，2：失败
   */
  checkState() {
    const baseUrl = '../assets/icon/'
    const iconList = ['success.svg', 'warning.svg', 'error.svg'];
    this._node.state = 0;
    if ('attr' in this._node) {
      Object.keys(this._node.attr as object).forEach(key => {
        if (this._node.attr[key] === null || this._node.attr[key] === '') {
          this._node.state = 2;
        }
      })
    }
    this._icon?.attr('xlink:href', getImageUrl(baseUrl + iconList[this._node.state]));
  }
}
