import * as d3 from 'd3';
import type { NodeInterface } from "@/types";

export class Edge {
    private _g: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    private _from_node: NodeInterface;
    private _from_type: number;
    private _from_point: Array<number>;
    private _to_node: NodeInterface;
    private _to_type: number;
    private _to_point: Array<number>;
    private _line: d3.Selection<SVGPathElement, unknown, HTMLElement, any> | null;
    private _dir: Array<Array<number>>;

    constructor(
        selection: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
        fromNode: NodeInterface,
        fromType: number,
        toNode: NodeInterface,
        toType: number
    ) {
        this._g = selection;
        this._from_node = fromNode;
        this._to_node = toNode;
        this._line = null;
        this._from_type = fromType;
        this._to_type = toType;
        this._dir = [
            [0.5, 0],
            [1, 0.5],
            [0.5, 1],
            [0, 0.5]
        ];
        const width = 170, height = 40;
        this._from_point = [this._from_node.x + this._dir[this._from_type][0] * width, this._from_node.y + this._dir[this._from_type][1] * height];
        this._to_point = [this._to_node.x + this._dir[this._to_type][0] * width, this._to_node.y + this._dir[this._to_type][1] * height];

    }

    create() {
        this._line = this._g.append('path')
            .attr('stroke', 'var(--no-blue)')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('marker-end','url(#arrow)')
            .attr('d', this.createPath().toString());
    }

    /**
     * 创建路径：简单版
     */
    createPath() {
        const path = d3.path();
        const middleX = (this._from_point[0] + this._to_point[0]) / 2;
        const middleY = (this._from_point[1] + this._to_point[1]) / 2;

        path.moveTo(this._from_point[0], this._from_point[1]);
        let control1, control2;
        if (Math.abs(this._from_type - this._to_type) === 2) {
            if (this._from_type % 2 === 0) {
                control1 = [this._from_point[0], middleY];
                control2 = [this._to_point[0], middleY];
            } else {
                control1 = [middleX, this._from_point[1]];
                control2 = [middleX, this._to_point[1]];
            }
        } else {
            if (this._from_type % 2 === 0) {
                control1 = [this._from_point[0], middleY];
                control2 = [middleX, this._to_point[1]];
            } else {
                control1 = [middleX, this._from_point[1]];
                control2 = [this._to_point[0], middleY];
            }
        }
        path.bezierCurveTo(control1[0], control1[1], control2[0], control2[1], this._to_point[0], this._to_point[1]);
        return path;
    }

    update() {
        const width = 170, height = 40;
        this._from_point = [this._from_node.x + this._dir[this._from_type][0] * width, this._from_node.y + this._dir[this._from_type][1] * height];
        this._to_point = [this._to_node.x + this._dir[this._to_type][0] * width, this._to_node.y + this._dir[this._to_type][1] * height];
        this._line?.attr('d', this.createPath().toString());
    }
}