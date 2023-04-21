import type { EdgeInterface, NodeInterface } from ".";

export interface NodeParam {
    id: number;
    name: string;
    type: string;
    attr?: {};
}

export interface EdgeParam {
    from: number;
    to: number;
}
export interface SubmitParam {
    node: NodeParam[];
    edge: EdgeParam[];
}