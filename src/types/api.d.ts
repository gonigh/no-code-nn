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
    loss: string;
    optimizer: string;
    hyperParameters: {
        batchSize: number,
        epochs: number,
        lr: number,
        gamma: number,
        seed: number,
        NoCUDA: boolean
    }
}