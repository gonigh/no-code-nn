export interface Node {
  type: string;
  name: string;
  attr?: any;
  icon: number;
}

export interface NodeType {
  type: string;
  nodeList: Node[];
}