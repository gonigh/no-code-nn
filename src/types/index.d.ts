import type { Rect } from "@/utils/drawRect";

export interface NodeInterface {
  id: number;
  rect?: Rect;
  x: number;
  y: number;
}

export interface EdgeInterface {
  id: number;
  from: number;
  fromType: number;
  to: number;
  toType: number;
}