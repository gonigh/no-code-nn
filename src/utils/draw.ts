import * as d3 from 'd3';

import type { NodeInterface } from '@/types';

export class Rect {
  private _g: d3.Selection<SVGGElement, unknown, HTMLElement, any> | null;
  private _rect_g: d3.Selection<SVGGElement, unknown, HTMLElement, any> | null;
  private _rect: d3.Selection<SVGRectElement, unknown, HTMLElement, any> | null;
  private _node: NodeInterface;
  private _dragging: boolean;
  private _width: number;
  private _height: number;
  private _in_rect: boolean;
  private _in_circle: boolean;

  constructor(
    selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    node: NodeInterface
  ) {
    this._g = selection;
    this._rect_g = null;
    this._rect = null;
    this._node = node;
    node.rect = this;
    this._dragging = false;
    this._width = 170;
    this._height = 40;
    this._in_circle = false;
    this._in_rect = false;
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
      .attr('transform', `translate(${x},${y})`) as d3.Selection<
        SVGGElement,
        unknown,
        HTMLElement,
        any
      >;
    this._rect_g
      ?.append('svg:image')
      .attr('xlink:href', img)
      .attr('width', 30)
      .attr('height', 30)
      .attr('x', 10)
      .attr('y', 5);
    this._rect_g
      ?.append('text')
      .text(text)
      .attr('font-size', 13)
      .attr('x', 50)
      .attr('y', 26);
    this._rect = this._rect_g
      .append('rect')
      .attr('id', 'node-' + this._node.id)
      .attr('width', this._width)
      .attr('height', this._height)
      .attr('fill', 'transparent')
      .attr('stroke', 'var(--no-blue)')
      .attr('stroke-width', 2)
      .attr('rx', 10)
      .attr('ry', 10);
    this.setDrag();
    this.setHover();
    return this;
  }

  /**
   * 设置拖拽事件
   */
  setDrag() {
    let offsetX: number, offsetY: number;
    this._rect_g?.on('mousedown', (e) => {
      offsetX = e.offsetX - this._node.x;
      offsetY = e.offsetY - this._node.y;
      this._dragging = true;
    });

    const drag = d3.drag().on('drag', (e, d) => {
      const x = e.x - offsetX;
      const y = e.y - offsetY;
      this._rect_g?.attr('transform', `translate(${x},${y})`);
      this._node.x = x;
      this._node.y = y;
    });
    this._rect_g?.call(drag);

    this._rect_g?.on('mouseup', () => {
      this._dragging = false;
    });
  }

  /**
   * 设置鼠标经过显示连接点
   */
  setHover() {
    const dir = [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ];
    const rect = this;
    let dots = this._rect_g
      ?.selectAll('circle')
      .data(dir)
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
      });

    this._rect_g?.on('mouseover', () => {
      this._in_rect = true;
      if (!this._dragging) {
        dots?.attr('opacity', 1)
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
}
